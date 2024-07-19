import { SkillModel } from './skill.model';
import { Project } from './project.model';

export interface Employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skillsList: SkillModel[];
  projectsList: Project[];
  manager: Employee | null;
}
