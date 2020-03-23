import { MaterialModule, PipeModule } from '@lcu/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverviewComponent } from './overview/overview.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JourneyComponent } from './journey/journey.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';

@NgModule({
  declarations: [OverviewComponent, JourneyComponent],
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
  exports: [OverviewComponent, JourneyComponent],
  providers: []
})
export class PagesModule {}
