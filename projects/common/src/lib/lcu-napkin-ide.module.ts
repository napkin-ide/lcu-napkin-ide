import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import {
  MaterialModule,
  FathymSharedModule,
  DirectiveModule,
} from '@lcu/common';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule, Router } from '@angular/router';
import { LcuNapkinIdeShellHostElementComponent } from './elements/shell-host/shell-host.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LcuTrademarkDirective } from './controls/trademark/trademark.directive';
import { UserAccountSidenavComponent } from './controls/user-account-sidenav/user-account-sidenav.component';
import { PlanCardComponent } from './controls/plan-card/plan-card.component';
import { IntervalToggleComponent } from './controls/interval-toggle/interval-toggle.component';
import { JourneyCardComponent } from './elements/welcome-journeys/journey-card/journey-card.component';
import { LcuNapkinIdeWelcomeJourneysElementComponent } from './elements/welcome-journeys/welcome-journeys.component';
import { ToolbarComponent } from './controls/toolbar/toolbar.component';
import { NthPowerToStringPipe } from './utils/pipes/nth-power-to-string-pipe.pipe';
import { UserAccountMenuComponent } from './controls/user-account-menu/user-account-menu.component';
import { UserAccountModalComponent } from './controls/user-account-modal/user-account-modal.component';

@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    LcuTrademarkDirective,
    UserAccountSidenavComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    JourneyCardComponent,
    ToolbarComponent,
    NthPowerToStringPipe,
    UserAccountMenuComponent,
    UserAccountModalComponent,
  ],
  imports: [
    FathymSharedModule,
    MaterialModule,
    RouterModule,
    // LcuThemePickerModule,
    FlexLayoutModule,
    DirectiveModule,
  ],
  exports: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    LcuTrademarkDirective,
    UserAccountSidenavComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    ToolbarComponent,
    UserAccountMenuComponent,
    UserAccountModalComponent,
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    UserAccountSidenavComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    ToolbarComponent,
    UserAccountMenuComponent,
    UserAccountModalComponent,
  ],
})
export class LcuNapkinIdeModule {}
