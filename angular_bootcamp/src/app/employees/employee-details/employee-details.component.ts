import { Component, Input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, UpperCasePipe, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  @Input() employee?: Employee;
}
