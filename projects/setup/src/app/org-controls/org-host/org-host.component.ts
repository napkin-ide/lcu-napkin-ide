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
   * Host validity
   */
  public HostValid: boolean;

  /**
   * Set step types
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
   * Event for host address validity
   */
  // tslint:disable-next-line:no-output-rename
  @Output('is-host-valid')
  public IsHostValid: EventEmitter<boolean>;

  /**
   * event for subdomain change
   */
  // tslint:disable-next-line:no-output-rename
  @Output('subdomain')
  public Subdomain: EventEmitter<string>;

  /**
   * Details formgroup
   */
  public HostForm: FormGroup;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
    this.IsHostValid = new EventEmitter();
    this.Subdomain = new EventEmitter();
  }

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

  // this.nideState.SetOrganizationDetails(
  //   this.OrgDetailName.value,
  //   this.OrgDetailDesc.value,
  //   this.OrgDetailLookup.value
  // );
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
    this.HostValid = false;

    const host = this.HostAddressControl.value;

    if (this.State.HostFlow === 'private' && host && host.split('.').length >= 3) {
      this.HostValid = true;
      this.Subdomain.emit(host.split('.')[0]);
    } else if (this.State.HostFlow === 'shared' && host && host.length > 0) {
      this.HostValid = true;
    }

    this.IsHostValid.emit(this.HostValid);
  }

  /**
   * When state values change
   */
  protected stateChanged(): void {

    this.hostValidity();

    if (this.State.Host) {
      this.HostForm.controls.root.setValue([this.State.Host.split('.')[1], this.State.Host.split('.')[2]].join('.'));

      this.HostForm.controls.host.setValue(this.State.Host.split('.')[0] || '');

      setTimeout(() => this.HostForm.updateValueAndValidity());
    }
  }

}
