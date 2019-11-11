import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task;
  tagArray: string[];

  constructor(private tasksService: TasksService, private location: Location) { }

  ngOnInit() {
  }

  add(title: string, description: string, tags: string): void {
    if(!title) { return; }
    this.task = new Task();

    this.tagArray = tags.split(',');
    this.task.checked = false;
    this.task.title = title;
    this.task.description = description;
    this.task.tags = this.tagArray;

    this.tasksService.addTask(this.task);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
