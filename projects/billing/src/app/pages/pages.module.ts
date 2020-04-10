import { MaterialModule, PipeModule } from '@lcu/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BillingComponent } from './billing/billing.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { BillingFlowComponent } from './billing-flow/billing-flow.component';
import { PlansComponent } from './plans/plans.component';

@NgModule({
  declarations: [BillingComponent, CompleteComponent, BillingFlowComponent, PlansComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LcuNapkinIdeModule,
    PipeModule
  ],
  exports: [BillingComponent, BillingFlowComponent, PlansComponent],
  providers: [],
  entryComponents: [BillingFlowComponent, PlansComponent]
})
export class PagesModule {}
