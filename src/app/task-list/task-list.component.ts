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
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.getTasks();
    this.deleteIDs = [];
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

  /*toggleDelete(id: string): void {
    console.log('AUFRUF' + id);

    if(this.deleteIDs.includes(id)) {
      console.log('löschen');
      this.deleteIDs.splice(this.deleteIDs.indexOf(id), 1);
    } else {
      console.log('hinzufügen');
      this.deleteIDs.push(id);
    }

    for(let i = 0; i < this.deleteIDs.length; i++) {
      console.log(this.deleteIDs[i]);
    }
  }*/

  deleteTasks(): void {
    this.tasks.forEach(task => {
      let element: HTMLInputElement = document.getElementById('delete_' + task.id) as unknown as HTMLInputElement;

      if (element == null) {
        console.log('Element == null');
      } else {
        if(element.checked) {
          this.taskService.deleteTask(task);
        }
      }
    });
  }

  getValue(id: string): boolean {
    if (this.deleteIDs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }



}
