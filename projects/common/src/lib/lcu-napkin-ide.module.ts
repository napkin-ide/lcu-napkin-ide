import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import { MaterialModule } from '@lcu/common';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { LcuNapkinIdeShellHostElementComponent } from './elements/shell-host/shell-host.component';

@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent,
    LcuNapkinIdeShellHostElementComponent
  ]
})
export class LcuNapkinIdeModule {}
