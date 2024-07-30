import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { EmployeesService } from '../../../../../../services/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '../../../../../../models/employee.model';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  @Input() listOfEmployees?: Employee[];
  @Output() selectEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() creatingEmployeeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() selectedEmployee?: Employee;
  @Input() creatingEmployee = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private employeesService: EmployeesService) {}

  onSelect(employee?: Employee) {
    if (this.creatingEmployee && employee != this.listOfEmployees!.at(-1)) {
      this.creatingEmployee = false;
      this.creatingEmployeeEmitter.emit(false);
      this.listOfEmployees?.pop();
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
      this.employeesService
        .addEmployee(newEmployee)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((employees) => {
          this.listOfEmployees = employees;
        });
      this.onSelect(newEmployee);
    }
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      this.employeesService
        .deleteEmployee(this.selectedEmployee.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((employees) => {
          this.listOfEmployees = employees;
          this.onSelect();
        });
    }
  }
}
