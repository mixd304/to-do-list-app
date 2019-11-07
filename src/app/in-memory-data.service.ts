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
        checked: true,
        description: 'Die Toilette reinigen',
        tags: ['Klo', 'Haushalt', 'WC'],
        title: 'Klo sauber machen'
      }, {
        checked: false,
        description: 'Die Toilette reinigen 2 ',
        tags: ['Klo', 'Haushalt', 'WC'],
        title: 'Klo sauber machen 2'
      }
    ];
    return {tasks};
  }

  constructor() { }
}
