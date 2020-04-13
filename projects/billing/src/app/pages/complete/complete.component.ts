import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
  NapkinIDESetupStepTypes
} from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lcu-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  animations: []
})
export class CompleteComponent implements OnInit {
  //  Fields

  //  Properties

  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserBillingState;

  //  Constructors
  constructor(protected userMgr: UserBillingStateContext,
    protected route: ActivatedRoute,
    protected router: Router) {}

  //  Life Cycle
  public ngOnInit() {
    this.userMgr.Context.subscribe((state: UserBillingState) => {
      this.State = state;

      this.stateChanged();
    });
  }

  //  API methods

  public Redirect(){
    // http://www.fathym-it.com/projects/new
    window.location.href = 'http://www.fathym-it.com/projects/new';

  }

  //  Helpers
  protected stateChanged() {
    console.log("state success page: ", this.State);
  }
}
