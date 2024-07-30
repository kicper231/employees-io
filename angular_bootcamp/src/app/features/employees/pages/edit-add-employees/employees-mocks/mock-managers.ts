import { Employee } from '../../../../../models/employee.model';

export const MANAGERS: Employee[] = [
  {
    name: 'Karol ',
    hireDate: new Date(Date.now()),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Menagerski',
    manager: null,
  },
  {
    name: 'Kinga',
    hireDate: new Date('11/03/2023'),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Rozsądna',
    manager: null,
  },
  {
    name: 'Karolina',
    hireDate: new Date('11/12/1900'),
    id: crypto.randomUUID(),
    projectsList: [],
    skillsList: [],
    surname: 'Szefowa',
    manager: null,
  },
];
