import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NapkinIDESetupStepTypes,
  UserManagementState,
  UserManagementStateContext
} from '@napkin-ide/lcu-napkin-ide-common';
import { BootOption } from 'projects/common/src/lcu.api';

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
   * Event for changing step type
   */
  @Output('set-step')
  public SetStep: EventEmitter<NapkinIDESetupStepTypes>;

  /**
   * Setup step types
   */
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  @Input('state')
  public State: UserManagementState;

  constructor(protected userMgr: UserManagementStateContext) {
    this.SetStep = new EventEmitter();
  }

  public ngOnInit() {
  }

  public Boot() {
    this.State.Loading = true;

    this.userMgr.BootOrganization();
  }

  public ChangeStep(step: NapkinIDESetupStepTypes): void {
    this.SetStep.emit(step);
  }

  public GetBootOptionColor(bootOption: BootOption) {
    return bootOption.Status
      ? bootOption.Status.Code === 0
        ? 'accent'
        : bootOption.Status.Code === -1
        ? 'primary'
        : ''
      : '';
  }

  public SetUpLoading(): boolean {
    return this.State.Loading || !!this.State.BootOptions.find(bo => bo.Loading);
  }

  //  Helpers
}
