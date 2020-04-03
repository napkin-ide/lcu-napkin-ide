import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CompleteComponent } from './complete/complete.component';

const routes: Routes = [
  {
    path: 'complete',
    component: CompleteComponent
  },
  {
    path: '**',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
