import { Component, OnInit } from '@angular/core';
import { UserManagementState } from '../../state/user-management/user-management.state';
import { UserBillingState } from '../../state/user-billing/user-billing.state';
import { UserManagementStateContext } from '../../state/user-management/user-management-state.context';
import { UserBillingStateContext } from '../../state/user-billing/user-billing-state.context';
import { IdeManagementState } from '../../state/ide/ide-management.state';
import { IDEStateManagementContext } from '../../state/ide/ide-management-state.context';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from '../../utils/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lcu-user-account-modal',
  templateUrl: './user-account-modal.component.html',
  styleUrls: ['./user-account-modal.component.scss']
})
export class UserAccountModalComponent implements OnInit {

  /**
 * The Users State
 */
public UserState: UserManagementState;

/**
 * The Users Billing State
 */
public BillingState: UserBillingState;

/**
 * The IDE state 
 */
public IdeState: IdeManagementState;

/**
 * Determines which state the modal is in user account info or cancellation 
 */
public IsUserAccount: boolean;

/**
 * Determines if the user is on the main user account slide or the managing subscription slide
 */
public ManagingSubscription: boolean;

/**
 * Determines which text to show on the cansellation modal when user is confirming
 */
public IsInitialReason: boolean;

public Reasons: Array<string> = Constants.REASONS_FOR_LEAVING;

public ReasonForLeaving: string;

public CancellationFeedback: string;

constructor(protected dialogRef: MatDialogRef<UserAccountModalComponent>,
  private usersStateCtx: UserManagementStateContext,
  private billingStateCtx: UserBillingStateContext,
  private ideStateCtx:IDEStateManagementContext
  ) {
    this.ManagingSubscription = false;
    this.IsUserAccount = true;
    this.IsInitialReason = true;
  // this.LogoutClicked = new EventEmitter<any>();
}

public ngOnInit(): void {

  this.usersStateCtx.Context.subscribe((state: UserManagementState) => {
    this.UserState = state;
    // console.log("Users State: ", this.UserState);
  });

  this.billingStateCtx.Context.subscribe((state: UserBillingState) => {
    this.BillingState = state;
    // console.log("Users Billing State: ", this.BillingState);
  });

  this.ideStateCtx.Context.subscribe((state: IdeManagementState) => {
    this.IdeState = state;
    // console.log("IDE State: ", this.IdeState);

  });
  
}

/**
 * Logs out the user
 */
public Logout() {
  window.location.replace('/.oauth/logout');
}

/**
 * Toggles ManagingSubscription to true
 * 
 * (May build out further functionality later)
 */
public ManageSubscription(){
  this.ManagingSubscription = true;
}
/**
 * Toggles ManagingSubscription to false in order to exit the editing state
 */
public GoBack(){
  this.ManagingSubscription = false;
}

public GoBackToUserAccount(){
  this.IsUserAccount = true;
  this.dialogRef.updatePosition({right:'0px', top: '60px'});
  this.dialogRef.updateSize('260');
}
/**
 * Leads to subscription cancellation modal
 */
public DisplayCancelSubscription(){
  console.log("display cancel Subscription selected");
  // center the dialog on the screen
  this.dialogRef.updatePosition({});
  //width x height
  this.dialogRef.updateSize('300px', '500px');

  this.IsUserAccount = false;
  
}

public CancelSubscription(){
  console.log("User Feedback: ", this.CancellationFeedback);
  console.log("User reason for cancelling", this.ReasonForLeaving);
  this.IsInitialReason = false;

  //TODO Hook up to state and proceed to next step once cancelation is complete
}

/**
 * Sends user to area where they can upgade their plan
 * 
 * TODO figure out where to send the user
 */
public Upgrade(){

  console.log("Upgarde selected");

}

/**
 * Checks to see if the user has selected a reason why 
 * they are canceling to enable the confirmation button
 */
public CheckIfReasonGiven(){
  if( this.ReasonForLeaving && this.ReasonForLeaving.length > 0){
    return false;
  }
  else{
    return true;
  }
}

public Close(){
  console.log("close selected");
  console.log("User Feedback: ", this.CancellationFeedback);
  this.dialogRef.close();
}

}
