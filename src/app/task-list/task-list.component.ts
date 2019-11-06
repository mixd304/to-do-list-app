import { Component, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [{
    checked: false,
    description: 'Die Toilette reinigen',
    tags: ['Klo', 'Haushalt', 'WC'],
    title: 'Klo sauber machen'
  }, {
    checked: false,
    description: 'Die Toilette reinigen 2 ',
    tags: ['Klo', 'Haushalt', 'WC'],
    title: 'Klo sauber machen 2'
  }];

  constructor() { }

  ngOnInit() {
  }

}
