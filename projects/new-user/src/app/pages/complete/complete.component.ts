import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementState, UserManagementStepTypes } from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';

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
  public SetupStepTypes: UserManagementStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserManagementState;

  //  Constructors
  constructor(protected nideState: UserManagementStateContext) {
  }

  //  Life Cycle
  public ngOnInit() {
    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  //  API methods

  //  Helpers
  protected stateChanged() {
  }
}
