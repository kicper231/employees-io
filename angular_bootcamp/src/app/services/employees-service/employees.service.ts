import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { MANAGERS } from '../../features/employees/pages/edit-add-employees/employees-mocks/mock-managers';
import { EMPLOYESS } from '../../features/employees/pages/edit-add-employees/employees-mocks/mock-employees';
import { Employee } from '../../models/employee.model';
import { MessagesService } from '../messages-service/messages.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employees: Employee[] = EMPLOYESS;
  private managers: Employee[] = MANAGERS;

  public creatingEmployee: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public selectedEmployee: BehaviorSubject<Employee | undefined> = new BehaviorSubject<Employee | undefined>(undefined);

  constructor(private messagesService: MessagesService) {}

  getEmployees(): Observable<Employee[]> {
    this.messagesService.add('EmployeesServices: getEmployees()');
    return of(this.employees);
  }

  getManagers(): Observable<Employee[]> {
    this.messagesService.add('EmployeesServices: getManagers()');
    return of(this.managers);
  }

  getCreatingEmployee(): Observable<boolean> {
    return this.creatingEmployee.asObservable();
  }

  setCreatingEmployee(value: boolean): void {
    this.creatingEmployee.next(value);
  }
  getSelectedEmployee(): Observable<Employee | undefined> {
    return this.selectedEmployee.asObservable();
  }

  setSelectedEmployee(value: Employee | undefined) {
    this.selectedEmployee.next(value);
  }

  addEmployee(newEmployee: Employee): Observable<Employee[]> {
    this.messagesService.add('EmployeesServices: addEmployee()');
    this.employees.push(newEmployee);
    return of(this.employees);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee[]> {
    this.messagesService.add('EmployeesServices: updateEmployees()');
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    return of(this.employees);
  }

  deleteEmployee(employeeId: string): Observable<Employee[]> {
    this.messagesService.add('EmployeesServices: deleteEmployees()');
    this.employees = this.employees.filter((employee) => employee.id !== employeeId);
    return this.getManagers();
  }
}
