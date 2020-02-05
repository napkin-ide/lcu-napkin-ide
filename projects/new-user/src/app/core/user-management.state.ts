export class UserManagementState {
  public Loading?: boolean;

  public Step: UserManagementStepTypes;

  public Terms: string;

  public TermsAccepted: boolean;

  public UserCountry?: string;

  public UserFullName?: string;

  public UserHandle?: string;

  public UserType?: UserTypes;
}

export enum UserManagementStepTypes {
  UserDetails = 'UserDetails',
  UserType = 'UserType',
  UserTerms = 'UserTerms',
  Complete = 'Complete'
}

export enum UserTypes {
  Design = 'Design',
  Develop = 'Develop',
  Manage = 'Manage'
}
