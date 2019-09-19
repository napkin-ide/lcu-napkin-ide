import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyElementModule } from '@lowcodeunit/lazy-element';
import { EditorsComponent } from './editors.component';

@NgModule({
  declarations: [EditorsComponent],
  imports: [
    CommonModule,
    LazyElementModule,
    MaterialModule
  ],
  exports: [EditorsComponent]
})
export class EditorsModule {}
