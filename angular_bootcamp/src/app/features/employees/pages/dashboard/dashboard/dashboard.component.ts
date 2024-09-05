import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BasicButtonComponent } from '../../../../../shared/components/basic-button/basic-button.component';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatChip } from '@angular/material/chips';
import { EmployeesService } from '../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FullName } from '../../../../../shared/pipes/full-name.pipe';
import { Router } from '@angular/router';
import * as ROUTES from '../../../../../core/routes.config';
import { EmployeeSummary } from '../../../../../models/employee.summary.model';

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
  listOfBestEmployees?: EmployeeSummary[];
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private numberOfBestEmployees = 4;

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeesService.employeesSummary$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => (this.listOfBestEmployees = value.slice(0, this.numberOfBestEmployees)));
    this.employeesService.getEmployees();
  }

  employeeSelected(employee: EmployeeSummary) {
    this.router.navigate([ROUTES.EMPLOYEES, employee.id]);
  }
}
