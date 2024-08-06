import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { MANAGERS } from '../../employees-mocks/mock-managers';
import { Employee } from '../../models/employee.model';
import { MessagesService } from '../messages-service/messages.service';
import { MessagesTypes } from '../../enums/messages-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPLOYEESURL } from '../../core/urls';
import { EMPLOYESS } from '../../employees-mocks/mock-employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private employees: Employee[] = EMPLOYESS;
  private managers: Employee[] = MANAGERS;

  public creatingEmployee: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(EMPLOYEESURL)
      .pipe(tap((_) => this.messagesService.add(MessagesTypes.GetEmployees)));
  }

  getManagers(): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.GetManagers);
    return of(this.managers);
  }

  setCreatingEmployee(value: boolean): void {
    this.creatingEmployee.next(value);
  }
  getEmployee(employeeId: string): Observable<Employee | undefined> {
    // return this.http.get<Employee>(EMPLOYEESURL);
    const url = `${EMPLOYEESURL}/${employeeId}`;

    return this.http.get<Employee>(url);
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    // this.messagesService.add(MessagesTypes.EmployeeAdded);
    // // this.employees.push(newEmployee);
    // // return of(this.employees);

    return this.http
      .post<Employee>(EMPLOYEESURL, newEmployee, this.httpOptions)
      .pipe(tap(() => this.messagesService.add(MessagesTypes.EmployeeAdded)));
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.EmployeeUpdated);
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    return of(this.employees);
  }

  deleteEmployee(employeeId: string): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.EmployeeDeleted);
    this.employees = this.employees.filter((employee) => employee.id !== employeeId);

    return of(this.employees);
  }
}
