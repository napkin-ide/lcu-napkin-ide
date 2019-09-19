import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDialogComponent } from './external-dialog.component';

@NgModule({
  declarations: [ExternalDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ExternalDialogComponent],
  entryComponents: [ExternalDialogComponent]
})
export class ExternalDialogModule {}
