import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Employee } from '../../../../../../models/employee.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';

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
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  selectedEmployee?: Employee;
  listOfEmployees: Employee[] = [];
  private readonly destroyRef = inject(DestroyRef);

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.getEmployeesData();
    // this.getSelectedEmployee();
  }

  getEmployeesData(): void {
    this.employeesService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees: Employee[]) => {
        this.listOfEmployees = employees;
      });
  }

  // getSelectedEmployee() {
  //   this.employeesService.getSelectedEmployee().subscribe((employee) => (this.selectedEmployee = employee));
  // }
}
