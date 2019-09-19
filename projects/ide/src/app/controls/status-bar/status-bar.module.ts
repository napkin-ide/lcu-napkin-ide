import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from './status-bar.component';
import { MaterialModule } from '@lcu-ide/common';

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
