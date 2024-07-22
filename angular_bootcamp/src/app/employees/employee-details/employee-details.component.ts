import { Component, Input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
export class EmployeeDetailsComponent {
  @Input() employee?: Employee;
  getManagerFullName(): string {
    return this.employee?.manager?.name + ' ' + this.employee?.manager?.surname;
  }
}
