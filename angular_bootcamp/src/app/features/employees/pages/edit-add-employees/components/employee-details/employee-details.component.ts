import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { DatePipe, LowerCasePipe, NgForOf, UpperCasePipe } from '@angular/common';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FullName } from '../../pipes/full-name.pipe';
import { TranslateModule } from '@ngx-translate/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { ProficiencyLevelsEnums } from '../../../../../../enums/proficiency-levels.enums';
import { Employee } from '../../../../../../models/employee.model';
import { Skill } from '../../../../../../models/skill.model';
import { Project } from '../../../../../../models/project.model';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    NgForOf,
    FullName,
    TranslateModule,
    LowerCasePipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatError,
    MatHint,
    MatLabel,
    MatDatepickerInput,
    MatFormField,
    MatInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelect,
    MatOption,
    MatButton,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class EmployeeDetailsComponent implements OnInit {
  managers: Employee[] = [];
  proficiencyValues = Object.values(ProficiencyLevelsEnums);
  creatingEmployee = false;
  employeeForm!: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    hireDate: FormControl<string | null>;
    skillsList: FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        proficiency: FormControl<ProficiencyLevelsEnums | null>;
      }>
    >;
    projectsList: FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        description: FormControl<string | null>;
      }>
    >;
    manager: FormControl<Employee | null>;
  }>;

  private _employee!: Employee;
  private readonly destroyRef = inject(DestroyRef);

  @Input()
  public set employee(employee: Employee) {
    this._employee = employee;

    if (employee) {
      this.employeeForm.patchValue({
        ...employee,
        hireDate: this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      });
    }
    const skillsArray: FormGroup<{
      name: FormControl<string | null>;
      proficiency: FormControl<ProficiencyLevelsEnums | null>;
    }>[] = [];
    employee.skillsList.forEach((skill) => skillsArray.push(this.createSkillGroup(skill)));
    this.employeeForm.setControl(
      'skillsList',
      this.formBuilder.array(skillsArray, [Validators.minLength(1), Validators.required])
    );

    const projectArray: FormGroup<{
      name: FormControl<string | null>;
      description: FormControl<string | null>;
    }>[] = [];
    employee.projectsList.forEach((project) => projectArray.push(this.createProjectGroup(project)));
    this.employeeForm.setControl(
      'projectsList',
      this.formBuilder.array(projectArray, [Validators.minLength(1), Validators.required])
    );
  }

  public get employee(): Employee {
    return this._employee;
  }

  get skillsListControlArray(): FormArray {
    return this.employeeForm.get('skillsList') as FormArray;
  }

  get projectsListControlArray(): FormArray {
    return this.employeeForm.get('projectsList') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private employeesService: EmployeesService
  ) {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      hireDate: [new FormControl<string | null>(null), Validators.required],
      skillsList: this.formBuilder.array([this.createSkillGroup()], Validators.required),
      projectsList: this.formBuilder.array([this.createProjectGroup()], [Validators.minLength(1), Validators.required]),
      manager: [new FormControl<Employee | null>(null), Validators.required],
    });
  }

  ngOnInit(): void {
    this.getManagersData();

    this.employeesService
      .getCreatingEmployee()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((creatingEmployee) => (this.creatingEmployee = creatingEmployee));
  }

  createSkillGroup(skill?: Skill): FormGroup {
    return this.formBuilder.group({
      name: new FormControl<string | null>(skill?.name ?? null, [Validators.required]),
      proficiency: new FormControl<ProficiencyLevelsEnums | null>(skill?.proficiency ?? null, [Validators.required]),
    });
  }

  createProjectGroup(project?: Project): FormGroup {
    return this.formBuilder.group({
      name: [project?.name ?? null, Validators.required],
      description: [project?.description ?? null, Validators.required],
    });
  }

  public onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.getRawValue();
      this.employeesService.updateEmployee({ ...formValue, hireDate: new Date(formValue.hireDate!) } as Employee);
      this.employeesService.setCreatingEmployee(false);
    } else {
      alert('The form contain s errors');
    }
  }

  public onReset() {
    this.employeeForm.reset();
    this.employeeForm.controls.projectsList.clear();
    this.employeeForm.controls.skillsList.clear();
  }

  public addSkill() {
    const skill: Skill = {
      name: '',
      proficiency: ProficiencyLevelsEnums.begginer,
    };
    this.skillsListControlArray.push(this.createSkillGroup(skill));
  }
  public deleteSkill(index: number) {
    this.skillsListControlArray.removeAt(index);
  }

  public addProject() {
    const project: Project = {
      name: '',
      description: '',
    };
    this.projectsListControlArray.push(this.createProjectGroup(project));
  }
  public deleteProject(index: number) {
    this.projectsListControlArray.removeAt(index);
  }

  getManagersData(): void {
    this.employeesService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: Employee[]) => (this.managers = employees));
  }
}
