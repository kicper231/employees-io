import { Skill } from './skill.model';

export interface EmployeeUpdate {
  name: string;
  surname: string;
  hireDate: Date;
  skills: Skill[];
  projectIds: string[];
  managerId: string | null;
}
