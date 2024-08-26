import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';

export interface Skill {
  id: string;
  name: string;
  proficiency: ProficiencyLevelsEnums;
}
