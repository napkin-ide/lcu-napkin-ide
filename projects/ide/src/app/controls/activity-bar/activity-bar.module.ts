import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDialogModule } from '@napkin-ide/lcu-napkin-ide-common';
import { ActivityBarComponent } from './activity-bar.component';

@NgModule({
  declarations: [ActivityBarComponent],
  imports: [
    CommonModule,
    ExternalDialogModule,
    MaterialModule
  ],
  exports: [ActivityBarComponent]
})
export class ActivityBarModule {}
