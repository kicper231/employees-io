import { EmployeeSummary } from './employee.summary.model';

export interface ProjectUpdateCreate {
  name: string;
  description: string;
  employeeIds: string[];
}
