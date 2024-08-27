import { Skill } from './skill.model';
import { Project } from './project.model';
import { EmployeeSummary } from './employee.summary.model';

export interface Employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skills: Skill[];
  projects: Project[];
  manager: EmployeeSummary | null;
}
