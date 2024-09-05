import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { Employee } from '../../models/employee.model';
import { MessagesService } from '../messages-service/messages.service';
import { MessagesTypes } from '../../enums/messages-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPLOYEE_API_URL } from '../../core/urls.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeSummary } from '../../models/employee.summary.model';
import { mapEmployeeToEmployeeUpdate } from '../../mappers/employee-to-employee-update.mapper';
import { EmployeeCreateUpdate } from '../../models/employee-update-create.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public isEmployeeBeingCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public employeesSummarySubject: BehaviorSubject<EmployeeSummary[]> = new BehaviorSubject<EmployeeSummary[]>([]);
  public employeesSummary$: Observable<EmployeeSummary[]> = this.employeesSummarySubject.asObservable();

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  getEmployees(): void {
    this.http
      .get<EmployeeSummary[]>(EMPLOYEE_API_URL)
      .pipe(
        tap((employees) => {
          this.messagesService.addMessage(MessagesTypes.GetEmployees);
          this.employeesSummarySubject.next(employees);
        }),
        catchError(this.handleError<Employee>('get Employees'))
      )
      .subscribe();
  }

  getManagers(): Observable<EmployeeSummary[]> {
    return this.http.get<EmployeeSummary[] | EmployeeSummary>(EMPLOYEE_API_URL).pipe(
      map((response: EmployeeSummary[] | EmployeeSummary) => {
        if (Array.isArray(response)) {
          return response;
        } else {
          return [response];
        }
      }),
      tap((employees: EmployeeSummary[]) => {
        this.messagesService.addMessage(MessagesTypes.GetEmployees);
      }),
      catchError(this.handleError<EmployeeSummary[]>('get Managers'))
    );
  }

  setIsEmployeeBeingCreated(value: boolean): void {
    this.isEmployeeBeingCreated.next(value);
  }

  getIsEmployeeBeingCreated(): Observable<boolean> {
    return this.isEmployeeBeingCreated.asObservable();
  }

  getEmployee(employeeId: string): Observable<Employee | undefined> {
    return this.http.get<Employee>(`${EMPLOYEE_API_URL}/${employeeId}`).pipe(
      tap(() => this.messagesService.addMessage(MessagesTypes.GetEmployee)),
      catchError(this.handleError<Employee | undefined>('get Employee', undefined))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const newEmployee: EmployeeCreateUpdate = mapEmployeeToEmployeeUpdate(employee);
    return this.http.post<Employee>(EMPLOYEE_API_URL, newEmployee, this.httpOptions).pipe(
      tap(() => {
        this.messagesService.addMessage(MessagesTypes.EmployeeAdded);
        this.setIsEmployeeBeingCreated(false);
        this.getEmployees();
        this._snackBar.open('Pomyślnie dodano pracownika', '', { duration: 2000 });
      }),

      catchError(this.handleError<Employee>('add Employee'))
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const updatedEmployee: EmployeeCreateUpdate = mapEmployeeToEmployeeUpdate(employee);

    return this.http.put<Employee>(`${EMPLOYEE_API_URL}/${employee.id}`, updatedEmployee, this.httpOptions).pipe(
      tap(() => {
        this.getEmployees();
        this._snackBar.open('Pomyślnie zaaktualizowano usera!', '', { duration: 2000 });
      }),
      catchError(this.handleError<Employee>('update Employee'))
    );
  }

  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.http.delete<Employee>(`${EMPLOYEE_API_URL}/${employeeId}`, this.httpOptions).pipe(
      tap(() => {
        this.getEmployees();
        this._snackBar.open('Usunieto usera!', '', { duration: 2000 });
      }),
      catchError(this.handleError<Employee>('delete Employee'))
    );
  }

  searchEmployee(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return this.http
        .get<Employee[]>(EMPLOYEE_API_URL)
        .pipe(tap(() => this.messagesService.addMessage(MessagesTypes.GetEmployees)));
    }
    return this.http.get<Employee[]>(`${EMPLOYEE_API_URL}?name=${term}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messagesService.addMessage(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
