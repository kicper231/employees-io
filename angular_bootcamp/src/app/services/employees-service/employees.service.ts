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
  public refreshTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(EMPLOYEESURL)
      .pipe(tap(() => this.messagesService.add(MessagesTypes.GetEmployees)));
  }

  getManagers(): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.GetManagers);
    return of(this.managers);
  }

  setCreatingEmployee(value: boolean): void {
    this.creatingEmployee.next(value);
  }

  getCreatingEmployee(): Observable<boolean> {
    return this.creatingEmployee.asObservable();
  }

  getRefreshTrigger(): Observable<boolean> {
    return this.refreshTrigger.asObservable();
  }

  setRefreshTrigger(value: boolean): void {
    this.refreshTrigger.next(value);
  }

  getEmployee(employeeId: string): Observable<Employee | undefined> {
    return this.http.get<Employee>(`${EMPLOYEESURL}/${employeeId}`);
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(EMPLOYEESURL, newEmployee, this.httpOptions)
      .pipe(tap(() => this.messagesService.add(MessagesTypes.EmployeeAdded)));
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(EMPLOYEESURL, updatedEmployee, this.httpOptions);
  }

  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.http.delete<Employee>(`${EMPLOYEESURL}/${employeeId}`, this.httpOptions);
  }
}
