import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  tagArray: string[];

  @Input() task: Task;
  constructor(private location: Location, private route: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.tasksService.getTask(id);
  }

  save(tags: string): void {
    this.tagArray = tags.split(',');
    this.task.tags = this.tagArray;
    this.tasksService.updateTask(this.task);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  delete(): void {
    this.tasksService.deleteTask(this.task);
    this.goBack();
  }

}
