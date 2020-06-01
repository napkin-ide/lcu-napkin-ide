import {
  UserManagementState,
  UserTypes,
  AzureInfaSettings,
  NapkinIDESetupStepTypes
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
  public BootOrganization() {
    this.Execute({
      Arguments: {},
      Type: 'BootOrganization'
    });
  }

  public ConfigureInfrastructure(
    infraType: string,
    useDefaultSettings: boolean,
    settings: AzureInfaSettings,
    template: string,
    shouldStep: boolean
  ) {
    this.Execute({
      Arguments: {
        InfrastructureType: infraType,
        Settings: settings,
        ShouldStep: shouldStep,
        Template: template,
        UseDefaultSettings: useDefaultSettings
      },
      Type: 'ConfigureInfrastructure'
    });
  }

  public SetNapkinIDESetupStep(step: NapkinIDESetupStepTypes) {
    this.Execute({
      Arguments: {
        Step: step
      },
      Type: 'SetNapkinIDESetupStep'
    });
  }

  public SetOrganizationDetails(
    name: string,
    // description: string,
    lookup: string
  ) {
    this.Execute({
      Arguments: {
        Name: name,
        // Description: description,
        Lookup: lookup
      },
      Type: 'SetOrganizationDetails'
    });
  }

  public SetupDevOpsOAuth(appId: string, scopes: string, clientSecret: string) {
    this.Execute({
      Arguments: {
        AppID: appId,
        Scopes: scopes,
        ClientSecret: clientSecret
      },
      Type: 'SetupDevOpsOAuth'
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

  public SetUserType(userType: UserTypes) {
    this.Execute({
      Arguments: {
        UserType: userType
      },
      Type: 'SetUserType'
    });
  }

  public SetUserDetails(name: string, country: string, status: string) {
    // this.Execute({
    //   Arguments: {
    //     UserType: userType
    //   },
    //   Type: 'SetUserDetails'
    // });
  }

  //  Helpers
  protected defaultValue() {
    return { Loading: true } as UserManagementState;
  }

  protected loadStateKey(): string {
    return 'init';
  }

  protected loadStateName(): string {
    return 'usermanagement';
  }
}
