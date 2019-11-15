import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from './task';

/*
  Service der die Anwednung mit den To-Do' aus dem LocalStorage versorgt
*/
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private jsonObj: string;
  private tasks: Task[] = [];

  constructor(
  ) { }

  /*
    Ließt einen To-Do aus dem LocalStorage
    Dabei wird der JSON String in ein Objekt umgewandelt
    und als Task zurückgegeben
  */
  getTask(id: number): Task {
    return JSON.parse(localStorage.getItem(id + '')) as Task;
  }

  /*
    ersetzt einen Task in dem LocalStorage anhand der ID
  */
  updateTask(task: Task): void {
    localStorage.setItem(task.id + '', JSON.stringify(task));
  }

  /*
    ließt alle To-Do's aus dem LocalStorage und gibt sie als Task Array zurück
    die Stelle mit dem Key '0' nehmen wir dabei um die Anzahl der To-Do's zu speichern
    die ID von einem gelöschten Task wird nicht neu vergeben
  */
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

  /*
    Fügt einen Task dem LocalStorage hinzu
    stelle '0' im LocalStorage ist die Anzahl der To-Do's
  */
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

  /*
    Entfernt ein To-Do aus dem LocalStorage
  */
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

  /*
    Wandelt den suchstring in Lower Case um und durchsucht den
    LocalStorage nach tasks mit einem Titel der dem suchstring matched

    Dabei ist es egal an welcher Stelle sich der String befindet
  */
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
