import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { Project } from '../../../../models/project.model';
import { FullName } from '../../../../shared/pipes/full-name.pipe';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import { BasicInputComponent } from '../../../../shared/components/basic-input/basic-input/basic-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeSummary } from '../../../../models/employee.summary.model';
import { EmployeesService } from '../../../../services/employees-service/employees.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../../shared/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-projects-details',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatChip,
    MatFormField,
    MatSelect,
    MatChipSet,
    MatChipSet,
    MatOption,
    MatError,
    FullName,
    MatCardTitle,
    FormsModule,
    ReactiveFormsModule,
    BasicButtonComponent,
    MatIcon,
    BasicInputComponent,
    TranslateModule,
    MatLabel,
    MatSelectTrigger,
    MatAutocomplete,
    MatInput,
    MatProgressSpinner,
  ],
  templateUrl: './projects-details.component.html',
  styleUrl: './projects-details.component.scss',
})
export class ProjectsDetailsComponent implements OnInit {
  loadingProject = false;
  projectIsBeingCreated = false;
  projectForm: FormGroup;
  availableEmployees: EmployeeSummary[] = [];

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private _project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private location: Location,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService
  ) {
    this.projectForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      employees: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((): void => {
      this.getProject();
      this.getEmployeesData();
    });
    this.projectsService.getIsProjectBeingCreated().subscribe((value) => (this.projectIsBeingCreated = value));
  }

  get employeesControlArray(): FormArray {
    return this.projectForm.get('employees') as FormArray;
  }

  public get project() {
    return this._project;
  }

  public set project(project: Project | undefined) {
    this._project = project;

    if (project) {
      this.projectForm.patchValue({
        ...project,
      });

      this.onEmployeeSelect(project.employees);
    }
  }

  getEmployeesData(): void {
    this.employeesService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: EmployeeSummary[]) => (this.availableEmployees = employees));
  }

  getProject() {
    this.loadingProject = true;

    const projectId: string | null = this.route.snapshot.paramMap.get('id');

    if (this.projectsService.isProjectBeingCreated.value) {
      this.project = {
        id: crypto.randomUUID(),
        name: '',
        employees: [],
        description: '',
      };
      this.loadingProject = false;
      return;
    }
    this.projectsService
      .getProject(projectId!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (value: Project | undefined) => {
          this.project = value;
        },
        () => {
          this.loadingProject = false;
        },
        () => {
          this.loadingProject = false;
        }
      );
  }

  goBack(): void {
    this.location.back();
    this.projectsService.setIsProjectBeingCreated(false);
  }

  compareEmployee(obj1: EmployeeSummary, obj2: EmployeeSummary) {
    if (obj1 == null || obj2 == null) {
      return false;
    }
    return obj1.name == obj2.name && obj1.id == obj2.id;
  }

  onEmployeeSelect(event: any | EmployeeSummary[]): void {
    const selectedEmployee = (event && 'value' in event ? event.value : event) as EmployeeSummary[];
    this.employeesControlArray.clear();
    if (selectedEmployee.length != 0) {
      selectedEmployee.forEach((employee) => this.employeesControlArray.push(this.createEmployeeGroup(employee)));
    }
  }

  createEmployeeGroup(employee?: EmployeeSummary): FormGroup {
    return this.formBuilder.group({
      id: new FormControl<string | null>({ value: employee?.id ?? null, disabled: true }),
      name: [employee?.name ?? null, Validators.required],
      surname: [employee?.surname ?? null, Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.getRawValue();

      if (this.projectsService.isProjectBeingCreated.value) {
        this.projectsService
          .addProject({ ...formValue } as Project)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      } else {
        this.projectsService
          .updateProject({ ...formValue } as Project)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
    } else {
      alert('The form contain s errors');
    }
  }

  public onReset() {
    this.projectForm.reset();
    this.employeesControlArray.clear();
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.projectsService.deleteProject(this.project!.id).subscribe();
        this.goBack();
      }
    });
  }
}
