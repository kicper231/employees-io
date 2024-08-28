import { Employee } from '../models/employee.model';
import { EmployeeCreateUpdate } from '../models/employee-update-create.model';
import { Project } from '../models/project.model';
import { ProjectUpdateCreate } from '../models/project-update-create';

export function mapProjectToProjectUpdateCreate(project: Project): ProjectUpdateCreate {
  return {
    name: project.name,
    description: project.description,
    employeeIds: project.employees.map((employee) => employee.id),
  };
}
