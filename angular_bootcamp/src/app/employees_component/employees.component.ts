import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { EMPLOYESS } from '../mock_data/mock-employees';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, NgForOf, NgIf],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  selectedEmployee?: Employee;
  listOfEmployees: Employee[] = EMPLOYESS;

  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
