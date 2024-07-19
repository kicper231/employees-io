import { Employee } from '../models/employee.model';
import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';

export const EMPLOYESS: Employee[] = [
  {
    name: 'Karol',
    hireDate: new Date(Date.now()),
    id: crypto.randomUUID(),
    projectsList: [
      {
        name: 'Project a',
        description: 'Lorem ipsum dolor sit amet, consectetur',
        technologies: ['JavaScript', 'HTML', 'CSS'],
      },
      {
        name: 'Project b',
        description: 'Lorem ipsum dolor sit amet, consectetur',
        technologies: ['Flutter', 'TypeScript', 'CSS'],
      },
      {
        name: 'Project c',
        description: 'Lorem ipsum dolor sit amet, consectetur',
        technologies: ['C#', 'TypeScript', 'Angular'],
      },
    ],
    skillsList: [
      { name: 'JavaScript', description: 'Programming language', proficiency: ProficiencyLevelsEnums.advanced },
      {
        name: 'Angular',
        description: 'Angular is ok.',
        proficiency: ProficiencyLevelsEnums.begginer,
      },
    ],
    surname: 'Krol',
    manager: null,
  },
  {
    name: 'Kupila',
    hireDate: new Date('11/03/2023'),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Krolowa',
    manager: null,
  },
  {
    name: 'Karolina',
    hireDate: new Date('11/12/1900'),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Koralowaa',
    manager: null,
  },
  {
    name: 'Koloru',
    hireDate: new Date(Date.now()),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Kolarowa',
    manager: null,
  },
];
