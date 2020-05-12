import { Application, DAFViewApplicationConfig } from '@lcu/common';

/**
 * Model class for state data
 */
export class LimitedJourneysManagementState {
  public Loading?: boolean;

  public Journeys?: JourneyOption[];
}

export class JourneyOption {
  public Active: boolean;

  public ComingSoon: boolean;

  public ContentURL: string;

  public Description: string;

  public ContentType: JourneyContentTypes;

  public Name: string;

  public Roles: JourneyRoleTypes[];

  public Uses: string[];
}

export enum JourneyContentTypes {
  Image = 'Image',

  Video = 'Video',
}

export enum JourneyRoleTypes {
  Developer = 'Developer',

  Designer = 'Designer',

  Administrator = 'Administrator',
}
