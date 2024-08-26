import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeSummary } from '../../models/employee-summary.model';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullName implements PipeTransform {
  transform(employee: EmployeeSummary): string {
    if (!employee || employee.name === undefined || employee.surname === undefined) {
      throw new Error('Name or surname are undefined!');
    }

    return employee.name != '' && employee.surname != ''
      ? employee.name + ' ' + employee.surname
      : employee.name + employee.surname;
  }
}
