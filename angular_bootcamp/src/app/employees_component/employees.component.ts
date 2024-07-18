import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  exampleEmployee: Employee = {
    name: 'Kapiszon',
    hireDate: new Date(Date.now()),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Kowalski',
    manager: null,
  };
}
