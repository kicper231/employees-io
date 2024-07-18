import { Employee } from '../models/employee';

export const EMPLOYESS: Employee[] = [
  {
    name: 'Karol',
    hireDate: new Date(Date.now()),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
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
