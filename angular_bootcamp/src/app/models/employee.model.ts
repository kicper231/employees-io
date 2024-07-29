import { Skill } from './skill.model';
import { Project } from './project.model';

export interface Employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skillsList: Skill[];
  projectsList: Project[];
  manager: Employee | null;
}
