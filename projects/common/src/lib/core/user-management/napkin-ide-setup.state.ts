import { NapkinIDESetupStepTypes, AzureInfaSettings } from './user-management.state';

export class NapkinIDESetupState {
  public CanFinalize?: boolean;

  public EnterpriseBooted?: boolean;

  public HostFlow?: 'shared' | 'private';

  public Provisioning?: string;

  public Subdomain: string;
}
