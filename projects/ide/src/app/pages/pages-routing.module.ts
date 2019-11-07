import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeComponent } from './ide/ide/ide.component';

const routes: Routes = [
  {
    path: '**',
    component: IdeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
