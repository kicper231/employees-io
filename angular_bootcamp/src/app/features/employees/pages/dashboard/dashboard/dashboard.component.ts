import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BasicButtonComponent } from '../../../../../shared/components/basic-button/basic-button.component';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatChip } from '@angular/material/chips';
import { EmployeesService } from '../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '../../../../../models/employee.model';
import { map } from 'rxjs';
import { FullName } from '../../edit-add-employees/pipes/full-name.pipe';
import { Router } from '@angular/router';
import * as ROUTES from '../../../../../core/routes.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BasicButtonComponent,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatIcon,
    MatListOption,
    MatSelectionList,
    TranslateModule,
    MatChip,
    FullName,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  listOfBestEmployees?: Employee[];
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployeesData();
  }

  getEmployeesData(): void {
    this.employeesService
      .getEmployees()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((employees: Employee[]) => employees.sort((a, b) => a.skillsList.length - b.skillsList.length).slice(0, 4))
      )
      .subscribe((employees: Employee[]) => {
        this.listOfBestEmployees = employees;
      });
  }

  employeeSelected(employee: Employee) {
    this.router.navigate([ROUTES.EMPLOYEES, employee.id]);
  }
}
