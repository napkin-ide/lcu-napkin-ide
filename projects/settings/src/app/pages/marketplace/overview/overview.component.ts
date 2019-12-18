import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { IdeSettingsStateManagerContext } from '../../../core/ide-settings-state-manager.context';
import { IdeSettingsState } from '../../../core/ide-settings.state';
import { ServiceOfferingModel } from '../models/service-offering.model';

@Component({
  selector: 'lcu-marketplace-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class MarketplaceOverviewComponent implements OnInit {

  /**
   * Current state
   */
  public State: IdeSettingsState;

  public ServiceOfferings: Array<ServiceOfferingModel>;

  //  Constructors
  constructor(protected formBldr: FormBuilder, protected ideSettingsState: IdeSettingsStateManagerContext) {}

  //  Life Cycle

  public ngOnInit() {
    this.ideSettingsState.Context.subscribe(state => {
      this.resetForms();

      this.State = state;
    });
    this.buildServiceOfferings();
  }


  //  API methods

  //  Helpers
  protected resetForms() {
    // this.NewActivityForm.reset();
  }

  protected buildServiceOfferings(){
    this.ServiceOfferings = new Array<ServiceOfferingModel>();
    this.ServiceOfferings.push(
      new ServiceOfferingModel("Data Flow", "trending_up"),
      new ServiceOfferingModel("IoT", "track_changes"),
      new ServiceOfferingModel("Data Apps", "apps"),
      new ServiceOfferingModel("State", "language")
    )
  }

}



