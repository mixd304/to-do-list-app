import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { slideOutRight, slideInLeft } from 'ng-animate';
import { ConfirmationService } from '../confirmation.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  /*
  animations:[
    trigger('flyOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':leave', useAnimation(slideOutRight))
    ])
  ]
*/
})

export class TaskListComponent implements OnInit {
  showDoneTasks = true;
  tasks: Task[];
  deleteIDs: string[] = [];
  prev: boolean;

  // Definierte SWIPE Aktionen
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(private taskService: TasksService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getTasks();
    this.deleteIDs = [];
  }

  // Wird ausgeführt wenn das Swiperight oder Swipeleft
  // Und löscht den dabei geswipeden Task
  swipe(eventType, task: Task) {
    console.log(eventType);
    this.taskService.deleteTask(task);
    this.getTasks();
  }

  // Bindet das Task array dieser Klasse an das Observable vom TaskService
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  // Schaltet die anzeige ob ein Task erledigt wurde um
  toggle(task: Task): void {
    console.log('Task: ' + task.title + ' checked: ' + task.checked);
    task.checked = !task.checked;
    this.taskService.updateTask(task);
  }

  // übergibt den Suchstring an den TaskService
  searchTask(term: string): void {
    this.tasks = this.taskService.searchTask(term);
  }

  // Blendet erledigte Tasks ein oder aus
  toogleShowDoneTasks(): void {
    this.showDoneTasks = !this.showDoneTasks;
  }

  // löscht alle Markierten Tasks
  deleteTasks(): void {
    let tasksToDelete: Task[] = [];

    this.tasks.forEach(task => {
      const element: HTMLInputElement = document.getElementById('delete_' + task.id) as unknown as HTMLInputElement;

      if (element == null) {
        console.log('Element == null');
      } else {
        if(element.checked) {
          tasksToDelete.push(task);
          document.getElementById("list").insertAdjacentHTML(
            'beforeend',
            '<li>' + task.title + '</li>'
          );
        }
      }
    });

    this.confirmationService.setTasks(tasksToDelete);
  }

  getValue(id: string): boolean {
    if (this.deleteIDs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
