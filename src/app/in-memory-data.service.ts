import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

import { Task } from "./task";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasks = [
      {
        id: 1,
        checked: true,
        description: 'Die Toilette reinigen',
        tags: ['Klo', 'Haushalt', 'WC'],
        title: 'Klo sauber machen'
      }, {
        id: 2,
        checked: false,
        description: 'Die Toilette reinigen 2 ',
        tags: ['Klo', 'Haushalt', 'WC'],
        title: 'Klo sauber machen 2'
      }
    ];
    return {tasks};
  }

  //stellt sicher das jede Aufgabe eine ID bekommt.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }

  constructor() { }
}
