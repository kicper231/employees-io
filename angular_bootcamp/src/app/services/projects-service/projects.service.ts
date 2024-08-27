import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../models/project.model';
import { PROJECT_API_URL } from '../../core/urls.config';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECT_API_URL).pipe(
      map((response: Project[] | Project) => {
        return Array.isArray(response) ? response : [response];
      }),
      tap((ProjectsP) => {}),
      catchError(this.handleError<Project[]>('get Projects'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
