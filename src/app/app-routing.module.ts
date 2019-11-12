import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {path: 'table', component: TaskListComponent},
  {path: 'details/:id', component: TaskDetailsComponent},
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'add', component: AddTaskComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
