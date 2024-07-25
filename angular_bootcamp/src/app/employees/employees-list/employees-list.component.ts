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
  @Output() deleteEmployeeEmitter: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  @Output() creatingEmployeeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() selectedEmployee?: Employee;
  @Input() creatingEmployee: boolean = false;

  onSelect(employee?: Employee) {
    if (this.creatingEmployee && employee != this.listOfEmployees!.at(-1)) {
      this.creatingEmployee = false;
      this.creatingEmployeeEmitter.emit(false);
      this.listOfEmployees?.pop();
      this.deleteEmployeeEmitter.emit(this.listOfEmployees);
    }

    this.selectedEmployee = employee;
    this.selectEmployee.emit(employee);
  }

  addEmployee() {
    if (!this.creatingEmployee) {
      const newEmployee: Employee = {
        id: crypto.randomUUID(),
        name: '',
        surname: '',
        hireDate: new Date(),
        manager: null,
        skillsList: [],
        projectsList: [],
      };
      this.creatingEmployee = true;
      this.creatingEmployeeEmitter.emit(this.creatingEmployee);
      this.listOfEmployees!.push(newEmployee);
      this.onSelect(newEmployee);
    }
  }

  deleteEmployee() {
    if (this.selectEmployee) {
      console.log(this.selectEmployee);
      this.listOfEmployees = this.listOfEmployees?.filter((item) => item.id != this.selectedEmployee!.id);
      this.onSelect();
      this.deleteEmployeeEmitter.emit(this.listOfEmployees);
    }
  }
}
