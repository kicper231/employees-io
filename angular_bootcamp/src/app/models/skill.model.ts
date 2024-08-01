import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';

export interface Skill {
  name: string;
  proficiency: ProficiencyLevelsEnums;
}
