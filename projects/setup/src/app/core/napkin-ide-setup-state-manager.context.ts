import { NapkinIDESetupState, AzureInfaSettings, NapkinIDESetupStepTypes } from './napkin-ide-setup.state';
import { StateManagerContext } from '@lcu-ide/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NapkinIDESetupStateManagerContext extends StateManagerContext<NapkinIDESetupState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public CommitInfrastructure(template: string) {
    this.Execute({
      Arguments: {
        Template: template
      },
      Type: 'CommitInfrastructure'
    });
  }

  public ConfigureInfrastructure(infraType: string, useDefaultSettings: boolean, settings: AzureInfaSettings) {
    this.Execute({
      Arguments: {
        InfrastructureType: infraType,
        Settings: settings,
        UseDefaultSettings: useDefaultSettings
      },
      Type: 'ConfigureInfrastructure'
    });
  }

  public SecureHost(host: string) {
    return this.Execute({
      Arguments: {
        Host: host
      },
      Type: 'SecureHost'
    });
  }

  public SetHostFlow(hostFlow: string) {
    this.Execute({
      Arguments: {
        HostFlow: hostFlow
      },
      Type: 'SetHostFlow'
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

  public SetOrganizationDetails(name: string, description: string, lookup: string) {
    this.Execute({
      Arguments: {
        Name: name,
        Description: description,
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

  //  Helpers
  protected defaultValue() {
    return <NapkinIDESetupState>{ Loading: true };
  }

  protected loadStateKey() {
    return 'init';
  }

  protected loadStateName() {
    return 'napkin-ide-setup';
  }
}
