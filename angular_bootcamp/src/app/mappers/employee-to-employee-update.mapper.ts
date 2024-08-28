import { Employee } from '../models/employee.model';
import { EmployeeCreateUpdate } from '../models/employee-update-create.model';

export function mapEmployeeToEmployeeUpdate(employee: Employee): EmployeeCreateUpdate {
  return {
    name: employee.name,
    surname: employee.surname,
    hireDate: employee.hireDate,
    skills: employee.skills,
    projectIds: employee.projects.map((project) => project.id),
    managerId: employee.manager?.id ?? null,
  };
}
