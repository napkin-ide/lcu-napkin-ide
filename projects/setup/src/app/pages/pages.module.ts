import { MaterialModule, PipeModule } from '@lcu/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrgComponent } from './org/org.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgInfraComponent } from './org-infra/org-infra.component';
import { OrgReviewComponent } from './org-review/org-review.component';
import { LcuNapkinIdeModule } from '@napkin-ide/lcu-napkin-ide-common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    OrgComponent,
    CompleteComponent,
    OrgDetailsComponent,
    OrgInfraComponent,
    OrgReviewComponent,
    ConfirmationModalComponent
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
  exports: [OrgComponent, ConfirmationModalComponent],
  providers: [],
  entryComponents: [ConfirmationModalComponent]
})
export class PagesModule {}
