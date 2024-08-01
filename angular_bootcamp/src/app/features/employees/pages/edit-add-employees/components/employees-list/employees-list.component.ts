import { Component, DestroyRef, inject, Input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '../../../../../../models/employee.model';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    TranslateModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatIcon,
    MatMiniFabButton,
    MatButton,
    MatSelectionList,
    MatListOption,
    BasicButtonComponent,
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  @Input() listOfEmployees?: Employee[];

  selectedEmployee?: Employee;

  private readonly destroyRef = inject(DestroyRef);

  constructor(public employeesService: EmployeesService) {}

  onSelect(employee?: Employee) {
    if (this.employeesService.creatingEmployee.value && employee != this.listOfEmployees!.at(-1)) {
      this.employeesService.setCreatingEmployee(false);
      this.listOfEmployees?.pop();
    }
    this.selectedEmployee = employee;
    this.employeesService.setSelectedEmployee(employee);
  }

  addEmployee() {
    if (!this.employeesService.creatingEmployee.value) {
      const newEmployee: Employee = {
        id: crypto.randomUUID(),
        name: '',
        surname: '',
        hireDate: new Date(),
        manager: null,
        skillsList: [],
        projectsList: [],
      };
      this.employeesService.setCreatingEmployee(true);
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
          console.log(employees);
          this.listOfEmployees = employees;
          this.onSelect();
        });
    }
  }
}
