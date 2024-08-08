import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

import { Employee } from '../../models/employee.model';
import { MessagesService } from '../messages-service/messages.service';
import { MessagesTypes } from '../../enums/messages-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPLOYEE_API_URL } from '../../core/urls.config';
import { MANAGERS } from '../../employees-mocks/mock-managers';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public isEmployeeBeingCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public refreshEmployeeListTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private managers: Employee[] = MANAGERS;

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(EMPLOYEE_API_URL)
      .pipe(tap(() => this.messagesService.add(MessagesTypes.GetEmployees)));
  }

  getManagers(): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.GetManagers);
    return of(this.managers);
  }

  setIsEmployeeBeingCreated(value: boolean): void {
    this.isEmployeeBeingCreated.next(value);
  }

  getIsEmployeeBeingCreated(): Observable<boolean> {
    return this.isEmployeeBeingCreated.asObservable();
  }

  getRefreshEmployeeListTrigger(): Observable<boolean> {
    return this.refreshEmployeeListTrigger.asObservable();
  }

  setRefreshEmployeeListTrigger(value: boolean): void {
    this.refreshEmployeeListTrigger.next(value);
  }

  getEmployee(employeeId: string): Observable<Employee | undefined> {
    return this.http.get<Employee>(`${EMPLOYEE_API_URL}/${employeeId}`).pipe(
      tap(() => this.messagesService.add(MessagesTypes.GetEmployee)),
      catchError(this.handleError<Employee | undefined>('get Employee', undefined))
    );
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EMPLOYEE_API_URL, newEmployee, this.httpOptions).pipe(
      tap(() => {
        this.messagesService.add(MessagesTypes.EmployeeAdded);
        this.setIsEmployeeBeingCreated(false);
        this.setRefreshEmployeeListTrigger(true);
      }),
      catchError(this.handleError<Employee>('add Employee'))
    );
  }
  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(EMPLOYEE_API_URL, updatedEmployee, this.httpOptions).pipe(
      tap(() => this.setRefreshEmployeeListTrigger(true)),
      catchError(this.handleError<Employee>('update Employee'))
    );
  }

  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.http.delete<Employee>(`${EMPLOYEE_API_URL}/${employeeId}`, this.httpOptions).pipe(
      tap(() => this.setRefreshEmployeeListTrigger(true)),
      catchError(this.handleError<Employee>('delete Employee'))
    );
  }

  searchEmployee(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return this.http
        .get<Employee[]>(EMPLOYEE_API_URL)
        .pipe(tap(() => this.messagesService.add(MessagesTypes.GetEmployees)));
    }
    return this.http.get<Employee[]>(`${EMPLOYEE_API_URL}/?name=${term}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messagesService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
