import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../../../../models/employee.model';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullName implements PipeTransform {
  transform(employee: Employee): string {
    return employee.name + ' ' + employee.surname;
  }
}
