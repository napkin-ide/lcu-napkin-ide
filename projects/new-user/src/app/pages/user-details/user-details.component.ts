import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import {
  UserManagementState,
  UserManagementStepTypes
} from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';

@Component({
  selector: 'lcu-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  // Fields

  /**
   * Access organization name field
   */
  public get UserFullName(): AbstractControl {
    return this.DetailsForm.get('userFullName');
  }

  /**
   * Access organization description field
   */
  public get UserCountry(): AbstractControl {
    return this.DetailsForm.get('userCountry');
  }

  /**
   * Access organization lookup field
   */
  public get UserHandle(): AbstractControl {
    return this.DetailsForm.get('userHandle');
  }

  // Properties

  @Input('setup-step-types')
  public SetupStepTypes: UserManagementStepTypes;

  @Input('state')
  public State: UserManagementState;

  /**
   * Details formgroup
   */
  public DetailsForm: FormGroup;

  constructor(protected nideState: UserManagementStateContext) {}

  ngOnInit() {
    this.setupForm();
    this.setupState();
  }

  //  API Methods

  /**
   * Set organizational values on the state
   */
  public SetOrgDetails() {
    this.State.Loading = true;

    this.nideState.SetUserDetails(
      this.UserFullName.value,
      this.UserCountry.value,
      this.UserHandle.value
    );
  }

  //  Helpers

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    this.DetailsForm = new FormGroup({
      orgDetailName: new FormControl('', [Validators.required]),
      orgDetailDesc: new FormControl('', [Validators.required]),
      orgDetailLookup: new FormControl('', [Validators.required])
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.DetailsForm.valueChanges.subscribe(val => {});
  }

  /**
   * Setup state mechanism
   */
  protected setupState(): void {
    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  /**
   * When state values change
   */
  protected stateChanged(): void {
    if (this.State.UserFullName) {
      this.UserFullName.patchValue(this.State.UserFullName || '');

      this.UserCountry.patchValue(this.State.UserCountry || '');

      this.UserHandle.patchValue(this.State.UserHandle || '');
    }
  }
}
