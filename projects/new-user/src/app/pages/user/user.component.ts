import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserManagementState, UserManagementStepTypes } from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';

@Component({
  selector: 'lcu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: []
})
export class UserComponent implements OnInit, AfterViewInit {

  //  Fields

  //  Properties

  /**
   * State mechanism
   */
  public State: UserManagementState;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMngState: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
    ) {
      this.State = {};
  }

  //  Life Cycle
  public ngOnInit() {
    this.userMngState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {
  }

  //  API methods
  public SetUserDetails() {
    this.State.Loading = true;

    this.userMngState.SetUserDetails('Mike Gearhardt', 'USA', 'mcgear');
  }

  //  Helpers

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    // if (this.State.Step === UserManagementStepTypes.Complete) {
    // }
  }
}
