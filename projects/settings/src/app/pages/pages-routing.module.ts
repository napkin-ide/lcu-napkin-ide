import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsSetupComponent } from './settings-setup/settings-setup.component';
import { SettingsConfigComponent } from './settings-config/settings-config.component';
import { SettingsArchComponent } from './settings-arch/settings-arch.component';

const routes: Routes = [
  {
    path: 'setup',
    component: SettingsSetupComponent
  },
  {
    path: 'configuration',
    component: SettingsConfigComponent
  },
  {
    path: 'architecture',
    component: SettingsArchComponent
  },
  {
    path: 'marketplace',
    loadChildren: './marketplace/marketplace.module#MarketplaceModule'
  },
  {
    path: '**', redirectTo: 'architecture'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
