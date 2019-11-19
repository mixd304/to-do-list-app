import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { ConfirmationService } from '../confirmation.service';

/*
  Zeigt die Details eines To-Do's
*/
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  tagArray: string[];

  @Input() task: Task;
  constructor(private location: Location,
              private route: ActivatedRoute,
              private tasksService: TasksService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getTask();
  }

  /*
    ließt die id des aufgerufenen To-Do's aus der URL
  */
  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.tasksService.getTask(id);
  }

  /*
    splittet die Tags aus dem entsprechenden Tag input Feld
    und übergibt den Task zum speichern an den TaskService
  */
  save(tags: string): void {
    this.tagArray = tags.split(',');
    this.task.tags = this.tagArray;
    this.tasksService.updateTask(this.task);
    this.goBack();
  }

  // Eine Seite zurück
  goBack(): void {
    this.location.back();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  // löscht den gewählten Task
  delete(): void {
    this.tasksService.deleteTask(this.task);
    this.goBack();
  }

  // fügt die überschrift des gewählten To-Do zu dem Modalen Confirm Dialog
  deleteClicked(): void {
    document.getElementById('list').insertAdjacentHTML(
      'beforeend',
      '<li>' + this.task.title + '</li>'
    );
    this.confirmationService.setTasks([this.task]);
  }

}
