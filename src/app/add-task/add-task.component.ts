import { Component, OnInit, Output } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task;
  tagArray: string[];
  @Output() saved = new EventEmitter();

  constructor(private tasksService: TasksService, private location: Location) { }

  ngOnInit() {
  }

  // Hinzufügen eines neuen Tasks zum TaskService
  // Input = Inhalte der Input-Felder
  add(title: string, description: string, tags: string): void {
    if ( !title ) { return; }
    this.task = new Task();

    this.tagArray = tags.split(',');
    this.task.checked = false;
    this.task.title = title;
    this.task.description = description;
    this.task.tags = this.tagArray;

    this.tasksService.addTask(this.task);

    this.saved.emit(null);
  }
}
