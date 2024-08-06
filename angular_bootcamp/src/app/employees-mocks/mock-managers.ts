import { Employee } from '../models/employee.model';

export const MANAGERS: Employee[] = [
  {
    name: 'Karol ',
    hireDate: new Date(Date.now()),
    id: '1',
    projectsList: [],
    skillsList: [],
    surname: 'Menagerski',
    manager: null,
  },
  {
    name: 'Kinga',
    hireDate: new Date('11/03/2023'),
    id: '2',
    projectsList: [],
    skillsList: [],
    surname: 'Rozsądna',
    manager: null,
  },
  {
    name: 'Karolina',
    hireDate: new Date('11/12/1900'),
    id: '3',
    projectsList: [],
    skillsList: [],
    surname: 'Szefowa',
    manager: null,
  },
];
