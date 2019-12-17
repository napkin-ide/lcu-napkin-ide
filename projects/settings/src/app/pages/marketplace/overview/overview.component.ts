import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { IdeSettingsStateManagerContext } from '../../../core/ide-settings-state-manager.context';
import { IdeSettingsState } from '../../../core/ide-settings.state';

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

  //  Constructors
  constructor(protected formBldr: FormBuilder, protected ideSettingsState: IdeSettingsStateManagerContext) {}

  //  Life Cycle

  public ngOnInit() {
    this.ideSettingsState.Context.subscribe(state => {
      this.resetForms();

      this.State = state;
    });
  }


  //  API methods

  //  Helpers
  protected resetForms() {
    // this.NewActivityForm.reset();
  }

}



