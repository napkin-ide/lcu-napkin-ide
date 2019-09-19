import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NapkinIDESetupState, NapkinIDESetupStepTypes } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';
import { AzureInfaSettings } from './../../core/napkin-ide-setup.state';
import { OrgDetailsComponent } from '../../org-controls/org-details/org-details.component';
import { OrgInfraComponent } from '../../org-controls/org-infra/org-infra.component';
import { OrgHostComponent } from '../../org-controls/org-host/org-host.component';

@Component({
  selector: 'lcu-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss'],
  animations: []
})
export class OrgComponent implements OnInit, AfterViewInit {
  //  Fields

  // /**
  //  * Access organization name field
  //  */
  // public get OrgName(): AbstractControl {
  //   return this.OrgForm.get('orgName');
  // }

  // /**
  //  * Access organization description field
  //  */
  // public get OrgDesc(): AbstractControl {
  //   return this.OrgForm.get('orgDesc');
  // }

  // /**
  //  * Access organization lookup field
  //  */
  // public get OrgLookup(): AbstractControl {
  //   return this.OrgForm.get('orgLookup');
  // }

  /**
   * OrgDetailsComponent
   */
  @ViewChild(OrgDetailsComponent, { static: false })
  public OrgDetailsComponent: OrgDetailsComponent;

  @ViewChild(OrgInfraComponent, { static: false })
  public OrgInfraComponent: OrgInfraComponent;

  /**
   * Host component
   * 
   * Using Querylist, because OrgHostComponent is undefined on load
   */
  // @ViewChildren(OrgHostComponent)
  // public OrgHostComponent: QueryList<OrgHostComponent>;

  @ViewChild(OrgHostComponent, { static: false })
  public OrgHostComponent: OrgHostComponent;

  //  Properties
  public get AzureDevOpsOAuthURL(): string {
    return `/.devops/oauth?redirectUri=${this.OAuthRedirectURL}`;
  }

  // public HostForm: FormGroup;

  // public OrgForm: FormGroup;

  public HostValid: boolean;

  // public InfraConfigFormGroup: FormGroup;

  /**
   * Parent form used to attach children forms to
   */
  public ParentForm: FormGroup;

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
    // this.HostForm = this.formBldr.group({
    //   host: ['', Validators.required],
    //   root: ['']
    // });

    this.ParentForm = new FormGroup({});
  
    // this.OrgForm = new FormGroup({
    //   orgName: new FormControl ('', [Validators.required]),
    //   orgDesc: new FormControl ('', [Validators.required]),
    //   orgLookup: new FormControl ('', [Validators.required])
    // });

    // this.InfraConfigFormGroup = this.formBldr.group({
    //   azureTenantId: ['', Validators.required],
    //   azureSubId: ['', Validators.required],
    //   azureAppId: ['', Validators.required],
    //   azureAppAuthKey: ['', Validators.required]
    // });

    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {
    this.setupChildrenForms();
  }

  // public onChanges() {
  //   this.isHostValid();
  // }

  //  API methods
  public AcceptTerms() {
    this.State.Loading = true;

    this.nideState.AcceptTerms(this.State.Terms);
  }

  public Boot() {
    this.State.Loading = true;

    this.nideState.BootEnterprise();
  }

  // public Configure() {
  //   this.State.Loading = true;

  //   if (!this.State.EnvSettings) {
  //     this.State.EnvSettings = new AzureInfaSettings();
  //   }

  //   this.State.EnvSettings.AzureTenantID = this.InfraConfigFormGroup.controls.azureTenantId.value;

  //   this.State.EnvSettings.AzureSubID = this.InfraConfigFormGroup.controls.azureSubId.value;

  //   this.State.EnvSettings.AzureAppID = this.InfraConfigFormGroup.controls.azureAppId.value;

  //   this.State.EnvSettings.AzureAppAuthKey = this.InfraConfigFormGroup.controls.azureAppAuthKey.value;

  //   this.nideState.ConfigureInfrastructure('Azure', true, this.State.EnvSettings);
  // }

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

  public Finalize() {
    this.State.Loading = true;

    this.nideState.Finalize();
  }

  public ResetOrgDetails() {
    this.State.Loading = true;

    this.nideState.SetOrganizationDetails(null, null, null);
  }

  public SecureHost() {
    this.State.Loading = true;

    let host = '';

    if (this.State.HostFlow === 'private') {
      host = this.OrgHostComponent.HostAddressControl.value;
      // host = this.HostForm.controls.host.value;
    } else if (this.State.HostFlow === 'shared') {
      // host = `${this.HostForm.controls.host.value}.${this.HostForm.controls.root.value}`;
      host = `${this.OrgHostComponent.HostAddressControl.value}.${this.OrgHostComponent.HostAddressControl.value}`;
    }

    this.nideState.SecureHost(host);
  }

  public SetHostFlow(flow: string) {
    // this.HostForm.reset();
    this.OrgHostComponent.HostForm.reset();

    this.State.Loading = true;

    this.nideState.SetHostFlow(flow);
  }

  public SetStep(step: NapkinIDESetupStepTypes) {
    if (this.State.Step !== NapkinIDESetupStepTypes.Complete) {
      this.State.Loading = true;

      this.nideState.SetNapkinIDESetupStep(step);
    }
  }

  // public SetOrgDetails() {
  //   this.State.Loading = true;

  //   this.nideState.SetOrganizationDetails(
  //     this.OrgForm.controls.name.value,
  //     this.OrgForm.controls.desc.value,
  //     this.OrgForm.controls.lookup.value
  //   );
  // }

  //  Helpers

  /**
   * 
   * @param evt boolean for valid host address
   */
  public IsHostValid(evt: boolean): void {
    console.log('valid', evt);
    this.HostValid = evt;
  }

  /**
   * Update subdomain
   *
   * @param evt subdomain value
   */
  public SubdomainChange(evt: string): void {
    console.log('Subdomain', evt);
    this.Subdomain = evt;
  }
  // protected isHostValid() {
  //   this.HostValid = false;

  //   // const host = this.HostForm.controls.host.value;

  //   if (this.State.HostFlow === 'private' && host && host.split('.').length >= 3) {
  //     this.HostValid = true;
  //     this.Subdomain = host.split('.')[0];
  //   } else if (this.State.HostFlow === 'shared' && host && host.length > 0) {
  //     this.HostValid = true;
  //   }
  // }

  protected stateChanged() {
    // this.isHostValid();

    // if (this.State.OrganizationName) {
    //   this.OrgForm.patchValue({
    //     name: this.State.OrganizationName || '',
    //     desc: this.State.OrganizationDescription || '',
    //     lookup: this.State.OrganizationLookup || ''
    //   });
    // }

    // if (this.State.Host) {
    //   this.HostForm.controls.root.setValue([this.State.Host.split('.')[1], this.State.Host.split('.')[2]].join('.'));

    //   this.HostForm.controls.host.setValue(this.State.Host.split('.')[0] || '');

    //   setTimeout(() => this.HostForm.updateValueAndValidity());
    // }

    // if (this.State.EnvSettings) {
    //   this.InfraConfigFormGroup.controls.azureTenantId.setValue(this.State.EnvSettings.AzureTenantID || '');

    //   this.InfraConfigFormGroup.controls.azureSubId.setValue(this.State.EnvSettings.AzureSubID || '');

    //   this.InfraConfigFormGroup.controls.azureAppId.setValue(this.State.EnvSettings.AzureAppID || '');

    //   this.InfraConfigFormGroup.controls.azureAppAuthKey.setValue(this.State.EnvSettings.AzureAppAuthKey || '');

    //   setTimeout(() => this.InfraConfigFormGroup.updateValueAndValidity());
    // }

    if (this.State.Step === NapkinIDESetupStepTypes.Complete) {
      setTimeout(() => {
        location.href = `https://${this.State.Host}/fathym-it`;
      }, 15000);
    }
  }

  /**
   * hook into children forms
   */
  protected setupChildrenForms(): void {
    // org detail form
    if (this.OrgDetailsComponent) {
      this.ParentForm.addControl('OrgDetailsForm', this.OrgDetailsComponent.OrgDetailsForm);
      this.OrgDetailsComponent.OrgDetailsForm.setParent(this.ParentForm);
    }

    // org detail form
    if (this.OrgInfraComponent) {
      this.ParentForm.addControl('OrgInfraForm', this.OrgInfraComponent.OrgInfraForm);
      this.OrgInfraComponent.OrgInfraForm.setParent(this.ParentForm);
    }

    // QueryList is used, because the component is undefined on load
    // this.OrgHostComponent.changes.subscribe((itm: QueryList<OrgHostComponent>) => {
    //   this.HostForm = itm.first.HostForm;
    //   itm.first.HostForm.valueChanges.subscribe(val => {
    //     // console.log(val);
    //   });
    // });

    if (this.OrgHostComponent) {
      this.ParentForm.addControl('OrgHostForm', this.OrgHostComponent.HostForm);
      this.OrgHostComponent.HostForm.setParent(this.ParentForm);
    }
  }
}
