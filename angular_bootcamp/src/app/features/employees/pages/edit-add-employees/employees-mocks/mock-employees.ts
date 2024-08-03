import { MANAGERS } from './mock-managers';
import { Employee } from '../../../../../models/employee.model';
import { ProficiencyLevelsEnums } from '../../../../../enums/proficiency-levels.enums';

export const EMPLOYESS: Employee[] = [
  {
    name: 'Karol',
    hireDate: new Date(Date.now()),
    id: '1',
    projectsList: [
      {
        name: 'Project a',
        description: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Project b',
        description: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Project c',
        description: 'Lorem ipsum dolor sit amet, consectetur',
      },
    ],
    skillsList: [
      { name: 'JavaScript', proficiency: ProficiencyLevelsEnums.advanced },
      {
        name: 'Angular',
        proficiency: ProficiencyLevelsEnums.begginer,
      },
    ],
    surname: 'Krol',
    manager: MANAGERS.at(1) ?? null,
  },
  {
    name: 'Kupila',
    hireDate: new Date('11/03/2023'),
    id: '2',
    projectsList: [],
    skillsList: [],
    surname: 'Krolowa',
    manager: MANAGERS.at(2) ?? null,
  },
  {
    name: 'Karolina',
    hireDate: new Date('11/12/1900'),
    id: '3',
    projectsList: [],
    skillsList: [],
    surname: 'Koralowaa',
    manager: MANAGERS.at(0) ?? null,
  },
  {
    name: 'Koloru',
    hireDate: new Date(Date.now()),
    id: '4',
    projectsList: [],
    skillsList: [],
    surname: 'Kolarowa',
    manager: MANAGERS.at(2) ?? null,
  },
];
