import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';

export interface Skill {
  id: string | null;
  name: string;
  proficiency: ProficiencyLevelsEnums;
}
