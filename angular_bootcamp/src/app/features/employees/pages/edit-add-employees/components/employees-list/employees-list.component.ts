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
import { Router, RouterLink } from '@angular/router';
import * as ROUTES from '../../../../../../core/routes.config';
import { CREATING_EMPLOYEE } from '../../../../../../core/routes.config';

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
  listOfEmployees?: Employee[];
  selectedEmployee?: Employee;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSelectedEmployee();
  }

  @Input() public set setListOfEmployees(employees: Employee[]) {
    this.listOfEmployees = employees;
  }

  getSelectedEmployee(): void {
    //TODO("problem z sciezka nie moge inaczej pobrac id usera)
    const array: string[] = this.router.url.split('/');
    if (array.length > 2) {
      const id: string = array[array.length - 1];
      this.employeesService.getEmployee(id).subscribe((employee) => {
        this.onSelect(employee);
      });
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
      // eslint-disable-next-line
      this.employeesService.creatingEmployee.value
        ? this.router.navigate([ROUTES.EMPLOYEES, CREATING_EMPLOYEE])
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
      this.listOfEmployees = this.listOfEmployees!.filter((employee: Employee): boolean => employee.id !== this.selectedEmployee!.id);
      this.router.navigate([ROUTES.EMPLOYEES]);
      this.employeesService
        .deleteEmployee(this.selectedEmployee.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();

    }


  }
}
