import { MaterialModule } from '@lcu-ide/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrgComponent } from './org/org.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';

@NgModule({
  declarations: [OrgComponent, CompleteComponent],
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
