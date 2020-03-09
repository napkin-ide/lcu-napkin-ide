import { UserManagementState, UserTypes, UserSetupStepTypes } from './user-management.state';
import { StateContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementStateContext extends StateContext<UserManagementState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public AcceptTerms(version: string) {
    this.Execute({
      Arguments: {
        Version: version
      },
      Type: 'AcceptTerms'
    });
  }

  public EstablishUser() {
    this.Execute({
      Arguments: {},
      Type: 'EstablishUser'
    });
  }

  public SetUserDetails(fullName: string, country: string, handle: string) {
    this.Execute({
      Arguments: {
        FullName: fullName,
        Country: country,
        Handle: handle
      },
      Type: 'SetUserDetails'
    });
  }

  public SetUserSetupStep(step: UserSetupStepTypes) {
    this.Execute({
      Arguments: {
        Step: step
      },
      Type: 'SetUserSetupStep'
    });
  }

  public SetUserType(userType: UserTypes) {
    this.Execute({
      Arguments: {
        UserType: userType
      },
      Type: 'SetUserType'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <UserManagementState>{ Loading: true };
  }

  protected loadStateKey() {
    return 'init';
  }

  protected loadStateName() {
    return 'usermanagement';
  }

  protected loadStateRoot() {
    return `/${this.loadStateName()}`;
  }

  protected loadStateActionRoot() {
    return `/${this.loadStateName()}`;
  }
}
