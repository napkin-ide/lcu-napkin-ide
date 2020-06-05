import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Guid } from '@lcu/common';
import {
  Constants,
  NapkinIDESetupStepTypes,
  UserManagementStateContext,
  UserManagementState,
  AzureInfaSettings,
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-org-infra',
  templateUrl: './org-infra.component.html',
  styleUrls: ['./org-infra.component.scss'],
})
export class OrgInfraComponent implements OnInit {
  // Fields

  /**
   * Infrastructure template lookup field
   */
  public get InfraTemplate(): AbstractControl {
    return this.InfraForm.get('infraTemplate');
  }

  /**
   * Access organization name field
   */
  public get OrgInfraAzureTenatId(): AbstractControl {
    return this.InfraForm.get('azureTenantId');
  }

  public get OrgInfraAzureTenatIdHasError(): boolean {
    return (
      this.OrgInfraAzureTenatId.hasError('pattern') ||
      this.OrgInfraAzureTenatId.hasError('required') ||
      this.OrgInfraAzureTenatId.hasError('status')
    );
  }

  public get OrgInfraAzureTenatIdErrorMessage(): string {
    if (this.OrgInfraAzureTenatId.hasError('pattern')) {
      return this.GuidErrorMessage;
    } else if (this.OrgInfraAzureTenatId.hasError('required')) {
      return 'The Azure Tenant ID is required.';
    } else if (this.OrgInfraAzureTenatId.hasError('status')) {
      return 'The provided Azure Tenant ID is not valid.  Please check the value and try again.';
    }
  }

  /**
   * Access organization description field
   */
  public get OrgInfraAzureSubId(): AbstractControl {
    return this.InfraForm.get('azureSubId');
  }

  public get OrgInfraAzureSubIdHasError(): boolean {
    return (
      this.OrgInfraAzureSubId.hasError('pattern') ||
      this.OrgInfraAzureSubId.hasError('required') ||
      this.OrgInfraAzureSubId.hasError('status')
    );
  }

  public get OrgInfraAzureSubIdErrorMessage(): string {
    if (this.OrgInfraAzureSubId.hasError('pattern')) {
      return this.GuidErrorMessage;
    } else if (this.OrgInfraAzureSubId.hasError('required')) {
      return 'The Azure Subscription ID is required.';
    } else if (this.OrgInfraAzureSubId.hasError('status')) {
      return 'The provided Azure Subscription ID is not valid.  Please check the value and try again.';
    }
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppId(): AbstractControl {
    return this.InfraForm.get('azureAppId');
  }

  public get OrgInfraAzureAppIdHasError(): boolean {
    return (
      this.OrgInfraAzureAppId.hasError('pattern') ||
      this.OrgInfraAzureAppId.hasError('required') ||
      this.OrgInfraAzureAppId.hasError('status')
    );
  }

  public get OrgInfraAzureAppIdErrorMessage(): string {
    if (this.OrgInfraAzureAppId.hasError('pattern')) {
      return this.GuidErrorMessage;
    } else if (this.OrgInfraAzureAppId.hasError('required')) {
      return 'The Azure Application ID is required.';
    } else if (this.OrgInfraAzureAppId.hasError('status')) {
      return 'The provided Azure Application ID is not valid.  Please check the value and try again.';
    }
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureAppAuthKey(): AbstractControl {
    return this.InfraForm.get('azureAppAuthKey');
  }

  public get OrgInfraAzureAppAuthKeyHasError(): boolean {
    return (
      this.OrgInfraAzureAppAuthKey.hasError('pattern') ||
      this.OrgInfraAzureAppAuthKey.hasError('required') ||
      this.OrgInfraAzureAppAuthKey.hasError('status')
    );
  }

  public get OrgInfraAzureAppAuthKeyErrorMessage(): string {
    if (this.OrgInfraAzureAppAuthKey.hasError('pattern')) {
      return this.GuidErrorMessage;
    } else if (this.OrgInfraAzureAppAuthKey.hasError('required')) {
      return 'The Azure Application Client Secret is required.';
    } else if (this.OrgInfraAzureAppAuthKey.hasError('status')) {
      return 'The provided Azure Application Client Secret is not valid.  Please check the value and try again.';
    }
  }

  /**
   * Access organization lookup field
   */
  public get OrgInfraAzureRegion(): AbstractControl {
    return this.InfraForm.get('azureRegion');
  }

  // Properties

  /**
   * Step types
   */
  public SetupStepTypes = NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserManagementState;

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

  /**
   * The link to the Fathym Support page
   */
  public SupportPage: string;

  public get AzureInfrastructureValid(): boolean {
    return (
      this.State.AzureInfrastructureValid &&
      this.State.AzureInfrastructureValid.Code === 0
    );
  }

  /**
   * Infrastructure option keys
   */
  public get InfrastructureOptionKeys(): string[] {
    return this.State.InfrastructureOptions
      ? Object.keys(this.State.InfrastructureOptions)
      : [];
  }

  public get AzureRegionOptionKeys(): string[] {
    return this.State.AzureLocationOptions
      ? Object.keys(this.State.AzureLocationOptions)
      : [];
  }

  constructor(protected userMgr: UserManagementStateContext) {
    this.SetStep = new EventEmitter();
    this.setFieldToggles();
    this.SupportPage = Constants.SUPPORT_WEBPAGE;


    this.GuidErrorMessage = 'Value must be a valid Guid ( ' + Guid.Empty + ' )';
  }

  // life Cycle

  ngOnInit() {
    this.setupForm();

    this.setupState();
  }

  // API Methods

  public ChangeStep(step: NapkinIDESetupStepTypes): void {
    this.SetStep.emit(step);
  }

  /**
   * Configure azure setup
   */
  public Configure() {
    this.State.Loading = true;

    const envSettings = this.populateEnvSettings();

    this.userMgr.ConfigureInfrastructure(
      'Azure',
      true,
      envSettings,
      this.InfraTemplate.value,
      true
    );
  }


  /**
   * Validate azure setup
   */
  public ValidateInfra() {
    this.State.Loading = true;

    const envSettings = this.populateEnvSettings();

    this.userMgr.ConfigureInfrastructure(
      'Azure',
      true,
      envSettings,
      this.InfraTemplate.value,
      false
    );
  }

  // helpers
  protected loadControlByErrorFrom(errorFrom: string): AbstractControl {
    switch (errorFrom) {
      case 'AzureTenantID':
        return this.OrgInfraAzureTenatId;

      case 'AzureAppID':
        return this.OrgInfraAzureAppId;

      case 'AzureAppAuthKey':
        return this.OrgInfraAzureAppAuthKey;

      case 'AzureSubID':
        return this.OrgInfraAzureSubId;
    }
  }

  protected populateEnvSettings(): AzureInfaSettings {
    const envSettings = {
      ...(this.State.EnvSettings || new AzureInfaSettings()),
    };

    envSettings.AzureTenantID = this.OrgInfraAzureTenatId.value;

    envSettings.AzureSubID = this.OrgInfraAzureSubId.value;

    envSettings.AzureAppID = this.OrgInfraAzureAppId.value;

    envSettings.AzureAppAuthKey = this.OrgInfraAzureAppAuthKey.value;

    envSettings.AzureRegion = this.OrgInfraAzureRegion.value;

    if (envSettings.AzureRegion && this.State.AzureLocationOptions) {
      envSettings.AzureLocation = this.State.AzureLocationOptions[
        envSettings.AzureRegion
      ];
    } else {
      envSettings.AzureLocation = null;
    }

    return envSettings;
  }

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
      azureTenantId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator),
          this.statusValidatorFactory('AzureTenantID'),
        ]),
        updateOn: 'change',
      }),
      azureAppId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator),
          this.statusValidatorFactory('AzureAppID'),
        ]),
        updateOn: 'change',
      }),
      azureAppAuthKey: new FormControl('', {
        validators: [
          Validators.required,
          this.statusValidatorFactory('AzureAppAuthKey'),
        ],
        updateOn: 'change',
      }),
      azureSubId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator),
          this.statusValidatorFactory('AzureSubID'),
        ]),
        updateOn: 'change',
      }),
      azureRegion: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      infraTemplate: new FormControl('', {
        validators: Validators.compose([Validators.required]),
        updateOn: 'change',
      }),
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.InfraForm.valueChanges.subscribe((val) => {});
  }

  /**
   * Setup state mechanism
   */
  protected setupState(): void {
    this.userMgr.Context.subscribe((state: UserManagementState) => {
      this.State = state;

      this.stateChanged();
    });
  }

  /**
   * When state values change
   */
  protected stateChanged(): void {
    if (this.State.EnvSettings) {
      this.OrgInfraAzureTenatId.setValue(
        this.State.EnvSettings.AzureTenantID || ''
      );

      this.OrgInfraAzureSubId.setValue(this.State.EnvSettings.AzureSubID || '');

      this.OrgInfraAzureAppId.setValue(this.State.EnvSettings.AzureAppID || '');

      this.OrgInfraAzureAppAuthKey.setValue(
        this.State.EnvSettings.AzureAppAuthKey || ''
      );

      this.OrgInfraAzureRegion.setValue(
        this.State.EnvSettings.AzureRegion || ''
      );

      this.InfraTemplate.setValue(this.State.Template || '');

      this.OrgInfraAzureTenatId.markAsTouched();

      this.OrgInfraAzureSubId.markAsTouched();

      this.OrgInfraAzureAppId.markAsTouched();

      this.OrgInfraAzureAppAuthKey.markAsTouched();

      this.OrgInfraAzureRegion.markAsTouched();

      this.InfraTemplate.markAsTouched();
    }
  }

  /**
   * Custm validator used to ensure status is successful
   */
  protected statusValidatorFactory(errorFor: string) {
    return (control: FormControl) => {
      const errorFrom = this.State.Status
        ? (this.State.Status as any).ErrorFrom
        : '';

      if (
        this.State.Status &&
        this.State.Status.Code === 102 &&
        errorFrom &&
        errorFor === errorFrom &&
        this.InfraForm
      ) {
        const formCtrl = this.loadControlByErrorFrom(errorFrom);

        if (formCtrl && this.State.EnvSettings[errorFor] === formCtrl.value) {
          return {
            status: {
              valid: false,
              status: this.State.Status,
            },
          };
        }
      }

      return null;
    };
  }
}
