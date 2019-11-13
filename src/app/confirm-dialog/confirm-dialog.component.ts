import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../confirmation.service';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private confirmationService: ConfirmationService,
              private taskService: TasksService) {

              }

  ngOnInit() {
  }

  deleteClicked(): void {
    this.tasks = this.confirmationService.getTasks();
  }
}
