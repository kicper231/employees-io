import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details-projects',
  standalone: true,
  imports: [],
  templateUrl: './employee-details-projects.component.html',
  styleUrl: './employee-details-projects.component.scss',
})
export class EmployeeDetailsProjectsComponent {
  @Input() employee!: Employee;
}
