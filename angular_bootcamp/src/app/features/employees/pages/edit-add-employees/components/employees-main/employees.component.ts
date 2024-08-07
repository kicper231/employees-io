import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe, NgForOf, NgIf, UpperCasePipe, Location } from '@angular/common';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Employee } from '../../../../../../models/employee.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe,
    NgForOf,
    NgIf,
    DatePipe,
    EmployeesListComponent,
    EmployeeDetailsComponent,
    JsonPipe,
    MatSlideToggleModule,
    RouterOutlet,
    MatIcon,
    BasicButtonComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  listOfEmployees: Employee[] = [];

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private employeesService: EmployeesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEmployeesData();
    this.employeesService.getRefreshTrigger().subscribe((refreshTrigger: boolean) => {
      if (refreshTrigger) {
        this.getEmployeesData();
        this.employeesService.setRefreshTrigger(false);
      }
    });
  }

  getEmployeesData(): void {
    this.employeesService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: Employee[]) => {
        this.listOfEmployees = employees;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
