import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;
  constructor(private location: Location, private route: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tasksService.getTask(id).subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

}
