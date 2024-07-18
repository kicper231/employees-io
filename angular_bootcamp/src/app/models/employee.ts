import { Skill } from './skill';
import { Project } from './project';

export interface Employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skillsList: Skill[];
  projectsList: Project[];
  manager: Employee | null;
}
