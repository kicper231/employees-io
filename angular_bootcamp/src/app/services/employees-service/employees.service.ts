import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { MANAGERS } from '../../features/employees/pages/edit-add-employees/employees-mocks/mock-managers';
import { EMPLOYESS } from '../../features/employees/pages/edit-add-employees/employees-mocks/mock-employees';
import { Employee } from '../../models/employee.model';
import { MessagesService } from '../messages-service/messages.service';
import { MessagesTypes } from '../../enums/messages-types';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employees: Employee[] = EMPLOYESS;
  private managers: Employee[] = MANAGERS;

  public creatingEmployee: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private messagesService: MessagesService) {}

  getEmployees(): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.GetEmployees);
    return of(this.employees);
  }

  getManagers(): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.GetManagers);
    return of(this.managers);
  }

  // getCreatingEmployee(): Observable<boolean> {
  //   return this.creatingEmployee.asObservable();
  // }

  setCreatingEmployee(value: boolean): void {
    this.creatingEmployee.next(value);
  }
  getEmployee(employeeId: string): Observable<Employee | undefined> {
    return of(this.employees.find((employee: Employee) => employee.id == employeeId));
  }

  // setSelectedEmployee(value: Employee | undefined) {
  //   this.selectedEmployee.next(value);
  // }

  addEmployee(newEmployee: Employee): Observable<Employee[]> {
    this.messagesService.add(MessagesTypes.EmployeeAdded);
    this.employees.push(newEmployee);
    return of(this.employees);
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
