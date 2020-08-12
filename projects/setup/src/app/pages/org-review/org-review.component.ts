import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NapkinIDESetupStepTypes,
  UserManagementState,
  UserManagementStateContext
} from '@napkin-ide/lcu-napkin-ide-common';
import { BootOption } from 'projects/common/src/lcu.api';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'lcu-org-review',
  templateUrl: './org-review.component.html',
  styleUrls: ['./org-review.component.scss']
})
export class OrgReviewComponent implements OnInit {
  // Properties
  public ActiveBootOptionDetails: BootOption;

  public get OAuthRedirectURL(): string {
   // debugger;
    return `${location.href}`;
  }

  public get AzureDevOpsOAuthURL(): string {
    // debugger;
    return `/.devops/oauth?redirectUri=${this.OAuthRedirectURL}`;
  }

  /**
   * Event for changing step type
   */
  @Output('set-step')
  public SetStep: EventEmitter<NapkinIDESetupStepTypes>;

  /**
   * Step types
   */
  public SetupStepTypes = NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  @Input('state')
  public State: UserManagementState;

  constructor(protected userMgr: UserManagementStateContext,
    public dialog: MatDialog,
    ) {
    this.SetStep = new EventEmitter();
    // debugger;
  }

  public ngOnInit() {
     // for testing
    // this.OpenConfirmationDialog();
  }

  public Boot() {
    this.State.Loading = true;

    this.userMgr.BootOrganization();
    // debugger;
  }

  public ChangeStep(step: NapkinIDESetupStepTypes): void {
    this.SetStep.emit(step);
  }

  public GetBootOptionColor(bootOption: BootOption): string {
    return bootOption.Status
      ? bootOption.Status.Code === 0
        ? 'accent'
        : bootOption.Status.Code === -1
        ? 'primary'
        : ''
      : '';
  }

  public GetBootPercentColor(state: UserManagementState): string {
    return state.Status
    ? state.Status.Code === 0
      ? 'primary'
      : state.Status.Code === -1
      ? 'accent'
      : state.Status.Code === 1
      ? 'warn'
      : ''
    : '';
  }

  /**
   * 
   * @param bootOption boot options
   * 
   * Return percent of boot process, default to 10
   */
  public GetBootPercent(bootOption: BootOption): string {
    if (bootOption.CompletedSteps === 0) {
      return '10';
    }
    return ((bootOption.CompletedSteps / bootOption.TotalSteps) * 100).toFixed(2);
  }

  public IsCurrentLoadingBootAction(bootOption: BootOption): boolean {
    const curLoading = this.State.BootOptions.find((bo: BootOption) => bo.Loading);
    if (curLoading) {
    }

    return curLoading === bootOption;
  }

  public SetUpLoading(): boolean {
    if (this.State.Loading) {
    }

    return (
      this.State.Loading || !!this.State.BootOptions.find(bo => bo.Loading)
    );
  }

  public SetActiveBootOptionDetails(bootOption: BootOption): void {
    if (this.ActiveBootOptionDetails !== bootOption) {
      this.ActiveBootOptionDetails = bootOption;
    } else {
      this.ActiveBootOptionDetails = null;
    }
  }

  // public OpenConfirmationDialog(): void {
  //   const dialogRef = this.dialog.open(ConfirmationModalComponent, {
  //     width: '575px',
  //     position: {right:'11vw'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);

  //     if(result === "confirm"){
  //       this.Boot();
  //     }
  //   });
  // }


  //  Helpers


}
