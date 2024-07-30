import { DestroyRef, inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MANAGERS } from '../features/employees/pages/edit-add-employees/employees-mocks/mock-managers';
import { EMPLOYESS } from '../features/employees/pages/edit-add-employees/employees-mocks/mock-employees';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employees: Employee[] = EMPLOYESS;
  private managers: Employee[] = MANAGERS;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getManagers(): Observable<Employee[]> {
    return of(this.managers);
  }

  addEmployee(newEmployee: Employee): Observable<Employee[]> {
    this.employees.push(newEmployee);
    return of(this.employees);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee[]> {
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    return of(this.employees);
  }

  deleteEmployee(employeeId: string): Observable<Employee[]> {
    console.log(employeeId);
    this.employees = this.employees.filter((employee) => employee.id !== employeeId);
    return of(this.employees);
  }
}
