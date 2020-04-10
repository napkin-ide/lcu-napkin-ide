import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CompleteComponent } from './complete/complete.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {
    path: 'complete',
    component: CompleteComponent
  },
  {
    path: 'plan/:id',
    component: BillingComponent
  },
  {
    path: '**',
    component: PlansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
