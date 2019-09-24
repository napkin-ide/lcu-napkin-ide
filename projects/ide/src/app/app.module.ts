import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivityBarModule } from './controls/activity-bar/activity-bar.module';
import { EditorsModule } from './controls/editors/editors.module';
import { IdeBarModule } from './controls/ide-bar/ide-bar.module';
import { PanelsModule } from './controls/panels/panels.module';
import { SideBarModule } from './controls/side-bar/side-bar.module';
import { StatusBarModule } from './controls/status-bar/status-bar.module';
import { IdeStateService } from './svc/ide-state.service';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import {
  FathymSharedModule,
  LCUServiceSettings,
  MaterialModule,
  FaviconsService,
  BrowserFavicons,
  BROWSER_FAVICONS_CONFIG } from '@lcu-ide/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FathymSharedModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ActivityBarModule,
    EditorsModule,
    IdeBarModule,
    PanelsModule,
    SideBarModule,
    StatusBarModule,
    MaterialModule
  ],
  providers: [
    IdeStateService,
    IdeStateStateManagerContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    },
    {
      provide: FaviconsService, useClass: BrowserFavicons
    },
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
  bootstrap: [AppComponent]
})
export class AppModule {}
