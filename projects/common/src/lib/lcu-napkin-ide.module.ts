import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import { MaterialModule } from '@lcu/common';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { LcuNapkinIdeShellHostElementComponent } from './elements/shell-host/shell-host.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LcuTrademarkDirective } from './controls/trademark/trademark.directive';
import { UserAccountSidenavComponent } from './controls/user-account-sidenav/user-account-sidenav.component';
import { PlanCardComponent } from './controls/plan-card/plan-card.component';
import { IntervalToggleComponent } from './controls/interval-toggle/interval-toggle.component';
import { LcuNapkinIdeWelcomeJourneysElementComponent } from './elements/welcome-journeys/welcome-journeys.component';


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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
   // LcuThemePickerModule,
    FlexLayoutModule
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
    
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    UserAccountSidenavComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    LcuNapkinIdeWelcomeJourneysElementComponent,
    
  ]
})
export class LcuNapkinIdeModule {}
