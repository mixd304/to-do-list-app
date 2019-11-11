import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  showDoneTasks: boolean = true;
  tasks: Task[];
  prev: boolean;
  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggle(task: Task): void {
    console.log('Task: ' + task.title + ' checked: ' + task.checked);
    this.prev = task.checked;
    task.checked = !this.prev;
    this.taskService.updateTask(task).subscribe();
  }

  searchTask(term: string): void {
    this.taskService.searchTask(term).subscribe(tasks => this.tasks = tasks);
  }

  toogleShowDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }

}
