import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '@lcu-ide/common';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [SettingsComponent]
})
export class PagesModule {}
