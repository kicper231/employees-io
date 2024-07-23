import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  @Input() listOfEmployees?: Employee[];
  @Output() selectEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  selectedEmployee?: Employee;

  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
    this.selectEmployee.emit(employee);
  }

  addEmployee() {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      name: '',
      surname: '',
      hireDate: new Date(),
      manager: null,
      skillsList: [],
      projectsList: [],
    };

    this.listOfEmployees!.push(newEmployee);

    this.onSelect(newEmployee);
  }
}
