import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceOverviewComponent } from './overview/overview.component';
import { MarketplaceLayoutComponent } from './layout/layout.component';
import { MarketplaceShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MarketplaceProfileComponent } from './profile/profile.component';
import { MarketplaceProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceLayoutComponent,
    children: [
      {
        path: '',
        component: MarketplaceOverviewComponent
      },
      {
        path: 'product/:product_title',
        component: MarketplaceProductViewComponent
      },
      {
        path: 'cart',
        component: MarketplaceShoppingCartComponent
      },
      {
        path: 'profile',
        component: MarketplaceProfileComponent
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
