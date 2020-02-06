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

  public get RootURL(): string {
    const port = location.port ? `:${location.port}` : '';

    return `${location.protocol}//${location.hostname}${port}`;
  }

  /**
   * host form validity
   */
  public HostFormValid: boolean;

  /**
   * detail form validity
   */
  public DetailsFormValid: boolean;

  /**
   * Infra form validity
   */
  public InfraFormValid: boolean;

  /**
   * Step types
   */
  public SetupStepTypes = UserManagementStepTypes;

  /**
   * State mechanism
   */
  public State: UserManagementState;

  public Subdomain: string;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMngState: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
    ) {
     this.HostFormValid = false;
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

    if (this.State.Step === UserManagementStepTypes.Complete) {
    }
  }
}
