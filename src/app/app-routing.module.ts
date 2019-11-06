import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent } from "./task-list/task-list.component";

const routes: Routes = [
  {path: 'table', component: TaskListComponent},
  {path: '', redirectTo: 'table', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
