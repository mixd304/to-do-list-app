import { Component, OnInit, Output } from '@angular/core';
import { ConfirmationService } from '../confirmation.service';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  tasks: Task[] = [];
  @Output() deletedEvent = new EventEmitter();

  constructor(private confirmationService: ConfirmationService,
              private taskService: TasksService,
              private location: Location) {

              }

  ngOnInit() {
  }

  deleteClicked(): void {
    this.tasks = this.confirmationService.getTasks();
    this.tasks.forEach(task => {
      this.taskService.deleteTask(task);
    });

    this.deletedEvent.emit('deleted');
  }

  goBack(): void {
    this.location.back();
  }
}
