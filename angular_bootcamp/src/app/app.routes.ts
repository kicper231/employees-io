import { Routes } from '@angular/router';
import { EmployeesComponent } from './features/employees/pages/edit-add-employees/components/employees-main/employees.component';
import { DashboardComponent } from './features/employees/pages/dashboard/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './features/employees/pages/edit-add-employees/components/employee-details/employee-details.component';
import { ErrorComponent } from './core/error/error.component';

// import * as ROUTES from './core/routes.config';

// export const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: ROUTES.EMPLOYEES, component: EmployeesComponent },
//   { path: ROUTES.DASHBOARD, component: DashboardComponent },
//   { path: ROUTES.EMPLOYEE_DETAILS, component: EmployeeDetailsComponent },
//   { path: '**', component: DashboardComponent },
// ];
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeesComponent,
    children: [{ path: ':id', component: EmployeeDetailsComponent }],
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: ErrorComponent },
];
