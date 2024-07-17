import { skill } from './skill';
import { project } from './project';

export interface employee {
  name: string;
  surname: string;
  id: string;
  hireDate: Date;
  skillsList: skill[];
  projectsList: project[];
  // ewentualnie nowa klasa lub pole ismanager
  manager: employee | null;
}
