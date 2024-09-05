import { EmployeeSummary } from './employee.summary.model';

export interface Project {
  id: string;
  name: string;
  description: string;
  employees: EmployeeSummary[];
}
