export class NapkinIDESetupState {
  public DevOpsAppID?: string;

  public DevOpsClientSecret?: string;

  public DevOpsScopes?: string;

  public EnvSettings?: AzureInfaSettings;

  public Host?: string;

  public HostFlow?: 'shared' | 'private';

  public HostApprovalMessage?: string;

  public HostOptions: string[];

  public Loading?: boolean;

  public OrganizationDescription?: string;

  public OrganizationName?: string;

  public OrganizationLookup?: string;

  public Provisioning?: string;

  public Step: NapkinIDESetupStepTypes;

  public Subdomain: string;
}

export enum NapkinIDESetupStepTypes {
  OrgDetails = 'OrgDetails',
  AzureOAuth = 'AzureOAuth',
  AzureSetup = 'AzureSetup',
  HostConfig = 'HostConfig',
  Review = 'Review',
  Provisioning = 'Provisioning',
  Complete = 'Complete'
}

export class AzureInfaSettings {
  public AzureTenantID: string;

  public AzureSubID: string;

  public AzureAppID: string;

  public AzureAppAuthKey: string;
}
