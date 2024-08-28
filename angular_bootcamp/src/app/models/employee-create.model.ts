import { Skill } from './skill.model';
import { ProjectSummary } from './project-summary.model';
import { EmployeeSummary } from './employee.summary.model';

export interface Employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skills: Skill[];
  projects: ProjectSummary[];
  manager: EmployeeSummary | null;
}
