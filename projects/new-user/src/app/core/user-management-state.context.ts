import { UserManagementState, UserManagementStepTypes, UserTypes } from './user-management.state';
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

  public async Start(shouldUpdate: boolean) {
    if (!this.startSub) {
      this.startSub = this.rt.Started.subscribe(async () => {
        const groupName = await this.connectToState(shouldUpdate);

        this.setupReceiveState(groupName);

        this.$Refresh();
      });

      this.rt.Start();
    }
  }
  protected loadActionPath() {
    const actionRoot = this.loadStateActionRoot();

    return `${actionRoot}`;//?lcu-app-id=${this.Settings.AppConfig.ID}&lcu-app-ent-api-key=${this.Settings.AppConfig.EnterpriseAPIKey}`;
  }

  protected async connectToState(shouldUpdate: boolean): Promise<string> {
    const stateKey = await this.loadStateKey();

    const stateName = await this.loadStateName();

    const env = await this.loadEnvironment();

    const unMock = await this.loadUsernameMock();

    return new Promise<string>((resolve, reject) => {
      this.rt
        .InvokeAction('ConnectToState', {
          ShouldSend: shouldUpdate,
          Key: stateKey,
          State: stateName,
          Environment: env,
          UsernameMock: unMock
        })
        .subscribe({
          next: (req: any) => {
            if (req.Status && req.Status.Code === 0) {
              resolve(req.GroupName);
            } else {
              reject(
                req.Status
                  ? req.Status.Message
                  : 'Unknonw issue connecting to state.'
              );
            }
          },
          error: err => reject(err)
          // complete: () => console.log('Observer got a complete notification'),
        });
    });
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

  public SetUserManagementStep(step: UserManagementStepTypes) {
    this.Execute({
      Arguments: {
        Step: step
      },
      Type: 'SetUserManagementStep'
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
    return 'user-management';
  }
}
