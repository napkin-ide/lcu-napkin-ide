import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@lcu/common';
import { MarketplaceOverviewComponent } from './overview/overview.component';
import { MarketplaceLayoutComponent } from './layout/layout.component';
import { MarketplaceShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MarketplaceProfileComponent } from './profile/profile.component';
import { MarketplaceProductViewComponent } from './product-view/product-view.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';

@NgModule({
  declarations: [MarketplaceLayoutComponent, MarketplaceOverviewComponent, MarketplaceShoppingCartComponent, MarketplaceProfileComponent, MarketplaceProductViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarketplaceRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LcuNapkinIdeModule
  ],
  exports: [MarketplaceLayoutComponent, MarketplaceOverviewComponent],
  entryComponents: [MarketplaceLayoutComponent, MarketplaceOverviewComponent, MarketplaceShoppingCartComponent, MarketplaceProfileComponent]
})
export class MarketplaceModule {}
