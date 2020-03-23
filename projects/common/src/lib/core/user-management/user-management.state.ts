export class UserManagementState {
  public Details?: JourneyDetail[];

  public Loading?: boolean;

  public Personas?: JourneyPersona[];

  public Terms?: string;

  public TermsAccepted?: boolean;

  public Username?: string;

  public UserSetupStep?: UserSetupStepTypes;

  public UserType?: UserTypes;
}

export class JourneyPersona {
  public Descriptions: string[];

  public DetailLookupCategories: { [category: string]: string[] };

  public Lookup: string;

  public Name: string;
}

export class JourneyDetail {
  public Description: string;

  public Lookup: string;

  public Name: string;
}

export enum UserSetupStepTypes {
  Welcome = 'Welcome',
  Setup = 'Setup',
  Progress = 'Progress',
  Complete = 'Complete'
}

export enum UserTypes {
  Design = 'Design',
  Develop = 'Develop',
  Manage = 'Manage'
}
