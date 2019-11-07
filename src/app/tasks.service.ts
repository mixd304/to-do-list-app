import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { Task } from './task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksUrl = 'api/tasks';

  constructor(
    private http: HttpClient,
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
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
