// później do ewentualnego  przeniesienia
enum proficiencyLevels {
  begginer,
  intermediate,
  advanced,
}

export interface skill {
  name: string;
  description: string;
  proficiency: proficiencyLevels;
}
