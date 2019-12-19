import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IdeSettingsStateManagerContext } from '../../../core/ide-settings-state-manager.context';
import { IdeSettingsState } from '../../../core/ide-settings.state';
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
  public State: IdeSettingsState;

  public ServiceOfferings: Array<ServiceOfferingModel>;
  public FeaturedProduct: any; // will be product model

  //  Constructors
  constructor(
    protected formBldr: FormBuilder,
    protected ideSettingsState: IdeSettingsStateManagerContext,
    protected router: Router) {
      this.FeaturedProduct = {
        Title: 'Fathym Forecast API'
      };
  }

  //  Life Cycle

  public ngOnInit() {
    this.ideSettingsState.Context.subscribe(state => {
      this.resetForms();

      this.State = state;
    });
    this.buildServiceOfferings();
  }


  //  API methods
  public OpenProductView(product) {
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



