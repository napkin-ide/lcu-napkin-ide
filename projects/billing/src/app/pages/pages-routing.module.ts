import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CompleteComponent } from './complete/complete.component';

const routes: Routes = [
  {
    path: 'complete',
    component: CompleteComponent
  },
  {
    path: '**',
    component: BillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
