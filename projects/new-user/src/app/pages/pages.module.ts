import { MaterialModule, PipeModule } from '@lcu/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { UserTermsComponent } from './user-terms/user-terms.component';

@NgModule({
  declarations: [
    UserComponent,
    CompleteComponent,
    UserDetailsComponent,
    UserTypeComponent,
    UserTermsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LcuNapkinIdeModule,
    PipeModule
 ],
  exports: [UserComponent],
  providers: []
})
export class PagesModule {}
