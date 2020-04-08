import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Input,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
  NapkinIDESetupStepTypes,
  Constants
} from '@napkin-ide/lcu-napkin-ide-common';
import { Guid, LCUServiceSettings } from '@lcu/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

declare var Stripe: any;

@Component({
  selector: 'lcu-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: []
})
export class BillingComponent implements OnInit, AfterViewInit, AfterViewChecked {
  //  Fields

  @ViewChild('cardElement') cardElement: ElementRef;

  protected stripeCard: any;
  /**
   * The stripe card number to be sent to payment method
   */
  protected stripeCardNumber: any;
  /**
   * The expiration date of the card user in payment method
   */
  protected stripeCardExpiry: any;
  /**
   * The cvc number to be sent to payment method
   */
  protected stripeCardCvc: any;

  protected stripe: any;

  //  Properties
  public BillingForm: FormGroup;

  public productPlan: any;

  public State: UserBillingState;

  public StripeError: string;

  public NapkinIDESetupStepTypes = NapkinIDESetupStepTypes;

  public CustomerName: string;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userBillState: UserBillingStateContext,
    protected lcuSettings: LCUServiceSettings,
    protected cdr: ChangeDetectorRef
  ) {
    this.State = {};
    this.productPlan = '';

    // this.setFieldToggles();
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupForms();
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;
      console.log("billing state: ", this.State)
      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {
    // setTimeout(()=>{
    //   this.setupStripe();
    // },2000)

  }
  public ngAfterViewChecked(): void {
    this.setupStripe();
  }


  //  API methods
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
      .then((result: any) => {
        this.handleStripePaymentMethodCreated(result);
      });
  }

  //  Helpers
  protected handleCardChanged(event: any) {
    if (event.error) {
      this.StripeError = event.error.message;
    } else {
      this.StripeError = '';
    }
  }

  protected handleStripePaymentMethodCreated(result: any) {
    if (result.error) {
      this.StripeError = result.error;
    } else {
      this.StripeError = '';
      console.log("Billing Form: ", this.BillingForm)
      this.userBillState.CompletePayment(result.paymentMethod.id, this.BillingForm.value.userName, this.BillingForm.value.prodPlan);
    }
  }


  /**
   * Setup toggled fields
   */
  // protected setFieldToggles(): void {
  //   this.HideAppId = this.HideAuthKey = this.HideTenantId = this.HideSubId = true;
  // }

  protected setupForms() {
    this.BillingForm = this.formBldr.group({
      prodPlan: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required])
    });
  }

  protected setupStripe() {
    console.log("Stripe = ", this.stripe)
    if (!this.stripe) {
      // Your Stripe public key
      this.stripe = Stripe(this.lcuSettings.Settings.Stripe.PublicKey);

      const elements = this.stripe.elements();

      this.stripeCard = elements.create('card', {
        'style': {
          'base': {
            color: 'black',
            fontWeight: 600,
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',

            ':focus': {
              color: '#424770',
            },

            '::placeholder': {
              color: 'black',
            },

            ':focus::placeholder': {
              color: '#CFD7DF',
            },
          },
          'invalid': {
            color: '#fff',
            ':focus': {
              color: '#FA755A',
            },
          },
          '::placeholder': {
            color: 'black',
          },
        }
      });
      this.stripeCard.mount(document.getElementById('card-element'));

      this.stripeCard.addEventListener('change', (event: any) =>
        this.handleCardChanged(event)
      );
    }
  }

  // protected setupStripeElements():void{
  //   const elements = this.stripe.elements();
  //   var elementStyles = {
  //     base: {
  //       color: '#fff',
  //       fontWeight: 600,
  //       fontFamily: 'Arial, sans-serif',
  //       fontSize: '16px',
  //       fontSmoothing: 'antialiased',

  //       ':focus': {
  //         color: '#424770',
  //       },

  //       '::placeholder': {
  //         color: '#9BACC8',
  //       },

  //       ':focus::placeholder': {
  //         color: '#CFD7DF',
  //       },
  //     },
  //     invalid: {
  //       color: '#fff',
  //       ':focus': {
  //         color: '#FA755A',
  //       },
  //       '::placeholder': {
  //         color: '#FFCCA5',
  //       },
  //     },
  //   };

  //   var elementClasses = {
  //     focus: 'focus',
  //     empty: 'empty',
  //     invalid: 'invalid',
  //   };

  //   this.stripeCardNumber = elements.create('cardNumber', {
  //     style: elementStyles,
  //     classes: elementClasses,
  //   });
  //   this.stripeCardNumber.mount('#card-number');

  //   this.stripeCardExpiry = elements.create('cardExpiry', {
  //     style: elementStyles,
  //     classes: elementClasses,
  //   });
  //   this.stripeCardExpiry.mount('#card-expiry');

  //   this.stripeCardCvc = elements.create('cardCvc', {
  //     style: elementStyles,
  //     classes: elementClasses,
  //   });
  //   this.stripeCardCvc.mount('#card-cvc');

  // }

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    if(this.State.PaymentStatus){
      console.log(this.State.PaymentStatus)
      if(this.State.PaymentStatus.Code === 101){
        console.log("Status is 101 Do Step 8")
      }
    }

    // if (this.State.SetupStep === UserManagementStepTypes.Complete) {
    // }
  }
}
