import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { PanelsComponent } from './panels.component';

@NgModule({
  declarations: [PanelsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [PanelsComponent]
})
export class PanelsModule {}
