import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdeSettingsState, LowCodeUnitSetupConfig } from '../../../core/ide-settings.state';
import { IdeSettingsStateManagerContext } from '../../../core/ide-settings-state-manager.context';

@Component({
  selector: 'lcu-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class MarketplaceProductViewComponent implements OnInit {

  public Product: any; // will be product model
  public State: IdeSettingsState;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected ideSettingsState: IdeSettingsStateManagerContext
  ) {
    // Get the product info from the state instead of hard-coding it here:
    this.Product = { Title: this.activatedRoute.snapshot.paramMap.get('product_title') };
    this.Product.Description = 'More description things yay! This is an API; spend the moneys and you can use it, because capitalism.';
  }

  ngOnInit() {
    this.ideSettingsState.Context.subscribe(state => {
      this.State = state;
    });
  }

  public AddToOrg(product) {
    this.State.Loading = true;
    // map product into LowCodeUnitSetupConfig...
    this.SaveLCU({
      // hard coding this for now as functionality to populate this data from state is not yet complete
      Lookup: 'lcu-fathym-forecast-lcu', // can be named anything
      NPMPackage: '@habistack/lcu-fathym-forecast-lcu', // must be real package
      PackageVersion: '0.9.75' // must be real version number
    });
  }

  public SaveLCU(lcu: LowCodeUnitSetupConfig) {
    this.ideSettingsState.SaveLCU(lcu);
  }

}
