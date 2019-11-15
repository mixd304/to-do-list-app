import { Injectable } from '@angular/core';
import { Task } from './task';

/*
  Service um Eine Aufgabe an den ConfirmService
*/
@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  tasks: Task[] = [];

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
