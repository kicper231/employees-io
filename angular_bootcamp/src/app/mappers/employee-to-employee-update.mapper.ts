import { Employee } from '../models/employee.model';
import { EmployeeUpdate } from '../models/employee-update.model';

export function mapEmployeeToEmployeeUpdate(employee: Employee): EmployeeUpdate {
  return {
    name: employee.name,
    surname: employee.surname,
    hireDate: employee.hireDate,
    skills: employee.skills,
    projectIds: employee.projects.map((project) => project.id),
    managerId: employee.manager?.id ?? null,
  };
}
