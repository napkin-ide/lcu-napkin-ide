import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CompleteComponent } from './complete/complete.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {
    path: ':licenseType/complete/:id',
    component: CompleteComponent
  },
  {
    path: ':licenseType/plan/:id/:interval',
    component: BillingComponent
  },
  {
    path: ':licenseType',
    component: PlansComponent
  },
  {
    path: '**',
    redirectTo: 'lcu'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
