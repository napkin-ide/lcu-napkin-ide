import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDESettingsStateContext } from '../../../core/ide-settings-state-manager.context';
import { IDESettingsState } from '../../../core/ide-settings.state';
import { ServiceOfferingModel } from '../models/service-offering.model';
import { Router } from '@angular/router';

@Component({
  selector: 'lcu-marketplace-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class MarketplaceOverviewComponent implements OnInit {

  /**
   * Current state
   */
  public State: IDESettingsState;

  public ServiceOfferings: Array<ServiceOfferingModel>;
  public FeaturedProduct: any; // will be product model

  //  Constructors
  constructor(
    protected formBldr: FormBuilder,
    protected IDESettingsState: IDESettingsStateContext,
    protected router: Router) {
      this.FeaturedProduct = {
        Title: 'Fathym Forecast API'
      };
  }

  //  Life Cycle

  public ngOnInit() {
    this.IDESettingsState.Context.subscribe(state => {
      this.resetForms();

      this.State = state;
      // console.log(this.State)
    });
    this.buildServiceOfferings();
  }


  //  API methods
  public OpenProductView(product: any) {
    console.log('opening product view for ', product.Title)
    this.router.navigate(['marketplace/product', product.Title]);
  }

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



