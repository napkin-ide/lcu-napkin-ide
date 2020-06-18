import { Component, OnInit } from '@angular/core';
import { UserManagementState } from '../../state/user-management/user-management.state';
import { UserBillingState } from '../../state/user-billing/user-billing.state';
import { UserManagementStateContext } from '../../state/user-management/user-management-state.context';
import { UserBillingStateContext } from '../../state/user-billing/user-billing-state.context';
import { IdeManagementState } from '../../state/ide/ide-management.state';
import { IDEStateManagementContext } from '../../state/ide/ide-management-state.context';

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

public ManagingSubscription: boolean;

constructor(private usersStateCtx: UserManagementStateContext,
  private billingStateCtx: UserBillingStateContext,
  private ideStateCtx:IDEStateManagementContext) {
    this.ManagingSubscription = false;
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
/**
 * Cancels subscription
 * 
 * TODO hook up to state function
 */
public CancelSubscription(){
  console.log("cancel Subscription selected");
}

/**
 * Sends user to area where they can upgade their plan
 * 
 * TODO figure out where to send the user
 */
public Upgrade(){
  console.log("Upgarde selected");
}

}
