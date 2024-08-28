import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectSummary } from '../../models/project-summary.model';
import { EMPLOYEE_API_URL, PROJECT_API_URL } from '../../core/urls.config';
import { Project } from '../../models/project.model';

import { mapProjectToProjectUpdateCreate } from '../../mappers/project-to-project-update-create.mapper';
import { ProjectUpdateCreate } from '../../models/project-update-create';

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

  getProjects(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectSummary[]>(PROJECT_API_URL).pipe(
      map((response: ProjectSummary[] | ProjectSummary) => {
        return Array.isArray(response) ? response : [response];
      }),
      tap((ProjectsP) => {}),
      catchError(this.handleError<ProjectSummary[]>('get Projects'))
    );
  }

  getProject(projectId: string): Observable<Project | undefined> {
    return this.http.get<Project>(`${PROJECT_API_URL}/${projectId}`).pipe(
      tap(() => {}),
      catchError(this.handleError<Project | undefined>('get ProjectSummary', undefined))
    );
  }

  addProject(project: Project): Observable<string> {
    let newProject: ProjectUpdateCreate = mapProjectToProjectUpdateCreate(project);

    return this.http.post<string>(PROJECT_API_URL, newProject, this.httpOptions).pipe(
      tap(() => {
        //  this.messagesService.addMessage(MessagesTypes.EmployeeAdded);
        // this.setIsEmployeeBeingCreated(false);
        // this.getEmployees();
        this._snackBar.open('Pomyślnie dodano projekt!', '', { duration: 2000 });
      }),
      catchError(this.handleError<string>('add Employee'))
    );
  }

  updateProject(project: Project): Observable<Project> {
    let updatedProject: ProjectUpdateCreate = mapProjectToProjectUpdateCreate(project);

    return this.http.put<Project>(`${EMPLOYEE_API_URL}/${project.id}`, updatedProject, this.httpOptions).pipe(
      tap(() => {
        //this.getEmployees();
        this._snackBar.open('Pomyślnie zaaktualizowano usera!', '', { duration: 2000 });
      }),
      catchError(this.handleError<Project>('update Project'))
    );
  }

  deleteProject(projectId: string): Observable<Project> {
    return this.http.delete<Project>(`${EMPLOYEE_API_URL}/${projectId}`, this.httpOptions).pipe(
      tap(() => {
        //this.getProjects();
        this._snackBar.open('Usunieto usera!', '', { duration: 2000 });
      }),
      catchError(this.handleError<Project>('delete Project'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
