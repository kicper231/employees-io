import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeDetailsSkillsComponent } from '../employee-details-skills/employee-details-skills.component';
import { EmployeeDetailsProjectsComponent } from '../employee-details-projects/employee-details-projects.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
    EmployeeDetailsSkillsComponent,
    EmployeeDetailsProjectsComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  private _employee!: Employee;
  @Output() updatedEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  employeeForm!: FormGroup<{
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    hireDate: FormControl<string | null>;
  }>;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      hireDate: ['', Validators.required],
    });
    this.employeeForm.valueChanges.subscribe((value) => {
      const editedEmployee = {
        ...this.employee,
        ...value,
      };
      console.log('cos sise stalo');
      this.updatedEmployee.emit(editedEmployee as Employee);
    });
  }

  ngOnInit(): void {
    console.log('eee');
  }

  getManagerFullName(): string {
    return this.employee?.manager?.name + ' ' + this.employee?.manager?.surname;
  }

  @Input()
  public set employee(employee: Employee) {
    this._employee = employee;
    if (employee) {
      this.employeeForm.patchValue({
        name: employee.name,
        surname: employee.surname,
        hireDate: employee.hireDate.toString(),
      });
    }
  }

  public get employee() {
    return this._employee;
  }
}
