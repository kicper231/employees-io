import { ProficiencyLevels } from './proficiency-levels';

export interface Skill {
  name: string;
  description: string;
  proficiency: ProficiencyLevels;
}
