import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NapkinIDESetupStateManagerContext } from './core/napkin-ide-setup-state-manager.context';
import { environment } from '../environments/environment';
import { FathymSharedModule, LCUServiceSettings, MaterialModule } from '@lcu/common';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FathymSharedModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LcuNapkinIdeModule,
  ],
  providers: [
    NapkinIDESetupStateManagerContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule {}
