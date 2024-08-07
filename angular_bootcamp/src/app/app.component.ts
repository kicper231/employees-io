import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/layout/header/header.component';
import { EmployeesComponent } from './features/employees/pages/edit-add-employees/components/employees-main/employees.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { DashboardComponent } from './features/employees/pages/dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeesComponent, HeaderComponent, FooterComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular_bootcamp';
}
