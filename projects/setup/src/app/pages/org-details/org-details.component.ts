import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NapkinIDESetupState, NapkinIDESetupStepTypes } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.scss']
})
export class OrgDetailsComponent implements OnInit {

  // Fields

  /**
   * Access organization name field
   */
  public get OrgDetailName(): AbstractControl {
    return this.DetailsForm.get('orgDetailName');
  }

  /**
   * Access organization description field
   */
  public get OrgDetailDesc(): AbstractControl {
    return this.DetailsForm.get('orgDetailDesc');
  }

  /**
   * Access organization lookup field
   */
  public get OrgDetailLookup(): AbstractControl {
    return this.DetailsForm.get('orgDetailLookup');
  }

  // Properties

  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: NapkinIDESetupState;

  /**
   * Details formgroup
   */
  public DetailsForm: FormGroup;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {}

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

  this.nideState.SetOrganizationDetails(
    this.OrgDetailName.value,
    this.OrgDetailDesc.value,
    this.OrgDetailLookup.value
  );
}

//  Helpers

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    this.DetailsForm = new FormGroup({
      orgDetailName: new FormControl ('', [Validators.required]),
      orgDetailDesc: new FormControl ('', [Validators.required]),
      orgDetailLookup: new FormControl ('', [Validators.required])
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.DetailsForm.valueChanges.subscribe(val => {
    });
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
    if (this.State.OrganizationName) {
      this.OrgDetailName.patchValue(this.State.OrganizationName || '');
      this.OrgDetailDesc.patchValue(this.State.OrganizationDescription || '');
      this.OrgDetailLookup.patchValue(this.State.OrganizationLookup || '');
    }
  }

}
