import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NapkinIDESetupStepTypes, NapkinIDESetupState, AzureInfaSettings } from '../../core/napkin-ide-setup.state';
import { AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';
import { Guid } from '@lcu/common';
import { Constants } from '@napkin-ide/lcu-napkin-ide-common';

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
    return this.InfraForm.get('azureTenantId');
  }

  /**
   * Access organization description field
   */
  public get OrgInfraAzureSubId(): AbstractControl {
    return this.InfraForm.get('azureSubId');
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppAppId(): AbstractControl {
    return this.InfraForm.get('azureAppId');
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppAuthKey(): AbstractControl {
    return this.InfraForm.get('azureAppAuthKey');
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
   * Guid Error Message
   */
  public GuidErrorMessage: string;

  /**
   * Toggle Application Id
   */
  public HideAppId: boolean;

  /**
   * Toggle Auth Key
   */
  public HideAuthKey: boolean;

  /**
   * Toggle Tenant Id
   */
  public HideTenantId: boolean;

  /**
   * Toggle Subscription Id
   */
  public HideSubId: boolean;

  /**
   * Details formgroup
   */
  public InfraForm: FormGroup;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
    this.SetStep = new EventEmitter();
    this.setFieldToggles();

    this.GuidErrorMessage = 'Value must be a valid Guid ( ' + Guid.Empty + ' )' ;
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

  // if (!this.State.EnvSettings) {
  this.State.EnvSettings = new AzureInfaSettings();
 // }

  this.State.EnvSettings.AzureTenantID = this.OrgInfraAzureTenatId.value;

  this.State.EnvSettings.AzureSubID = this.OrgInfraAzureSubId.value;

  this.State.EnvSettings.AzureAppID = this.OrgInfraAzureAppAppId.value;

  this.State.EnvSettings.AzureAppAuthKey = this.OrgInfraAzureAppAuthKey.value;

  this.nideState.ConfigureInfrastructure('Azure', true, this.State.EnvSettings);
}

public OpenHelpPdf(){
  window.open(Constants.HELP_PDF)
}
  // helpers

  /**
   * Setup toggled fields
   */
  protected setFieldToggles(): void {
    this.HideAppId = this.HideAuthKey = this.HideTenantId = this.HideSubId = true;
  }

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    // this.InfraForm = new FormGroup({
    //   azureTenantId: new FormControl ('', [Validators.required, Validators.maxLength(36)]),
    //   azureAppId: new FormControl ('', [Validators.required, Validators.maxLength(36)]),
    //   azureAppAuthKey: new FormControl ('', {validators: [Validators.required], updateOn: 'change'}),
    //   azureSubId: new FormControl ('', [Validators.required, Validators.maxLength(36)])
    // });

    this.InfraForm = new FormGroup({
      azureTenantId: new FormControl ('',  {validators: Validators.compose([
        Validators.required,
        Validators.pattern(Guid.GuidValidator)]), updateOn: 'change'}),
      azureAppId: new FormControl ('',  {validators: Validators.compose([
        Validators.required,
        Validators.pattern(Guid.GuidValidator)]), updateOn: 'change'}),
      azureAppAuthKey: new FormControl ('', {validators: [Validators.required], updateOn: 'change'}),
      azureSubId: new FormControl ('',  {validators: Validators.compose([
        Validators.required,
        Validators.pattern(Guid.GuidValidator)]), updateOn: 'change'})
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.InfraForm.valueChanges.subscribe(val => {
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

      this.OrgInfraAzureAppAuthKey.setValue(this.State.EnvSettings.AzureAppAuthKey || '');

      setTimeout(() => this.InfraForm.updateValueAndValidity());
    }
  }

  public ChangeStep(step: NapkinIDESetupStepTypes): void {
    this.SetStep.emit(step);
  }

}
