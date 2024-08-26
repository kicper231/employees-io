import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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

import { FullName } from '../../../../../../shared/pipes/full-name.pipe';
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
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';
import { BasicInputComponent } from '../../../../../../shared/components/basic-input/basic-input/basic-input.component';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    MatInput,
    MatError,
    MatHint,
    MatLabel,
    MatDatepickerInput,
    MatFormField,
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
    BasicButtonComponent,
    BasicInputComponent,
    MatProgressSpinner,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class EmployeeDetailsComponent implements OnInit {
  managers: Employee[] = [];
  proficiencyValues: ProficiencyLevelsEnums[] = Object.values(ProficiencyLevelsEnums);
  creatingEmployee = false;
  loadingEmployee = false;

  employeeForm!: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    hireDate: FormControl<string | null>;
    skills: FormArray<
      FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        proficiency: FormControl<ProficiencyLevelsEnums | null>;
      }>
    >;
    projects: FormArray<
      FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        description: FormControl<string | null>;
      }>
    >;
    manager: FormControl<Employee | null>;
  }>;

  private _employee?: Employee;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private employeesService: EmployeesService
  ) {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      hireDate: [new FormControl<string | null>(null), Validators.required],
      skills: this.formBuilder.array([this.createSkillGroup()], Validators.required),
      projects: this.formBuilder.array([this.createProjectGroup()], [Validators.minLength(1), Validators.required]),
      manager: [new FormControl<Employee | null>(null), Validators.required],
    });
  }

  get skillsControlArray(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  get projectsControlArray(): FormArray {
    return this.employeeForm.get('projects') as FormArray;
  }

  get employee(): Employee | undefined {
    return this._employee;
  }

  public set employee(employee: Employee | undefined) {
    this._employee = employee;

    if (employee) {
      this.employeeForm.patchValue({
        ...employee,
        hireDate: this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      });
      console.log(employee);
      const skillsArray: FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        proficiency: FormControl<ProficiencyLevelsEnums | null>;
      }>[] = [];
      // console.log(employee);
      // console.log(employee.skills);
      if (employee.skills.length != 0) {
        employee.skills.forEach((skill) => skillsArray.push(this.createSkillGroup(skill)));
      }

      this.employeeForm.setControl(
        'skills',
        this.formBuilder.array(skillsArray, [Validators.minLength(1), Validators.required])
      );

      const projectArray: FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        description: FormControl<string | null>;
      }>[] = [];
      console.log(employee.projects.length);
      if (employee.projects.length != 0) {
        employee.projects.forEach((project) => projectArray.push(this.createProjectGroup(project)));
      }
      this.employeeForm.setControl(
        'projects',
        this.formBuilder.array(projectArray, [Validators.minLength(1), Validators.required])
      );
      if (employee.manager) {
        this.employeeForm.get('manager')!.setValue(employee.manager);
      }
    }
  }

  ngOnInit(): void {
    this.getManagersData();
    this.route.params.subscribe((): void => {
      this.getEmployee();
    });

    this.isEmployeeBeingCreated();
  }

  isEmployeeBeingCreated(): void {
    this.employeesService.getIsEmployeeBeingCreated().subscribe((value): boolean => (this.creatingEmployee = value));
  }

  getEmployee() {
    this.loadingEmployee = true;
    if (this.employeesService.isEmployeeBeingCreated.value) {
      this.employee = {
        id: crypto.randomUUID(),
        name: '',
        surname: '',
        hireDate: new Date(),
        manager: null,
        skills: [],
        projects: [],
      };
      this.loadingEmployee = false;
      return;
    }

    const employeeId: string | null = this.route.snapshot.paramMap.get('id');
    this.employeesService
      .getEmployee(employeeId!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (value: Employee | undefined) => {
          this.employee = value;
        },
        () => {
          this.loadingEmployee = false;
        },
        () => {
          this.loadingEmployee = false;
        }
      );
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

      if (this.creatingEmployee) {
        this.employeesService
          .addEmployee({ ...formValue, hireDate: new Date(formValue.hireDate!) } as Employee)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      } else {
        this.employeesService
          .updateEmployee({ ...formValue, hireDate: new Date(formValue.hireDate!) } as Employee)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
    } else {
      alert('The form contain s errors');
    }
  }

  public onReset() {
    this.employeeForm.reset();
    this.employeeForm.controls.projects.clear();
    this.employeeForm.controls.skills.clear();
  }

  public addSkill() {
    const skill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      proficiency: ProficiencyLevelsEnums.BEGINNER,
    };
    this.skillsControlArray.push(this.createSkillGroup(skill));
  }
  public deleteSkill(index: number) {
    this.skillsControlArray.removeAt(index);
  }

  public addProject() {
    const project: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
    };
    this.projectsControlArray.push(this.createProjectGroup(project));
  }
  public deleteProject(index: number) {
    this.projectsControlArray.removeAt(index);
  }

  getManagersData(): void {
    this.employeesService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: Employee[]) => (this.managers = employees));
  }
}
