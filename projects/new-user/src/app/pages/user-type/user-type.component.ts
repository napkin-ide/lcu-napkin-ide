import { Component, OnInit, Input } from '@angular/core';
import { UserManagementStepTypes, UserManagementState, UserTypes } from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';

@Component({
  selector: 'lcu-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {
  // Properties

  /**
   * Setup step types
   */
  @Input('setup-step-types')
  public SetupStepTypes: UserManagementStepTypes;

  /**
   * Current state
   */
  @Input('state')
  public State: UserManagementState;

  public UserTypes = UserTypes;

  constructor(protected nideState: UserManagementStateContext) {}

  public ngOnInit() {
  }

  public SetUserType(userType: UserTypes) {
    this.nideState.SetUserType(userType);
  }

  //  Helpers
}
