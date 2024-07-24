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
import { Project } from '../../models/project.model';

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

  createSkillGroup(skill?: Skill): FormGroup {
    return this.formBuilder.group({
      name: new FormControl<string | null>(skill?.name ?? null),
      proficiency: new FormControl<ProficiencyLevelsEnums | null>(skill?.proficiency ?? null),
    });
  }

  createProjectGroup(project?: Project): FormGroup {
    return this.formBuilder.group({
      name: [project?.name ?? null],
      description: [project?.name ?? null],
      technologies: new FormControl<string[] | null>(project?.technologies ?? null),
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
  }

  ngOnInit(): void {}

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
        ...employee,
        hireDate: this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      });
      //  this.employeeForm.setControl('skillsList', employee.skillsList);
    }
    let skillsArray: FormGroup<{
      name: FormControl<string | null>;
      description: FormControl<string | null>;
      proficiency: FormControl<ProficiencyLevelsEnums | null>;
    }>[] = [];
    employee.skillsList.forEach((skill) => skillsArray.push(this.createSkillGroup(skill)));
    this.employeeForm.setControl('skillsList', this.formBuilder.array(skillsArray || []));

    let projectArray: FormGroup<{
      name: FormControl<string | null>;
      description: FormControl<string | null>;
      technologies: FormControl<string[] | null>;
    }>[] = [];
    employee.projectsList.forEach((project) => projectArray.push(this.createProjectGroup(project)));
    this.employeeForm.setControl('projectsList', this.formBuilder.array(projectArray || []));

    console.log(employee);
    console.log(this.employeeForm.getRawValue());
  }

  public get employee() {
    return this._employee;
  }

  public onSubmit() {
    // console.log('onsubmit');
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
    return this.employeeForm.get('skillsList') as FormArray;
    //  return this.employeeForm.controls['skillsList'] as FormArray;
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
