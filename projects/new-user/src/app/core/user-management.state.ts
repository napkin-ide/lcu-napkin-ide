export class UserManagementState {
  public Country?: string;

  public FullName?: string;

  public Handle?: string;

  public Loading?: boolean;

  public Step?: UserManagementStepTypes;

  public Terms?: string;

  public TermsAccepted?: boolean;

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
