import { Routes } from '@angular/router';
import { EmployeesComponent } from './features/employees/pages/edit-add-employees/components/employees-main/employees.component';
import { DashboardComponent } from './features/employees/pages/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
