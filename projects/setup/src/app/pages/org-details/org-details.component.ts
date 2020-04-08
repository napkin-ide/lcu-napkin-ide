import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  UserManagementStateContext,
  UserManagementState,
  NapkinIDESetupStepTypes,
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss'],
})
export class OrgDetailsComponent implements OnInit {
  // Fields

  //  Properties

  /**
   * Access organization name field
   */
  public get OrgDetailName(): AbstractControl {
    return this.DetailsForm.get('orgDetailName');
  }

  // /**
  //  * Access organization description field
  //  */
  // public get OrgDetailDesc(): AbstractControl {
  //   return this.DetailsForm.get('orgDetailDesc');
  // }

  /**
   * Access organization lookup field
   */
  public get OrgDetailLookup(): AbstractControl {
    return this.DetailsForm ? this.DetailsForm.get('orgDetailLookup') : null;
  }

  public get OrgDetailLookupHasError(): boolean {
    return (
      this.OrgDetailLookup.hasError('pattern') ||
      this.OrgDetailLookup.hasError('required') ||
      this.OrgDetailLookup.hasError('status')
    );
  }

  public get OrgDetailLookupErrorMessage(): string {
    if (this.OrgDetailLookup.hasError('pattern')) {
      return `The Project lookup must contain 3 - 12 charaters, all lowercase with '-'. A '-' may not start or end the value.`;
    } else if (this.OrgDetailLookup.hasError('required')) {
      return 'The Project lookup is required.';
    } else if (this.OrgDetailLookup.hasError('status')) {
      return this.State.Status.Message;
    }
  }

  /**
   * Access organization lookup field
   */
  public get OrgDetailTerms(): AbstractControl {
    return this.DetailsForm.get('orgDetailTerms');
  }

  // Properties

  /**
   * Step types
   */
  public SetupStepTypes = NapkinIDESetupStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserManagementState;

  /**
   * Details formgroup
   */
  public DetailsForm: FormGroup;

  constructor(protected userMgr: UserManagementStateContext) {}

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

    this.userMgr.SetOrganizationDetails(
      this.OrgDetailName.value,
      // this.OrgDetailDesc.value,
      this.OrgDetailLookup.value
    );
  }

  //  Helpers

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    this.DetailsForm = new FormGroup({
      orgDetailName: new FormControl('', [Validators.required]),
      // orgDetailDesc: new FormControl ('', [Validators.required]),
      orgDetailLookup: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z-]{3,12}$'),
          this.statusValidatorFactory(),
        ]),
        updateOn: 'change',
      }),
      orgDetailTerms: new FormControl('', [Validators.required]),
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.DetailsForm.valueChanges.subscribe((val) => {});
  }

  /**
   * Setup state mechanism
   */
  protected setupState(): void {
    this.userMgr.Context.subscribe((state) => {
      this.State = state;

      this.stateChanged();
    });
  }

  /**
   * When state values change
   */
  protected stateChanged(): void {
    if (this.State.OrganizationName) {
      this.OrgDetailName.patchValue(this.State.OrganizationName || '');

      // this.OrgDetailDesc.patchValue(this.State.OrganizationDescription || '');

      this.OrgDetailLookup.patchValue(this.State.OrganizationLookup || '');

      this.OrgDetailTerms.patchValue(this.State.TermsAccepted || '');

      this.OrgDetailLookup.markAsTouched();
    }
  }

  /**
   * Custm validator used to ensure status is successful
   */
  protected statusValidatorFactory() {
    return (control: FormControl) => {
      if (
        this.State.Status &&
        this.State.Status.Code === 101 &&
        this.OrgDetailLookup &&
        this.State.OrganizationLookup === this.OrgDetailLookup.value
      ) {
        return {
          status: {
            valid: false,
            status: this.State.Status,
          },
        };
      }

      return null;
    };
  }
}
