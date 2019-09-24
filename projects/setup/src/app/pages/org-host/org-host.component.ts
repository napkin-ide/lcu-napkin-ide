import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { NapkinIDESetupStepTypes, NapkinIDESetupState } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-host',
  templateUrl: './org-host.component.html',
  styleUrls: ['./org-host.component.scss']
})
export class OrgHostComponent implements OnInit {
 // Fields

  /**
   * Access organization name field
   */
  public get HostAddressControl(): AbstractControl {
    return this.HostForm.get('hostAddressControl');
  }

  /**
   * Access organization description field
   */
  public get RootDomainControl(): AbstractControl {
    return this.HostForm.get('rootDomainControl');
  }

  // Properties

  /**
   * Set step types
   */
  private _setupStepTypes: NapkinIDESetupStepTypes;
  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public set SetupStepTypes(val: NapkinIDESetupStepTypes) {
    this._setupStepTypes = val;
  }

  public get SetupStepTypes() {
    return this._setupStepTypes;
  }
  
  // public SetupStepTypes: NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: NapkinIDESetupState;

  // tslint:disable-next-line:no-output-rename
  @Output('set-step')
  public SetStep: EventEmitter<NapkinIDESetupStepTypes>;

  /**
   * Valid host property
   */
  private _validHost: boolean;
  public set ValidHost(val: boolean) {
    this._validHost = val;
  }

  public get ValidHost() {
    return this._validHost;
  }

  /**
   * Subdomain property
   */
  private _subdomain: string;
  public set Subdomain(val: string) {
    this._subdomain = val;
  }

  public get Subdomain() {
    return this._subdomain;
  }


  /**
   * Details formgroup
   */
  public HostForm: FormGroup;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
    this.ValidHost = false;

    this.SetStep = new EventEmitter();
  }

  ngOnInit() {
    this.setupForm();
    this.setupState();
  }

//  API Methods

public SecureHost() {
  this.State.Loading = true;

  let host = '';

  if (this.State.HostFlow === 'private') {
    host = this.HostAddressControl.value;
  } else if (this.State.HostFlow === 'shared') {
    host = `${this.HostAddressControl.value}.${this.HostAddressControl.value}`;
  }

  this.nideState.SecureHost(host);
}

/**
 * Set organizational values on the state
 */
public SetOrgDetails() {
  this.State.Loading = true;
}

//  Helpers

  /**
   * Setup detial form controls
   */
  protected setupForm(): void {
    this.HostForm = new FormGroup({
      hostAddressControl: new FormControl ('', [Validators.required]),
      rootDomainControl: new FormControl ('')
    });

    this.onFormChanges();
  }

  /**
   * Monitor form changes
   */
  protected onFormChanges(): void {
    this.RootDomainControl.valueChanges.subscribe((val: any) => {
    });

    this.HostAddressControl.valueChanges.subscribe((val: string) => {
      this.hostValidity();
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
   * Check is host address is valid
   */
  protected hostValidity() {
    this.ValidHost = false;
    const host = this.HostAddressControl.value;

    if (this.State.HostFlow === 'private' && host && host.split('.').length >= 3) {
      this.ValidHost = true;
      this.Subdomain = host.split('.')[0];
    } else if (this.State.HostFlow === 'shared' && host && host.length > 0) {
      this.ValidHost = true;
    }
  }

  /**
   * When state values change
   */
  protected stateChanged(): void {

    this.hostValidity();

    if (this.State.Host) {
      this.RootDomainControl.setValue([this.State.Host.split('.')[1], this.State.Host.split('.')[2]].join('.'));

      this.HostAddressControl.setValue(this.State.Host.split('.')[0] || '');

      setTimeout(() => this.HostForm.updateValueAndValidity());
    }
  }
}
