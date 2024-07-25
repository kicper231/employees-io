import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';

export interface SkillModel {
  name: string;
  description: string;
  proficiency: ProficiencyLevelsEnums;
}
