import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './controls/side-nav/side-nav.component';
import { MaterialModule } from '@lcu/common';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SideNavComponent,
    NavListComponent
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
    NavListComponent
  ],
  entryComponents: [
    SideNavComponent,
    NavListComponent
  ]
})
export class LcuNapkinIdeModule {}
