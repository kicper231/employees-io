import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { EMPLOYESS } from '../../mocks/mock-employees';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgForOf, NgIf, DatePipe, EmployeesListComponent, EmployeeDetailsComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  selectedEmployee?: Employee;
  listOfEmployees: Employee[] = EMPLOYESS;

  onSelectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
