import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IdeStateStateManagerContext, LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import {
  FathymSharedModule,
  LCUServiceSettings,
  MaterialModule,
  FaviconsService,
  BrowserFavicons,
  BROWSER_FAVICONS_CONFIG } from '@lcu/common';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';

import { ExistingUserAccountsComponent } from './pages/existing-user-accounts/existing-user-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    ExistingUserAccountsComponent
  ],
  imports: [
    BrowserModule,
    // FathymSharedModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    LcuNapkinIdeModule
  ],
  providers: [
    // IdeStateStateManagerContext,
    // {
    //   provide: LCUServiceSettings,
    //   useValue: FathymSharedModule.DefaultServiceSettings(environment)
    // },
    // {
    //   provide: FaviconsService, useClass: BrowserFavicons
    // },
    {
      provide: BROWSER_FAVICONS_CONFIG,
      useValue: {
        icons: {
          'arctic-theme': {
            type: 'image/png',
            href: '../assets/favicons/thinky_arctic.png'
          },
          'cool-candy': {
            type: 'image/png',
            href: '../assets/favicons/thinky_cool_candy.png'
          },
          flipper: {
            type: 'image/png',
            href: '../assets/favicons/thinky_flipper.png'
          },
          ice: {
            type: 'image/png',
            href: '../assets/favicons/thinky_ice.png'
          },
          circle: {
            type: 'image/png',
            href: '../assets/favicons/thinky_circle_red.png',
            isDefault: true
          }
        },
         // determine whether or not a random token is auto-appended to the HREF
        // values whenever an icon is injected into the document
        cacheBusting: true
      }
    }
  ],
  bootstrap: [AppComponent],
  exports: [ExistingUserAccountsComponent],
  entryComponents: [ExistingUserAccountsComponent]
})
export class AppModule { }

