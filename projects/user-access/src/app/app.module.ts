import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgAccessComponent } from './controls/org-access/org-access.component';

@NgModule({
  declarations: [
    AppComponent,
    OrgAccessComponent
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
  providers: [],
  bootstrap: [AppComponent],
  exports: [OrgAccessComponent],
  entryComponents: [OrgAccessComponent]
})
export class AppModule { }
