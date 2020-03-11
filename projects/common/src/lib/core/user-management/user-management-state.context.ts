import {
  UserManagementState,
  UserTypes,
  UserSetupStepTypes
} from './user-management.state';
import { StateContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementStateContext extends StateContext<
  UserManagementState
> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public EstablishUser(
    orgName: string,
    orgDesc: string,
    orgLookup: string,
    azureTenantId: string,
    azureAppId: string,
    azureAuthKey: string,
    azureSubId: string
  ) {
    this.Execute({
      Arguments: {
        OrgName: orgName,
        OrgDesc: orgDesc,
        OrgLookup: orgLookup,
        AzureTenantID: azureTenantId,
        AzureAppID: azureAppId,
        AzureAuthKey: azureAuthKey,
        AzureSubID: azureSubId
      },
      Type: 'EstablishUser'
    });
  }

  public SetPaymentMethod(methodId: string) {
    this.Execute({
      Arguments: {
        MethodID: methodId
      },
      Type: 'SetPaymentMethod'
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
    return { Loading: true } as UserManagementState;
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
