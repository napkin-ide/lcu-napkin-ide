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
import { ToolbarComponent } from './controls/toolbar/toolbar.component';
import { NthPowerToStringPipe } from './utils/pipes/nth-power-to-string-pipe.pipe';
import { UserAccountModalComponent } from './controls/user-account-modal/user-account-modal.component';

@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    LcuTrademarkDirective,
    PlanCardComponent,
    IntervalToggleComponent,
    ToolbarComponent,
    NthPowerToStringPipe,
    UserAccountModalComponent,
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
    ToolbarComponent,
    UserAccountModalComponent,
    DirectiveModule,
    ChartsModule,
    HttpClientModule,
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    PlanCardComponent,
    IntervalToggleComponent,
    ToolbarComponent,
    UserAccountModalComponent,
  ],
})
export class LcuNapkinIdeModule {}
