import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeBarComponent } from './ide-bar.component';

@NgModule({
  declarations: [
    IdeBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    IdeBarComponent
  ]
})
export class IdeBarModule { }
