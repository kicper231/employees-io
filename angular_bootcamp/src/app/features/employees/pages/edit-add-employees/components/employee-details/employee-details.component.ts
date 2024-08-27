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
import { EmployeeSummary } from '../../../../../../models/employee.summary.model';
import { MatChip, MatChipGrid, MatChipRow, MatChipSet } from '@angular/material/chips';
import { ProjectsService } from '../../../../../../services/projects-service/projects.service';

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
    MatChip,
    MatChipSet,
    MatChipGrid,
    MatChipRow,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class EmployeeDetailsComponent implements OnInit {
  managers: EmployeeSummary[] = [];
  proficiencyValues: ProficiencyLevelsEnums[] = Object.values(ProficiencyLevelsEnums);
  creatingEmployee = false;
  loadingEmployee = false;

  employeeForm: FormGroup;

  availableProjects: Project[] = [];
  selectedProjects: Project[] = [];

  private _employee?: Employee;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private employeesService: EmployeesService,
    private projectsService: ProjectsService
  ) {
    // this.employeeForm = this.formBuilder.group({
    //   id: [''],
    //   name: ['', Validators.required],
    //   surname: ['', Validators.required],
    //   hireDate: [new FormControl<string | null>(null), Validators.required],
    //   skills: this.formBuilder.array([this.createSkillGroup()], Validators.required),
    //   projects: this.formBuilder.array([this.createProjectGroup()]),
    //   manager: [new FormControl<EmployeeSummary | null>(null)],
    // });

    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      hireDate: ['', Validators.required],
      manager: [null],
      skills: this.formBuilder.array([]),
      projects: this.formBuilder.array([]),
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

      const skillsArray: FormGroup<{
        id: FormControl<string | null>;
        name: FormControl<string | null>;
        proficiency: FormControl<ProficiencyLevelsEnums | null>;
      }>[] = [];

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

      if (employee.projects.length != 0) {
        employee.projects.forEach((project) => {
          this.onProjectSelect(project);
        });
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
    this.getProjectsData();

    this.route.params.subscribe((): void => {
      this.getEmployee();
    });

    this.isEmployeeBeingCreated();
  }

  isEmployeeBeingCreated(): void {
    this.employeesService.getIsEmployeeBeingCreated().subscribe((value): boolean => (this.creatingEmployee = value));
  }
  onProjectSelect(event: any | Project): void {
    const selectedProject = event && 'value' in event ? event.value : event;
    //console.log(this.selectedProjects);

    if (selectedProject && !this.selectedProjects.includes(selectedProject)) {
      this.selectedProjects.push(selectedProject);
      this.projectsControlArray.push(this.createProjectGroup(selectedProject));
      this.availableProjects = this.availableProjects.filter((project) => project.id !== selectedProject.id);
    }
    // console.log(this.selectedProjects);
  }

  removeProject(project: Project): void {
    this.selectedProjects = this.selectedProjects.filter((p) => p.id !== project.id);
    this.availableProjects.push(project);
    const indexToRemove = this.projectsControlArray.controls.findIndex(
      (control) => control.get('id')?.value === project.id
    );
    if (indexToRemove !== -1) {
      this.projectsControlArray.removeAt(indexToRemove);
    }
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
      id: new FormControl<string | null>(skill?.id ?? null),
      name: new FormControl<string | null>(skill?.name ?? null, [Validators.required]),
      proficiency: new FormControl<ProficiencyLevelsEnums | null>(skill?.proficiency ?? null, [Validators.required]),
    });
  }

  createProjectGroup(project?: Project): FormGroup {
    return this.formBuilder.group({
      id: new FormControl<string | null>({ value: project?.id ?? null, disabled: true }),
      name: [project?.name ?? null, Validators.required],
      description: [project?.description ?? null, Validators.required],
    });
  }

  public onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.getRawValue();

      //console.log(formValue);

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
    // this.employeeForm.controls.projects.clear();
    // this.employeeForm.controls.skills.clear();
    (this.employeeForm.get('projects') as FormArray).clear();
    (this.employeeForm.get('skills') as FormArray).clear();
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

  getProjectsData(): void {
    this.projectsService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: Project[]) => (this.availableProjects = employees));
  }

  getManagersData(): void {
    this.employeesService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: EmployeeSummary[]) => (this.managers = employees));
  }

  compareManager(obj1: EmployeeSummary, obj2: EmployeeSummary) {
    if (obj1 == null || obj2 == null) {
      return false;
    }
    return obj1.name == obj2.name && obj1.id == obj2.id;
  }
}
