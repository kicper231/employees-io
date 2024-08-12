import { FullName } from './full-name.pipe';
import { Employee } from '../../models/employee.model';
import { TestBed } from '@angular/core/testing';

describe('FullNamePipe', () => {
  let pipe: FullName;
  let baseEmployee: Employee;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FullName] });
    pipe = TestBed.inject(FullName);
    baseEmployee = {
      id: crypto.randomUUID(),
      name: '',
      surname: '',
      hireDate: new Date(),
      manager: null,
      skillsList: [],
      projectsList: [],
    };
  });

  it('create an instance', () => {
    const pipe = new FullName();
    expect(pipe).toBeTruthy();
  });

  it('transform function should return full name', () => {
    // arrange
    baseEmployee.name = 'Billie';
    baseEmployee.surname = 'Joe';

    const expectedFullName = 'Billie Joe';

    // act
    const result: string = pipe.transform(baseEmployee);

    // assert
    expect(result).toBe(expectedFullName);
  });

  it('transform function should return full name', () => {
    // arrange
    baseEmployee.name = 'Billie';
    baseEmployee.surname = 'Joe';

    const expectedFullName = 'Billie Joe';

    // act
    const result: string = pipe.transform(baseEmployee);

    // assert
    expect(result).toBe(expectedFullName);
  });

  it('should return empty string when both name and surname are empty', () => {
    // arrange
    const expectedFullName = '';

    // act
    const result: string = pipe.transform(baseEmployee);

    // assert
    expect(result).toBe(expectedFullName);
  });

  it('should return surname only when name is empty', () => {
    // arrange
    baseEmployee.surname = 'Joe';

    const expectedFullName = 'Joe';

    // act
    const result: string = pipe.transform(baseEmployee);

    // assert
    expect(result).toBe(expectedFullName);
  });

  it('should return name only when surname is empty', () => {
    // arrange
    baseEmployee.name = 'Billy';

    const expectedFullName = 'Billy';

    // act
    const result: string = pipe.transform(baseEmployee);

    // assert
    expect(result).toBe(expectedFullName);
  });

  it('should return a string type', () => {
    // arrange
    baseEmployee.name = 'Billie';
    baseEmployee.surname = 'Joe';

    const expectedFullNameType = 'string';

    // act
    const result: any = pipe.transform(baseEmployee);

    // assert
    expect(typeof result).toBe(expectedFullNameType);
  });

  it('should handle null or undefined input gracefully', () => {
    // arrange
    const employee = {};

    //  act assert
    expect(() => pipe.transform(employee as Employee)).toThrowError();
  });
});
