import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrgComponent } from './org/org.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { OrgDetailsComponent } from '../org-controls/org-details/org-details.component';
import { OrgInfraComponent } from '../org-controls/org-infra/org-infra.component';
import { OrgHostComponent } from '../org-controls/org-host/org-host.component';

@NgModule({
  declarations: [
    OrgComponent,
    CompleteComponent,
    OrgDetailsComponent,
    OrgInfraComponent,
    OrgHostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule
 ],
  exports: [OrgComponent]
})
export class PagesModule {}
