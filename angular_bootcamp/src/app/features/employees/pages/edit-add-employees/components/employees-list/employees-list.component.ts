import { Component, DestroyRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '../../../../../../models/employee.model';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import * as ROUTES from '../../../../../../core/routes.config';

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
    RouterLink,
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent implements OnDestroy, OnInit {
  @Input() listOfEmployees?: Employee[];

  selectedEmployee?: Employee;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // dziwne ale dziala
    const array: string[] = this.router.url.split('/');
    if (array.length > 2) {
      const id: string = array[array.length - 1];
      this.employeesService.getEmployee(id).subscribe((employee) => (this.selectedEmployee = employee));
    }
  }

  ngOnDestroy(): void {
    if (this.employeesService.creatingEmployee.value) {
      this.employeesService.setCreatingEmployee(false);
      this.listOfEmployees?.pop();
    }
  }

  onSelect(employee?: Employee) {
    if (this.employeesService.creatingEmployee.value && employee != this.listOfEmployees!.at(-1)) {
      this.employeesService.setCreatingEmployee(false);
      this.listOfEmployees?.pop();
    }
    this.selectedEmployee = employee;

    if (employee) {
      this.employeesService.creatingEmployee.value
        ? this.router.navigate([ROUTES.EMPLOYEES, 'creatingEmployee'])
        : this.router.navigate([ROUTES.EMPLOYEES, employee.id]);
    }
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
      this.listOfEmployees?.push(newEmployee);
      this.onSelect(newEmployee);
    }
  }

  deleteEmployee() {
    if (this.selectedEmployee) {
      this.employeesService
        .deleteEmployee(this.selectedEmployee.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((employees: Employee[]) => {
          this.listOfEmployees = employees;
        });
      this.router.navigate([ROUTES.EMPLOYEES]);
    }
  }
}
