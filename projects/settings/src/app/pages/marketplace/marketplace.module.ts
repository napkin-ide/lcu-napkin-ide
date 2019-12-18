import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@lcu/common';
import { MarketplaceOverviewComponent } from './overview/overview.component';
import { MarketplaceLayoutComponent } from './layout/layout.component';
import { MarketplaceShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [MarketplaceLayoutComponent, MarketplaceOverviewComponent, MarketplaceShoppingCartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarketplaceRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [MarketplaceLayoutComponent, MarketplaceOverviewComponent],
  entryComponents: [MarketplaceLayoutComponent, MarketplaceOverviewComponent, MarketplaceShoppingCartComponent]
})
export class MarketplaceModule {}
