import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Employee } from '../../../../../../models/employee.model';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as ROUTES from '../../../../../../core/routes.config';
import { CREATING_EMPLOYEE } from '../../../../../../core/routes.config';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { NgClass } from '@angular/common';

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
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent implements OnDestroy, OnInit {
  listOfEmployees?: Employee[];
  selectedEmployee?: Employee;

  private searchTerms = new Subject<string>();

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    public employeesService: EmployeesService,
    private router: Router
  ) {}

  getSelectedEmployee(): void {
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

  ngOnInit(): void {
    this.getEmployeesData();
    this.getSelectedEmployee();

    this.employeesService.getRefreshTrigger().subscribe((refreshTrigger: boolean) => {
      if (refreshTrigger) {
        this.getEmployeesData();

        this.employeesService.setRefreshTrigger(false);
      }
    });

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.employeesService.searchEmployee(term))
      )
      .subscribe((Employees: Employee[]) => (this.listOfEmployees = Employees));
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getEmployeesData(): void {
    this.employeesService
      .getEmployees()
      .pipe()
      .subscribe((employees: Employee[]) => {
        this.listOfEmployees = employees;
      });
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
      this.listOfEmployees = this.listOfEmployees!.filter(
        (employee: Employee): boolean => employee.id !== this.selectedEmployee!.id
      );
      this.router.navigate([ROUTES.EMPLOYEES]);
      this.employeesService
        .deleteEmployee(this.selectedEmployee.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }
}
