import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ProficiencyLevelsEnums } from '../../enums/proficiency-levels.enums';
import { MANAGERS } from '../../mocks/mock-managers';
import { Skill } from '../../models/skill.model';

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
  providers: [DatePipe],
})
export class EmployeeDetailsComponent implements OnInit {
  private _employee!: Employee;
  @Output() updatedEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Input() managers = MANAGERS;

  countries: string[] = ['USA', 'UK', 'Canada'];

  employeeForm!: FormGroup<{
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    surname: FormControl<string | null>;
    hireDate: FormControl<string | null>;
    skillsList: FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        description: FormControl<string | null>;
        proficiency: FormControl<ProficiencyLevelsEnums | null>;
      }>
    >;
    projectsList: FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        description: FormControl<string | null>;
        technologies: FormControl<string[] | null>;
      }>
    >;
    manager: FormControl<Employee | null>;
  }>;

  createSkillGroup(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      proficiency: new FormControl<ProficiencyLevelsEnums | null>(null),
    });
  }

  createProjectGroup(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
      technologies: new FormControl<string[] | null>(null),
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      hireDate: [new FormControl<string | null>(null)],
      skillsList: this.formBuilder.array([this.createSkillGroup()]),
      projectsList: this.formBuilder.array([this.createProjectGroup()]),
      manager: [new FormControl<Employee | null>(null), Validators.required],
    });

    // this.employeeForm.valueChanges.subscribe((value) => {
    //   const editedEmployee = {
    //     ...this.employee,
    //     ...value,
    //   };
    //   console.log('cos sise stalo');
    //   this.updatedEmployee.emit(editedEmployee as Employee);
    // });
  }

  ngOnInit(): void {
    console.log('eee');
  }

  getManagerFullName(employee?: Employee): string {
    return employee == null
      ? this.employee?.manager?.name + ' ' + this.employee?.manager?.surname
      : employee?.name + ' ' + employee.surname;
  }

  @Input()
  public set employee(employee: Employee) {
    this._employee = employee;
    if (employee) {
      this.employeeForm.patchValue({
        id: employee.id,
        name: employee.name,
        surname: employee.surname,
        manager: employee.manager,
        hireDate: this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
        skillsList: employee.skillsList,
        projectsList: employee.projectsList,
      });
    }
  }

  public get employee() {
    return this._employee;
  }

  public onSubmit() {
    console.log('onsubmit');
    console.log(this.convertRawValueToEmployee(this.employeeForm.getRawValue()));

    if (this.employeeForm.valid) {
      this.updatedEmployee.emit(this.convertRawValueToEmployee(this.employeeForm.getRawValue()));
    } else {
      alert('The form contains errors');
    }
  }

  public onReset() {
    this.employeeForm.reset();
  }

  private convertRawValueToEmployee(formValue: any): Employee {
    return {
      ...formValue,
    };
  }

  get skillsList(): FormArray {
    return this.employeeForm?.controls['skillsList'] as FormArray;
  }

  public addSkill() {
    const skill: Skill = {
      name: '',
      description: '',
      proficiency: ProficiencyLevelsEnums.begginer,
    };
    this.skillsList.push(this.formBuilder.group(this.createSkillGroup()));
  }
}
