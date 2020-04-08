import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserManagementStateContext,
  NapkinIDESetupStepTypes,
  UserManagementState
} from '@napkin-ide/lcu-napkin-ide-common';

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
  public State: UserManagementState;

  //  Constructors
  constructor(protected userMgr: UserManagementStateContext) {}

  //  Life Cycle
  public ngOnInit() {
    this.userMgr.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  //  API methods

  //  Helpers
  protected stateChanged() {}
}
