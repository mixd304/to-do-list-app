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
  private jsonObj: string;
  private tasks: Task[] = [];

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /*
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

  addTask(task: Task): Observable<any> {
    return this.http.post(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<any>('addTask'))
    );
  }
  */

  getTask(id: number): Task {
    return JSON.parse(localStorage.getItem(id + '')) as Task;
  }

  updateTask(task: Task): void {
    localStorage.setItem(task.id + '', JSON.stringify(task));
  }

  getTasks(): Task[] {
    let i;
    this.tasks = [];
    for (i = 1; i <= localStorage.length; i++) {
      this.tasks.push(JSON.parse(localStorage.getItem(''+i)) as Task);
    }
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = localStorage.length + 1;
    this.jsonObj = JSON.stringify(task);
    console.log("Title: " + task.title + ", ID: " + task.id );
    localStorage.setItem('' + task.id, this.jsonObj);
  }

  searchTask(term: string): Observable<any> {
    return this.http.get<Task[]>(`${this.tasksUrl}/?title=${term}`).pipe(
      catchError(this.handleError<any>('searchTask'))
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
