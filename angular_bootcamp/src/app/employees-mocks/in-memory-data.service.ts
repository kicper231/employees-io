import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // eslint-disable-next-line
  createDb(): {} | Observable<{}> | Promise<{}> {
    return {};
  }
}
