import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details-skills',
  standalone: true,
  imports: [],
  templateUrl: './employee-details-skills.component.html',
  styleUrl: './employee-details-skills.component.scss',
})
export class EmployeeDetailsSkillsComponent {
  @Input() employee!: Employee;
}
