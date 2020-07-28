import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import {
  MaterialModule,
  FathymSharedModule,
  DirectiveModule,
} from '@lcu/common';
import { ChartsModule  } from 'ng2-charts';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule, Router } from '@angular/router';
import { LcuNapkinIdeShellHostElementComponent } from './elements/shell-host/shell-host.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LcuTrademarkDirective } from './controls/trademark/trademark.directive';
import { PlanCardComponent } from './controls/plan-card/plan-card.component';
import { IntervalToggleComponent } from './controls/interval-toggle/interval-toggle.component';
import { JourneyCardComponent } from './elements/welcome-journeys/journey-card/journey-card.component';
import { LcuNapkinIdeWelcomeJourneysElementComponent } from './elements/welcome-journeys/welcome-journeys.component';
import { ToolbarComponent } from './controls/toolbar/toolbar.component';
import { NthPowerToStringPipe } from './utils/pipes/nth-power-to-string-pipe.pipe';
import { UserAccountModalComponent } from './controls/user-account-modal/user-account-modal.component';
import { IotDataChartComponent } from './elements/welcome-journeys/iot-data-chart/iot-data-chart.component';
import { JourneyDetailsComponent } from './elements/welcome-journeys/journey-details/journey-details.component';

@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    LcuTrademarkDirective,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    JourneyCardComponent,
    ToolbarComponent,
    NthPowerToStringPipe,
    UserAccountModalComponent,
    IotDataChartComponent,
    JourneyDetailsComponent,
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    // LcuThemePickerModule,
    ChartsModule,
    FlexLayoutModule,
    DirectiveModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    LcuTrademarkDirective,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    ToolbarComponent,
    UserAccountModalComponent,
    DirectiveModule,
    ChartsModule,
    HttpClientModule,
    JourneyDetailsComponent,
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    ToolbarComponent,
    UserAccountModalComponent,
  ],
})
export class LcuNapkinIdeModule {}
