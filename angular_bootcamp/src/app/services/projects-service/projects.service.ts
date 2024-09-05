import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectSummary } from '../../models/project-summary.model';
import { PROJECT_API_URL } from '../../core/urls.config';
import { Project } from '../../models/project.model';

import { mapProjectToProjectUpdateCreate } from '../../mappers/project-to-project-update-create.mapper';
import { ProjectUpdateCreate } from '../../models/project-update-create';
import { EmployeeSummary } from '../../models/employee.summary.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public isProjectBeingCreated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public projectsSummarySubject: BehaviorSubject<ProjectSummary[]> = new BehaviorSubject<ProjectSummary[]>([]);
  public projectsSummary$: Observable<ProjectSummary[]> = this.projectsSummarySubject.asObservable();

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  getProjects(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectSummary[]>(PROJECT_API_URL).pipe(
      map((response: ProjectSummary[] | ProjectSummary) => {
        return Array.isArray(response) ? response : [response];
      }),
      tap((projects) => {
        this.projectsSummarySubject.next(projects);
      }),
      catchError(this.handleError<ProjectSummary[]>('get Projects'))
    );
  }

  getProject(projectId: string): Observable<Project | undefined> {
    return this.http.get<Project>(`${PROJECT_API_URL}/${projectId}`).pipe(
      tap(() => {}),
      catchError(this.handleError<Project | undefined>('get ProjectSummary', undefined))
    );
  }

  setIsProjectBeingCreated(value: boolean): void {
    this.isProjectBeingCreated.next(value);
  }

  getIsProjectBeingCreated(): Observable<boolean> {
    return this.isProjectBeingCreated.asObservable();
  }

  addProject(project: Project): Observable<string> {
    const newProject: ProjectUpdateCreate = mapProjectToProjectUpdateCreate(project);

    return this.http.post<string>(PROJECT_API_URL, newProject, this.httpOptions).pipe(
      tap(() => {
        this.setIsProjectBeingCreated(false);
        this._snackBar.open('Pomyślnie dodano projekt!', '', { duration: 2000 });
      }),
      catchError(this.handleError<string>('add Employee'))
    );
  }

  updateProject(project: Project): Observable<ProjectUpdateCreate> {
    const updatedProject: ProjectUpdateCreate = mapProjectToProjectUpdateCreate(project);

    return this.http
      .put<ProjectUpdateCreate>(`${PROJECT_API_URL}/${project.id}`, updatedProject, this.httpOptions)
      .pipe(
        tap(() => {
          this._snackBar.open('Pomyślnie zaaktualizowano projekt!', '', { duration: 2000 });
        }),
        catchError(this.handleError<ProjectUpdateCreate>('update Project'))
      );
  }

  deleteProject(projectId: string): Observable<Project> {
    return this.http.delete<Project>(`${PROJECT_API_URL}/${projectId}`, this.httpOptions).pipe(
      tap(() => {
        this.getProjects();
        this._snackBar.open('Usunieto projekt!', '', { duration: 2000 });
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
