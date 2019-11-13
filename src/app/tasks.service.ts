import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private jsonObj: string;
  private tasks: Task[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getTask(id: number): Task {
    return JSON.parse(localStorage.getItem(id + '')) as Task;
  }

  updateTask(task: Task): void {
    localStorage.setItem(task.id + '', JSON.stringify(task));
  }

  getTasks(): Observable<Task[]> {
    let i;
    this.tasks = [];
    for (i = 1; i <= (localStorage.getItem('0') as unknown as number); i++) {
      const task: Task = JSON.parse(localStorage.getItem('' + i)) as Task;

      if (task == null) {
      } else {
        this.tasks.push(task);
      }
    }
    return of(this.tasks);
  }

  addTask(task: Task): void {
    let anzahl: number = localStorage.getItem('0') as unknown as number;
    if (anzahl == null) {
      anzahl = 1;
      localStorage.setItem('0', '1');
    } else {
      anzahl++;
      localStorage.setItem('0', anzahl + '');
    }

    task.id = anzahl;
    this.jsonObj = JSON.stringify(task);
    console.log('Title: ' + task.title + ', ID: ' + task.id );
    localStorage.setItem('' + task.id, this.jsonObj);
  }

  deleteTask(task: Task): void {
    localStorage.removeItem(task.id + '');

    let index;
    let i;

    for ( i = 0; i < this.tasks.length; i++) {
      if (task.id === this.tasks[i].id ) {
        index = i;
        break;
      }
    }
    //this.tasks.splice(i);
  }

  searchTask(term: string): Task[] {
    term = term.toLowerCase();
    let i: string | number;
    this.tasks = [];
    for (i = 1; i <= (localStorage.getItem('0') as unknown as number); i++) {
      const task: Task = JSON.parse(localStorage.getItem('' + i)) as Task;
      if (task == null) {

      } else {
        if (task.title.toLowerCase().match('.*' + term + '.*')) {
          this.tasks.push(task);
        }
      }
    }
    return this.tasks;
  }
}
