import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  showDoneTasks = true;
  tasks: Task[];
  deleteIDs: string[] = [];
  prev: boolean;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.getTasks();
    this.deleteIDs = [];
  }

  swipe(action =  this.SWIPE_ACTION.RIGHT) {
    console.log(action);
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  toggle(task: Task): void {
    console.log('Task: ' + task.title + ' checked: ' + task.checked);
    task.checked = !task.checked;
    this.taskService.updateTask(task);
  }

  searchTask(term: string): void {
    this.tasks = this.taskService.searchTask(term);
  }

  toogleShowDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }

  deleteTasks(): void {
    this.tasks.forEach(task => {
      const element: HTMLInputElement = document.getElementById('delete_' + task.id) as unknown as HTMLInputElement;

      if (element == null) {
        console.log('Element == null');
      } else {
        if(element.checked) {
          this.taskService.deleteTask(task);
        }
      }
    });
    this.getTasks();
  }

  getValue(id: string): boolean {
    if (this.deleteIDs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }



}
