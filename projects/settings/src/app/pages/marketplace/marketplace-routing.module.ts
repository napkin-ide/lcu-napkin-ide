import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceOverviewComponent } from './overview/overview.component';
import { MarketplaceLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '**',
    component: MarketplaceLayoutComponent,
    children: [
      {
        path: '',
        component: MarketplaceOverviewComponent
      },
      {
        path: '**',
        component: MarketplaceOverviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
