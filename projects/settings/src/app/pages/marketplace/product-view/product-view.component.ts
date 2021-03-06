import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDESettingsState, LowCodeUnitSetupConfig } from '../../../core/ide-settings.state';
import { IDESettingsStateContext } from '../../../core/ide-settings-state-manager.context';

@Component({
  selector: 'lcu-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class MarketplaceProductViewComponent implements OnInit {

  //  FIELDS

  /**
   * the lcu to be sent to back end and saved
   */
  protected savedLCU: LowCodeUnitSetupConfig;

  //  PROPERTIES

  /**
   * product model containing product properties used in this file
   */
  public Product: any; // any for now, until we can see what the actual product looks like

  /**
   * Current state
   */
  public State: IDESettingsState;

  // CONSTRUCTORS

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected IDESettingsState: IDESettingsStateContext
  ) {
    // Get the product info from the state instead of hard-coding it here:
    this.Product = { Title: this.activatedRoute.snapshot.paramMap.get('product_title') };
    this.Product.Description = 'The Fathym Forecaster combines the world’s best weather forecasts with statistics-based, machine-learning techniques to tackle the largest datasets, including road weather.';
  }

  // LIFECYCLE

  ngOnInit() {
    this.IDESettingsState.Context.subscribe(state => {
      this.State = state;
    });
  }

  // API METHODS

  /**
   *
   * @param product the product (lcu) to be saved
   *
   * takes a product, converts it to an LCU setup configuration and saves it
   */
  // public AddToOrg(product: any): void {
    // this.savedLCU = new LowCodeUnitSetupConfig();

    // // map product into LowCodeUnitSetupConfig...

    // // hard coding this for now as functionality to populate this data from state is not yet complete
    // this.savedLCU.Lookup = 'lcu-fathym-forecast-lcu';
    // this.savedLCU.NPMPackage = '@habistack/lcu-fathym-forecast-lcu';
    // this.savedLCU.PackageVersion = '0.9.75';

    // this.State.Loading = true;
    // this.saveLCU(this.savedLCU);
  // }

  // HELPERS

  /**
   *
   * @param lcu the LCU to save
   *
   * takes an LCU setup configuration and sends it to the back to be saved
   */
  protected saveLCU(lcu: LowCodeUnitSetupConfig): void {
    this.IDESettingsState.SaveLCU(lcu);
  }

}
