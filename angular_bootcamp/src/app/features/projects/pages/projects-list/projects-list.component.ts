import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ProjectSummary } from '../../../../models/project-summary.model';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location, SlicePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import * as ROUTES from '../../../../core/routes.config';
import { CREATING_EMPLOYEE, CREATING_PROJECT } from '../../../../core/routes.config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeeSummary } from '../../../../models/employee.summary.model';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    MatLabel,
    MatTable,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatFormField,
    MatInput,
    TranslateModule,
    BasicButtonComponent,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    SlicePipe,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description'];
  dataSource: MatTableDataSource<ProjectSummary, MatPaginator> = new MatTableDataSource<ProjectSummary>([]);

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectsService.projectsSummary$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((projects: ProjectSummary[]) => {
        this.dataSource = new MatTableDataSource(projects);
      });

    this.projectsService.getProjects().subscribe((projects) => {
      this.dataSource = new MatTableDataSource(projects);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProject(): void {
    this.projectsService.setIsProjectBeingCreated(true);
    this.router.navigate([ROUTES.PROJECTS_LIST, CREATING_PROJECT]);
  }

  goBack(): void {
    this.location.back();
  }
}
