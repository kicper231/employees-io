import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { EMPLOYESS } from '../../mocks/mock-employees';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

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
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  selectedEmployee?: Employee;
  listOfEmployees: Employee[] = EMPLOYESS;
  isCreating = false;

  onSelectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
  onDeleteEmployee(employees: Employee[]) {
    this.listOfEmployees = employees;
  }
  onCreatingEmployee(isCreating: boolean) {
    this.isCreating = isCreating;
  }

  onUpdateEmployee(updatedEmployee: Employee) {
    console.log(this.listOfEmployees);
    const index: number = this.listOfEmployees!.findIndex((value: Employee): boolean => value.id == updatedEmployee.id);
    console.log(index);
    if (index != -1) {
      console.log(updatedEmployee);
      this.listOfEmployees[index] = updatedEmployee;
    }
  }
}
