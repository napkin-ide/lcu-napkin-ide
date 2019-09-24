import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from './status-bar.component';
import { MaterialModule } from '@lcu/common';

@NgModule({
  declarations: [
    StatusBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    StatusBarComponent
  ]
})
export class StatusBarModule { }
