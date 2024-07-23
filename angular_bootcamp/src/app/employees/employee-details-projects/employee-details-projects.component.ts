import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-details-projects',
  standalone: true,
  imports: [],
  templateUrl: './employee-details-projects.component.html',
  styleUrl: './employee-details-projects.component.scss',
})
export class EmployeeDetailsProjectsComponent {
  @Input() employee!: Employee;
  @Input() employeeForm!: FormGroup;
}
