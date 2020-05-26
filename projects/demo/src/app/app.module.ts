import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FathymSharedModule, MaterialModule, LCUServiceSettings } from '@lcu/common';
import { TutorialsComponent } from './controls/tutorials/tutorials.component';
import { ReactiveFormComponent } from './controls/reactive-form/reactive-form.component';
import { FlexLayoutComponent } from './controls/flex-layout/flex-layout.component';
import { HomeComponent } from './controls/home/home.component';
import { PageNotFoundComponent } from './controls/page-not-found/page-not-found.component';
import { NavigationComponent } from './controls/navigation/navigation.component';
import { UserComponent } from './controls/user/user.component';
import { UsersListComponent } from './controls/users-list/users-list.component';
import { NavListComponent } from './controls/nav-list/nav-list.component';
import { TutorialService } from './services/tutorial.service';
import {
  FaviconsService,
  BrowserFavicons,
  BROWSER_FAVICONS_CONFIG,
} from './services/favicons.service';
import { LoginComponent } from './controls/login/login.component';
import { UsersService } from './services/user.service';
import { DashboardComponent } from './controls/dashboard/dashboard.component';
import { LoggedInUserComponent } from './controls/logged-in-user/logged-in-user.component';
import { DashboardAdminComponent } from './controls/dashboard-admin/dashboard-admin.component';
import { DashboardNonAdminComponent } from './controls/dashboard-non-admin/dashboard-non-admin.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TutorialsComponent,
    ReactiveFormComponent,
    FlexLayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavigationComponent,
    UserComponent,
    UsersListComponent,
    NavListComponent,
    LoginComponent,
    DashboardComponent,
    LoggedInUserComponent,
    DashboardAdminComponent,
    DashboardNonAdminComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FathymSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LcuNapkinIdeModule,
  ],
  providers: [
    UsersService,
    TutorialService,
    {
      provide: FaviconsService,
      useClass: BrowserFavicons,
    },
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    },
    {
      provide: BROWSER_FAVICONS_CONFIG,
      useValue: {
        icons: {
          'arctic-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_arctic.png',
          },
          'cool-candy-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_cool_candy.png',
          },
          'flipper-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_flipper.png',
          },
          'ice-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_flipper.png',
          },
          'white-mint-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_flipper.png',
          },
          'contrast-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_circle_red.png',
            isDefault: true,
          },
          'sea-green-theme': {
            type: 'image/png',
            href: './assets/images/favicons/thinky_arctic.png',
          },
        },
        // determine whether or not a random token is auto-appended to the HREF
        // values whenever an icon is injected into the document
        cacheBusting: true,
      },
    },
  ],
  bootstrap: [AppComponent],
  exports: [
    LoginComponent,
    DashboardComponent,
    LoggedInUserComponent,
    DashboardAdminComponent,
    DashboardNonAdminComponent,
  ],
  entryComponents: [
    LoginComponent,
    DashboardComponent,
    LoggedInUserComponent,
    DashboardAdminComponent,
    DashboardNonAdminComponent,
  ],
})
export class AppModule {}
