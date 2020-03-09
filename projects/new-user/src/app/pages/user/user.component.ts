import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import {
  UserManagementStateContext,
  UserManagementState,
  UserSetupStepTypes,
  Constants
} from '@napkin-ide/lcu-napkin-ide-common';
import { Guid } from '@lcu/common';

@Component({
  selector: 'lcu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: []
})
export class UserComponent implements OnInit, AfterViewInit {
  //  Fields

  //  Properties
  public DetailsForm: FormGroup;

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

  public InfraForm: FormGroup;

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

  public secondFormGroup: FormGroup;

  public State: UserManagementState;

  public UserSetupStepTypes = UserSetupStepTypes;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMngState: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
  ) {
    this.State = {};

    this.setFieldToggles();
  }

  //  Life Cycle
  public ngOnInit() {
    this.DetailsForm = this.formBldr.group({
      orgDetailName: new FormControl('', [Validators.required]),
      orgDetailDesc: new FormControl('', [Validators.required]),
      orgDetailLookup: new FormControl('', [Validators.required])
    });

    this.InfraForm = new FormGroup({
      azureTenantId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator)
        ]),
        updateOn: 'change'
      }),
      azureAppId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator)
        ]),
        updateOn: 'change'
      }),
      azureAppAuthKey: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      azureSubId: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(Guid.GuidValidator)
        ]),
        updateOn: 'change'
      })
    });

    this.secondFormGroup = this.formBldr.group({
      secondCtrl: ['', Validators.required]
    });

    this.userMngState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {}

  //  API methods
  public OpenHelpPdf() {
    window.open(Constants.HELP_PDF);
  }

  public SetUserSetupStep(step: UserSetupStepTypes) {
    this.State.Loading = true;

    this.userMngState.SetUserSetupStep(step);
  }

  //  Helpers

  /**
   * Setup toggled fields
   */
  protected setFieldToggles(): void {
    this.HideAppId = this.HideAuthKey = this.HideTenantId = this.HideSubId = true;
  }

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    // if (this.State.Step === UserManagementStepTypes.Complete) {
    // }
  }
}
