import { Status } from '@lcu/common';

export class UserManagementState {
  public AzureInfrastructureInvalidComponent?: string;

  public AzureInfrastructureInvalidComponentError?: string;

  public AzureInfrastructureValid?: Status;

  public AzureLocationOptions?: { [region: string]: string };

  public Booted?: boolean;

  public BootOptions?: BootOption[];

  public Details?: JourneyDetail[];

  public DevOpsAppID?: string;

  public DevOpsClientSecret?: string;

  public DevOpsScopes?: string;

  public EnvironmentLookup?: string;

  public EnvSettings?: AzureInfaSettings;

  public HasDevOpsOAuth?: boolean;

  public Host?: string;

  public HostOptions?: string[];

  public InfrastructureOptions?: { [id: string]: string };

  public Loading?: boolean;

  public NewEnterpriseAPIKey?: string;

  public OrganizationDescription?: string;

  public OrganizationName?: string;

  public OrganizationLookup?: string;

  public PaymentMethodID?: string;

  public Personas?: JourneyPersona[];

  public SetupStep?: NapkinIDESetupStepTypes;

  public Status?: Status;

  public Template?: string;

  public Terms?: string;

  public TermsAccepted?: boolean;

  public UserLicenses?: Array<any>;

  public Username?: string;

  public UserType?: UserTypes;

  public SubscribersLimited: Array<string>;

  public SubscribersActive: Array<string>;
}

export class JourneyPersona {
  public Descriptions?: string[];

  public DetailLookupCategories?: { [category: string]: string[] };

  public Lookup?: string;

  public Name?: string;
}

export class JourneyDetail {
  public Description?: string;

  public Lookup?: string;

  public Name?: string;
}

export class BootOption {
  public Descriptions?: string[];

  public Loading?: boolean;

  public Lookup?: string;

  public Name?: string;

  public SetupStep?: NapkinIDESetupStepTypes;

  public Status?: Status;
}

export class AzureInfaSettings {
  public AzureTenantID?: string;

  public AzureSubID?: string;

  public AzureAppID?: string;

  public AzureAppAuthKey?: string;

  public AzureLocation?: string;

  public AzureRegion?: string;
}

export enum NapkinIDESetupStepTypes {
  OrgDetails = 'OrgDetails',
  AzureSetup = 'AzureSetup',
  Billing = 'Billing',
  Review = 'Review',
  Complete = 'Complete'
}

export enum UserTypes {
  Design = 'Design',
  Develop = 'Develop',
  Manage = 'Manage'
}
