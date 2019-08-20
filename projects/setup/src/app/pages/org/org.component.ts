import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NapkinIDESetupState, NapkinIDESetupStepTypes } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';
import { AzureInfaSettings } from './../../core/napkin-ide-setup.state';

@Component({
  selector: 'lcu-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss'],
  animations: []
})
export class OrgComponent implements OnInit {
  //  Fields

  //  Properties
  public get AzureDevOpsOAuthURL(): string {
    return `/.devops/oauth?redirectUri=${this.OAuthRedirectURL}`;
  }

  public DevOpsSetupFormGroup: FormGroup;

  public HostForm: FormGroup;

  public NewForm: FormGroup;

  public HostValid: boolean;

  public InfraConfigFormGroup: FormGroup;

  public get OAuthRedirectURL(): string {
    return `${location.href}`;
  }

  public get RootURL(): string {
    const port = location.port ? `:${location.port}` : '';

    return `${location.protocol}//${location.hostname}${port}`;
  }

  public SetupStepTypes = NapkinIDESetupStepTypes;

  public State: NapkinIDESetupState;

  public Subdomain: string;

  //  Constructors
  constructor(protected formBldr: FormBuilder, protected nideState: NapkinIDESetupStateManagerContext) {
    this.HostValid = false;
  }

  //  Life Cycle
  public ngOnInit() {
    this.DevOpsSetupFormGroup = this.formBldr.group({
      devOpsAppId: [''],
      devOpsClientSecret: [''],
      devOpsScopes: ['']
    });

    this.HostForm = this.formBldr.group({
      host: ['', Validators.required],
      root: ['']
    });

    this.NewForm = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      lookup: ['', Validators.required]
    });

    this.InfraConfigFormGroup = this.formBldr.group({
      azureTenantId: ['', Validators.required],
      azureSubId: ['', Validators.required],
      azureAppId: ['', Validators.required],
      azureAppAuthKey: ['', Validators.required]
    });

    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  public onChanges() {
    this.HostValid = false;

    const host = this.HostForm.controls.host.value;

    if (this.State.HostFlow === 'private' && host && host.split('.').length >= 3) {
      this.HostValid = true;
      this.Subdomain = host.split('.')[0];
    } else if (this.State.HostFlow === 'shared' && host && host.length > 0) {
      this.HostValid = true;
    }
  }

  //  API methods
  public Boot() {
    this.State.Loading = true;

    this.nideState.BootEnterprise();
  }

  public Configure() {
    this.State.Loading = true;

    if (!this.State.EnvSettings) {
      this.State.EnvSettings = new AzureInfaSettings();
    }

    this.State.EnvSettings.AzureTenantID = this.InfraConfigFormGroup.controls.azureTenantId.value;

    this.State.EnvSettings.AzureSubID = this.InfraConfigFormGroup.controls.azureSubId.value;

    this.State.EnvSettings.AzureAppID = this.InfraConfigFormGroup.controls.azureAppId.value;

    this.State.EnvSettings.AzureAppAuthKey = this.InfraConfigFormGroup.controls.azureAppAuthKey.value;

    this.nideState.ConfigureInfrastructure('Azure', true, this.State.EnvSettings);
  }

  public Copy(inputElement: HTMLInputElement) {
    const textarea = document.createElement('textarea');

    textarea.textContent = inputElement.value;

    document.body.appendChild(textarea);

    const selection = document.getSelection();

    const range = document.createRange();

    range.selectNode(textarea);

    selection.removeAllRanges();

    selection.addRange(range);

    console.log('copy success', document.execCommand('copy'));

    selection.removeAllRanges();

    document.body.removeChild(textarea);
  }

  public ResetOrgDetails() {
    this.State.Loading = true;

    this.nideState.SetOrganizationDetails(null, null, null);
  }

  public SecureHost() {
    this.State.Loading = true;

    let host = '';

    if (this.State.HostFlow === 'private') {
      host = this.HostForm.controls.host.value;
    } else if (this.State.HostFlow === 'shared') {
      host = `${this.HostForm.controls.host.value}.${this.HostForm.controls.root.value}`;
    }

    this.nideState.SecureHost(host);
  }

  public SetHostFlow(flow: string) {
    this.HostForm.reset();

    this.State.Loading = true;

    this.nideState.SetHostFlow(flow);
  }

  public SetStep(step: NapkinIDESetupStepTypes) {
    this.State.Loading = true;

    this.nideState.SetNapkinIDESetupStep(step);
  }

  public SetOrgDetails() {
    this.State.Loading = true;

    this.nideState.SetOrganizationDetails(
      this.NewForm.controls.name.value,
      this.NewForm.controls.desc.value,
      this.NewForm.controls.lookup.value
    );
  }

  public SetupDevOpsOAuth() {
    this.State.Loading = true;

    this.nideState.SetupDevOpsOAuth(
      this.DevOpsSetupFormGroup.controls.devOpsAppId.value,
      this.DevOpsSetupFormGroup.controls.devOpsScopes.value,
      this.DevOpsSetupFormGroup.controls.devOpsClientSecret.value
    );
  }

  //  Helpers
  protected stateChanged() {
    if (this.State.OrganizationName) {
      this.NewForm.patchValue({
        name: this.State.OrganizationName || '',
        desc: this.State.OrganizationDescription || '',
        lookup: this.State.OrganizationLookup || ''
      });
    }

    if (this.State.Host) {
      this.HostForm.controls.root.setValue([this.State.Host.split('.')[1], this.State.Host.split('.')[2]].join('.'));

      this.HostForm.controls.host.setValue(this.State.Host.split('.')[0] || '');

      setTimeout(() => this.HostForm.updateValueAndValidity());
    }

    if (this.State.EnvSettings) {
      this.InfraConfigFormGroup.controls.azureTenantId.setValue(this.State.EnvSettings.AzureTenantID || '');

      this.InfraConfigFormGroup.controls.azureSubId.setValue(this.State.EnvSettings.AzureSubID || '');

      this.InfraConfigFormGroup.controls.azureAppId.setValue(this.State.EnvSettings.AzureAppID || '');

      this.InfraConfigFormGroup.controls.azureAppAuthKey.setValue(this.State.EnvSettings.AzureAppAuthKey || '');

      setTimeout(() => this.InfraConfigFormGroup.updateValueAndValidity());
    }

    if (this.State.DevOpsAppID) {
      this.DevOpsSetupFormGroup.controls.devOpsAppId.setValue(this.State.DevOpsAppID || '');

      this.DevOpsSetupFormGroup.controls.devOpsClientSecret.setValue(this.State.DevOpsClientSecret || '');

      this.DevOpsSetupFormGroup.controls.devOpsScopes.setValue(this.State.DevOpsScopes || '');

      setTimeout(() => this.DevOpsSetupFormGroup.updateValueAndValidity());
    }
    // if (this.State.Step === 'Provisioning') {
    //   setTimeout(() => {
    //     // location.href = `https://${this.State.Host}/forge`;
    //   }, 10000);
    // }
  }
}
