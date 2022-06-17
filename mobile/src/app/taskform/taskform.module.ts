import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskformPageRoutingModule } from './taskform-routing.module';

import { TaskformPage } from './taskform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskformPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TaskformPage]
})
export class TaskformPageModule {}
