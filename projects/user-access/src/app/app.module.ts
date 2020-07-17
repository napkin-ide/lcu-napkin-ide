import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FathymSharedModule, MaterialModule, LCUServiceSettings } from '@lcu/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgAccessComponent } from './pages/org-access/org-access.component';
import { AccessComponent } from './controls/access/access.component';
import { LimitButtonClickDirective } from './directives/limit-button-click.directive';
import { IdeUserAccessStateManagerContext } from './core/ide-user-access-state-manager.context';


@NgModule({
  declarations: [
    AppComponent,
    OrgAccessComponent,
    AccessComponent,
    LimitButtonClickDirective
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FathymSharedModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    IdeUserAccessStateManagerContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  bootstrap: [AppComponent],
  exports: [OrgAccessComponent, AccessComponent, LimitButtonClickDirective],
  entryComponents: [OrgAccessComponent, AccessComponent]
})
export class AppModule { }
