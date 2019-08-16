import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { MarketingRoutingModule } from './marketing-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule
  ],
  exports: [OverviewComponent]
})
export class MarketingModule { }
