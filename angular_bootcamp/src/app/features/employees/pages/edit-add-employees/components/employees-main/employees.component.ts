import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { EMPLOYESS } from '../../employees-mocks/mock-employees';
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
  isCreatingEmployee = false;

  onSelectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }
  onDeleteEmployee(employees: Employee[]) {
    this.listOfEmployees = employees;
  }
  onCreatingEmployee(isCreating: boolean) {
    this.isCreatingEmployee = isCreating;
  }

  onUpdateEmployee(updatedEmployee: Employee) {
    const index: number = this.listOfEmployees!.findIndex((value: Employee): boolean => value.id == updatedEmployee.id);
    this.isCreatingEmployee = false;

    if (index != -1) {
      this.listOfEmployees[index] = updatedEmployee;
    }
    console.log(this.selectedEmployee);
    console.log(this.listOfEmployees);
  }
}
