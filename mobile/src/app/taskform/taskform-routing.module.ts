import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskformPage } from './taskform.page';

const routes: Routes = [
  {
    path: '',
    component: TaskformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskformPageRoutingModule {}
