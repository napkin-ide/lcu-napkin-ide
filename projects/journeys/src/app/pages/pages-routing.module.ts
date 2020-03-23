import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { JourneyComponent } from './journey/journey.component';

const routes: Routes = [
  {
    path: 'journey/:userType/:journey',
    component: JourneyComponent
  },
  {
    path: '**',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
