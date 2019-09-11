export class NapkinIDESetupState {
  public DevOpsAppID?: string;

  public DevOpsClientSecret?: string;

  public DevOpsScopes?: string;

  public EnterpriseBooted?: boolean;

  public EnvironmentLookup?: string;

  public EnvSettings?: AzureInfaSettings;

  public HasDevOpsOAuth?: boolean;

  public Host?: string;

  public HostFlow?: 'shared' | 'private';

  public HostApprovalMessage?: string;

  public HostOptions: string[];

  public Loading?: boolean;

  public NewEnterpriseAPIKey?: string;

  public OrganizationDescription?: string;

  public OrganizationName?: string;

  public OrganizationLookup?: string;

  public Provisioning?: string;

  public Step: NapkinIDESetupStepTypes;

  public Subdomain: string;

  public Terms: string;

  public TermsAccepted: boolean;
}

export enum NapkinIDESetupStepTypes {
  OrgDetails = 'OrgDetails',
  AzureSetup = 'AzureSetup',
  HostConfig = 'HostConfig',
  Terms = 'Terms',
  Review = 'Review',
  Complete = 'Complete'
}

export class AzureInfaSettings {
  public AzureTenantID: string;

  public AzureSubID: string;

  public AzureAppID: string;

  public AzureAppAuthKey: string;
}
