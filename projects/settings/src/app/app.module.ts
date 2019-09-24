// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IdeSettingsStateManagerContext } from './core/ide-settings-state-manager.context';
import { environment } from '../environments/environment';
import { FathymSharedModule, LCUServiceSettings, MaterialModule } from '@lcu-ide/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FathymSharedModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule],
  providers: [
    IdeSettingsStateManagerContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
