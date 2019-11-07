import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksUrl = 'api/tasks';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
