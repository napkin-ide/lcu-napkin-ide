import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NapkinIDESetupStepTypes, NapkinIDESetupState, AzureInfaSettings } from '../../core/napkin-ide-setup.state';
import { AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-infra',
  templateUrl: './org-infra.component.html',
  styleUrls: ['./org-infra.component.scss']
})
export class OrgInfraComponent implements OnInit {

 // Fields

  /**
   * Access organization name field
   */
  public get OrgInfraAzureTenatId(): AbstractControl {
    return this.OrgInfraForm.get('azureTenantId');
  }

  /**
   * Access organization description field
   */
  public get OrgInfraAzureSubId(): AbstractControl {
    return this.OrgInfraForm.get('azureSubId');
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppAppId(): AbstractControl {
    return this.OrgInfraForm.get('azureAppId');
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppAuthKey(): AbstractControl {
    return this.OrgInfraForm.get('azureAppAuthKey');
  }

  // Properties

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

  /**
   * Event for changing step type
   */
  // tslint:disable-next-line:no-output-rename
  @Output('set-step')
  public SetStep: EventEmitter<NapkinIDESetupStepTypes>;

  /**
   * Details formgroup
   */
  public OrgInfraForm: FormGroup;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
    this.SetStep = new EventEmitter();
   }

// life Cycle

  ngOnInit() {
    this.setupForm();
    this.setupState();
  }

// API Methods

/**
 * Configure azure setup
 */
public Configure() {
  this.State.Loading = true;

  if (!this.State.EnvSettings) {
    this.State.EnvSettings = new AzureInfaSettings();
  }

  this.State.EnvSettings.AzureTenantID = this.OrgInfraAzureTenatId.value;

  this.State.EnvSettings.AzureSubID = this.OrgInfraAzureSubId.value;

  this.State.EnvSettings.AzureAppID = this.OrgInfraAzureAppAppId.value;

  this.State.EnvSettings.AzureAppAuthKey = this.OrgInfraAzureAppAuthKey.value;

  this.nideState.ConfigureInfrastructure('Azure', true, this.State.EnvSettings);
}
  // helpers

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    this.OrgInfraForm = new FormGroup({
      azureTenantId: new FormControl ('', [Validators.required]),
      azureAppId: new FormControl ('', [Validators.required]),
      azureAppAuthKey: new FormControl ('', [Validators.required]),
      azureSubId: new FormControl ('', [Validators.required])
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.OrgInfraForm.valueChanges.subscribe(val => {
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
    if (this.State.EnvSettings) {
      this.OrgInfraAzureTenatId.setValue(this.State.EnvSettings.AzureTenantID || '');

      this.OrgInfraAzureSubId.setValue(this.State.EnvSettings.AzureSubID || '');

      this.OrgInfraAzureAppAppId.setValue(this.State.EnvSettings.AzureAppID || '');

      this.OrgInfraAzureTenatId.setValue(this.State.EnvSettings.AzureAppAuthKey || '');

      setTimeout(() => this.OrgInfraForm.updateValueAndValidity());
    }
  }

  public ChangeStep(step: NapkinIDESetupStepTypes): void {
    this.SetStep.emit(step);
  }

}
