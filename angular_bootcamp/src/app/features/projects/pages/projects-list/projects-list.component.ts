import { AfterViewInit, Component, ViewChild, inject, OnInit, DestroyRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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
import { MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { ProjectSummary } from '../../../../models/project-summary.model';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

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
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements OnInit {
  projects: ProjectSummary[] = [];

  displayedColumns: string[] = ['id', 'title', 'description'];
  dataSource: MatTableDataSource<ProjectSummary, MatPaginator> = new MatTableDataSource(this.projects);

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setProjects();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setProjects(): void {
    this.projectsService.getProjects().subscribe((value) => {
      this.projects = value;
      this.dataSource = new MatTableDataSource(this.projects);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
