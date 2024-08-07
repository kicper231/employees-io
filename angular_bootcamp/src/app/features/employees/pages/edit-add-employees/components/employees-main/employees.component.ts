import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe, NgForOf, NgIf, UpperCasePipe, Location } from '@angular/common';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeesService } from '../../../../../../services/employees-service/employees.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { BasicButtonComponent } from '../../../../../../shared/components/basic-button/basic-button.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe,
    NgForOf,
    NgIf,
    DatePipe,
    EmployeesListComponent,
    EmployeeDetailsComponent,
    JsonPipe,
    MatSlideToggleModule,
    RouterOutlet,
    MatIcon,
    BasicButtonComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private location: Location,
    private employeesService: EmployeesService
  ) {}

  goBack(): void {
    this.location.back();
    this.employeesService.setRefreshTrigger(true);
  }
}
