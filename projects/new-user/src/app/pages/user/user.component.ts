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
import { Guid, LCUServiceSettings } from '@lcu/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

declare var Stripe: any;

@Component({
  selector: 'lcu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: []
})
export class UserComponent implements OnInit, AfterViewInit {
  //  Fields
  protected stripeCard: any;

  protected stripe: any;

  //  Properties
  public BillingForm: FormGroup;

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

  public State: UserManagementState;

  public StripeError: string;

  public UserSetupStepTypes = UserSetupStepTypes;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMngState: UserManagementStateContext,
    protected lcuSettings: LCUServiceSettings,
    protected cdr: ChangeDetectorRef
  ) {
    this.State = {};

    this.setFieldToggles();
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupForms();

    this.userMngState.Context.subscribe((state: any) => {
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

  public StepperChanged(event: StepperSelectionEvent) {
    if (event.selectedIndex === 2) {
      this.setupStripe();
    }
  }

  public SubmitBilling(event: Event) {
    event.preventDefault();

    this.stripe
      .createPaymentMethod({
        type: 'card',
        card: this.stripeCard,
        billing_details: {
          email: this.State.Username
        }
      })
      .then(this.handleStripePaymentMethodCreated);
  }

  //  Helpers
  protected handleCardChanged(event: any) {
    if (event.error) {
      this.StripeError = event.error.message;
    } else {
      this.StripeError = '';
    }
  }

  protected handleStripePaymentMethodCreated(result: any, email: string) {
    if (result.error) {
      this.StripeError = result.error;
    } else {
      this.StripeError = '';

      this.userMngState.SetPaymentMethod(result.paymentMethod.id);
    }
  }


  /**
   * Setup toggled fields
   */
  protected setFieldToggles(): void {
    this.HideAppId = this.HideAuthKey = this.HideTenantId = this.HideSubId = true;
  }

  protected setupForms() {
    this.BillingForm = this.formBldr.group({});

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
  }

  protected setupStripe() {
    if (!this.stripe) {
      // Your Stripe public key
      this.stripe = Stripe(this.lcuSettings.Settings.Stripe.PublicKey);

      const elements = this.stripe.elements();

      this.stripeCard = elements.create('card');

      this.stripeCard.mount('#card-element');

      this.stripeCard.addEventListener('change', (event: any) =>
        this.handleCardChanged(event)
      );
    }
  }

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    // if (this.State.Step === UserManagementStepTypes.Complete) {
    // }
  }
}
