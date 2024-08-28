import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ProjectSummary } from '../../../../models/project-summary.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Project } from '../../../../models/project.model';
import { FullName } from '../../../../shared/pipes/full-name.pipe';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import { Employee } from '../../../../models/employee.model';
import { BasicInputComponent } from '../../../../shared/components/basic-input/basic-input/basic-input.component';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  templateUrl: './projects-details.component.html',
  styleUrl: './projects-details.component.scss',
})
export class ProjectsDetailsComponent implements OnInit {
  loadingProject: boolean = false;
  creatingProject = false;
  projectForm: FormGroup;

  private readonly destroyRef = inject(DestroyRef);
  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private location: Location,
    private formBuilder: FormBuilder
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
    });
  }

  getProject() {
    this.loadingProject = true;

    const projectId: string | null = this.route.snapshot.paramMap.get('id');
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
  }

  public onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.getRawValue();

      if (this.creatingProject) {
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
}
