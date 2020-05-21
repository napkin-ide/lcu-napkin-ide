import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CompleteComponent } from './complete/complete.component';
import { PlansComponent } from './plans/plans.component';

const routes: Routes = [
  {
    path: 'complete/:licenseType/:id',
    component: CompleteComponent
  },
  {
    path: 'plan/:licenseType/:id',
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
