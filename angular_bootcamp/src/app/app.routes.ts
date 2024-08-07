import { Routes } from '@angular/router';
import { DashboardComponent } from './features/employees/pages/dashboard/dashboard/dashboard.component';
import * as ROUTES from './core/routes.config';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.DASHBOARD, pathMatch: 'full' },
  {
    path: ROUTES.EMPLOYEES,
    loadComponent: () =>
      import('./features/employees/pages/edit-add-employees/components/employees-main/employees.component').then(
        (mod) => mod.EmployeesComponent
      ),
    children: [
      {
        path: ROUTES.EMPLOYEES_DETAILS,
        loadComponent: () =>
          import(
            './features/employees/pages/edit-add-employees/components/employee-details/employee-details.component'
          ).then((mod) => mod.EmployeeDetailsComponent),
      },
    ],
  },
  { path: ROUTES.DASHBOARD, component: DashboardComponent },
  { path: '**', loadComponent: () => import('./core/error/error.component').then((mod) => mod.ErrorComponent) },
];
