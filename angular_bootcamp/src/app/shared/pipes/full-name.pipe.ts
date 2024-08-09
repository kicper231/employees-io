import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullName implements PipeTransform {
  transform(employee: Employee): string {
    if (!employee || employee.name === undefined || employee.surname === undefined) {
      throw new Error('Both name and surname are defined');
    }

    return employee.name != '' && employee.surname != ''
      ? employee.name + ' ' + employee.surname
      : employee.name + employee.surname;
  }
}
