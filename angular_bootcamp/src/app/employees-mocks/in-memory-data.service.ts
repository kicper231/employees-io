import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { ProficiencyLevelsEnums } from '../enums/proficiency-levels.enums';
import { MANAGERS } from './mock-managers';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // eslint-disable-next-line
  createDb(): {} | Observable<{}> | Promise<{}> {
    return {};
  }
}
