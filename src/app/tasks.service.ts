import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getTasks(): Task[] {
    let i;
    this.tasks = [];
    for (i = 1; i <= localStorage.length; i++) {
      this.tasks.push(JSON.parse(localStorage.getItem('' + i)) as Task);
    }
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = localStorage.length + 1;
    this.jsonObj = JSON.stringify(task);
    console.log('Title: ' + task.title + ', ID: ' + task.id );
    localStorage.setItem('' + task.id, this.jsonObj);
  }

  searchTask(term: string): Task[] {
    let i;
    this.tasks = [];

    for (i = 1; i <= localStorage.length; i++) {
      const task: Task = JSON.parse(localStorage.getItem('' + i)) as Task;
      if (task.title.match('.*' + term + '.*')) {
        this.tasks.push(task);
      }
    }
    return this.tasks;
  }
}
