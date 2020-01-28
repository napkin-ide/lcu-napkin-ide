import { Component, OnInit, Input } from '@angular/core';
import { NapkinIDESetupStepTypes, NapkinIDESetupState } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-review',
  templateUrl: './org-review.component.html',
  styleUrls: ['./org-review.component.scss']
})
export class OrgReviewComponent implements OnInit {
  // Properties
  public get OAuthRedirectURL(): string {
    return `${location.href}`;
  }

  public get AzureDevOpsOAuthURL(): string {
    return `/.devops/oauth?redirectUri=${this.OAuthRedirectURL}`;
  }

  /**
   * indicates whether user has clicked to "Finalize" registration
   */
  public FinalizeClicked: boolean;

  /**
   * Setup step types
   */
  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: NapkinIDESetupState;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
    this.FinalizeClicked = false;
  }

  ngOnInit() {
    this.setupTempFinalizeTracker();
  }

  public Boot() {
    this.State.Loading = true;

    this.nideState.BootEnterprise();
  }

  public Finalize() {
    this.State.Loading = true;

    this.FinalizeClicked = true;

    this.nideState.Finalize();
  }

  public CanFinalize() {
    this.nideState.CanFinalize();
  }

  //  Helpers
  protected setupTempFinalizeTracker() {
    /** Interval to check if infrastructure has been provisioned - prevents user from continuing until so. */
    const finalizedInterval: any = setInterval(() => {
      if (!this.State.CanFinalize && this.State.EnterpriseBooted) {
        this.CanFinalize();
      } else {
        clearInterval(finalizedInterval);
      }
    }, 30000);
  }
}
