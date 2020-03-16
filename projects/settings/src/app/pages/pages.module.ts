import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@lcu/common';
import { SettingsSetupComponent } from './settings-setup/settings-setup.component';
import { SettingsConfigComponent } from './settings-config/settings-config.component';
import { SettingsArchComponent } from './settings-arch/settings-arch.component';
import { SettingsActbarComponent } from './settings-actbar/settings-actbar.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';

@NgModule({
  declarations: [
    SettingsSetupComponent,
    SettingsConfigComponent,
    SettingsArchComponent,
    SettingsActbarComponent,
    SettingsSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LcuNapkinIdeModule
  ],
  exports: [
    SettingsSetupComponent,
    SettingsConfigComponent,
    SettingsArchComponent,
    SettingsActbarComponent,
    SettingsSidebarComponent
  ],
  entryComponents: [
    SettingsSetupComponent,
    SettingsConfigComponent,
    SettingsArchComponent,
    SettingsActbarComponent,
    SettingsSidebarComponent
  ]
})
export class PagesModule {}
