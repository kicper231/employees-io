import { Skill } from './skill.model';

export interface EmployeeCreateUpdate {
  name: string;
  surname: string;
  hireDate: Date;
  skills: Skill[];
  projectIds: string[];
  managerId: string | null;
}
