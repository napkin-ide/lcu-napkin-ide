import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import { MaterialModule } from '@lcu/common';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { LcuNapkinIdeShellHostElementComponent } from './elements/shell-host/shell-host.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserAccountSidenavComponent } from './controls/user-account-sidenav/user-account-sidenav.component';
import { LcuTrademarkDirective } from './controls/trademark/trademark.directive';


@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    UserAccountSidenavComponent,
    LcuTrademarkDirective
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
    UserAccountSidenavComponent,
    LcuTrademarkDirective
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent,
    UserAccountSidenavComponent
  ]
})
export class LcuNapkinIdeModule {}
