import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeDetailsSkillsComponent } from '../employee-details-skills/employee-details-skills.component';
import { EmployeeDetailsProjectsComponent } from '../employee-details-projects/employee-details-projects.component';
import { EmployeesComponent } from '../employees-main/employees.component';

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
export class EmployeeDetailsComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  @Output() updatedEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  employeeForm!: FormGroup<{
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    skillsList: FormArray<any>;
    projectsList: FormArray<any>;
  }>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      skillsList: this.formBuilder.array([]),
      projectsList: this.formBuilder.array([]),
    });

    this.employeeForm.valueChanges.subscribe((value) => {
      const editedEmployee = {
        ...this.employee,
        ...value,
      };
      console.log('eee');
      this.updatedEmployee.emit(editedEmployee as Employee);
    });
  }

  getManagerFullName(): string {
    return this.employee?.manager?.name + ' ' + this.employee?.manager?.surname;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.employee) {
      this.employeeForm = this.formBuilder.group({
        name: [this.employee!.name, Validators.required],
        surname: [this.employee!.surname, Validators.required],
        skillsList: this.formBuilder.array([this.employee.skillsList.map((skill) => new FormControl(skill))]),
        projectsList: this.formBuilder.array([]),
      });
    }
  }
}
