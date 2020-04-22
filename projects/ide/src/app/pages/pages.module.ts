import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '@lcu/common';
import { IdeActivityBarComponent } from './ide/ide-activity-bar/ide-activity-bar.component';
import { IdeComponent } from './ide/ide/ide.component';
import { IdeEditorsComponent } from './ide/ide-editors/ide-editors.component';
import { IdePanelsComponent } from './ide/ide-panels/ide-panels.component';
import { IdeSideBarComponent } from './ide/ide-side-bar/ide-side-bar.component';
import { IdeStatusBarComponent } from './ide/ide-status-bar/ide-status-bar.component';
import { IdeTopBarComponent } from './ide/ide-top-bar/ide-top-bar.component';
import { LazyElementModule } from '@lowcodeunit/lazy-element';
import { ExternalDialogModule, LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    IdeComponent,
    IdeActivityBarComponent,
    IdeEditorsComponent,
    IdePanelsComponent,
    IdeSideBarComponent,
    IdeStatusBarComponent,
    IdeTopBarComponent
  ],
  imports: [
    CommonModule,
    LazyElementModule,
    MaterialModule,
    PagesRoutingModule,
    FlexLayoutModule,
    ExternalDialogModule,
    LcuNapkinIdeModule
 ],
  exports: [IdeComponent],
  providers: []
})
export class PagesModule {}
