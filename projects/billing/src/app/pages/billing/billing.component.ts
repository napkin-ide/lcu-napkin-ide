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
  AfterViewChecked,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
  NapkinIDESetupStepTypes,
  Constants,
  BillingPlanOption
} from '@napkin-ide/lcu-napkin-ide-common';
import { Guid, LCUServiceSettings } from '@lcu/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ActivatedRoute } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'lcu-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: [],
})
export class BillingComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  //  Fields

  @ViewChild('cardElement') cardElement: ElementRef;
  /**
   * Stripe card info
   */
  protected stripeCard: any;
  /**
   * Instance of stripe
   */
  protected stripe: any;
  /**
   * The redirect URI that the user came from to be redirected to once the payment is complete
   */
  protected redirectUri: any;

  public selectedPlan: BillingPlanOption;
/**
 * The plan lookup that is passed in via params
 */
  protected planParam: any;

  //  Properties
  public BillingForm: FormGroup;

  // public productPlan: any;

  public State: UserBillingState;

  public StripeError: string;

  public NapkinIDESetupStepTypes = NapkinIDESetupStepTypes;

  public CustomerName: string;

  public PaymentSuccessful: boolean;

  public stripeCardNumber: any;
  public stripeCardExpiry: any;
  public stripeCardCvc: any;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userBillState: UserBillingStateContext,
    protected lcuSettings: LCUServiceSettings,
    protected cdr: ChangeDetectorRef,
    protected route: ActivatedRoute
  ) {
    this.State = {};
    // this.productPlan = '';
    this.route.queryParams.subscribe(params => {
      this.redirectUri = params['param1'];  // Set redirectUri to some local property on the component
      this.planParam = params['param2'];  // Set the plan to the value of the form for prodPlan
    });
    // this.setFieldToggles();
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupForms();
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;
      console.log('billing state: ', this.State);
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
public ResetBillingStatus(){
  this.PaymentSuccessful = false;
}

  public SelectPlan(plan: any) {
    this.selectedPlan = plan;
  }

  public SubmitBilling(event: Event) {
    event.preventDefault();

    this.stripe
      .createPaymentMethod({
        type: 'card',
        // cardExpiry: this.stripeCardExpiry,
        // cardNumber: this.stripeCardNumber,
        // cardCvc: this.stripeCardCvc,
        card: this.stripeCard,
        billing_details: {
          email: this.State.Username,
        },
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
      this.userBillState.CompletePayment(
        result.paymentMethod.id,
        this.BillingForm.value.userName,
        this.selectedPlan.Lookup);
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
      userName: new FormControl('', [Validators.required]),
    });
  }

  protected setupStripe() {
    
    if (!this.stripe) {
      // Your Stripe public key
      this.stripe = Stripe(this.lcuSettings.Settings.Stripe.PublicKey);
      // this.setupStripeElements();
      const elements = this.stripe.elements();

      this.stripeCard = elements.create('card', {
        style: {
          base: {
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
          invalid: {
            color: '#fff',
            ':focus': {
              color: '#FA755A',
            },
          },
          '::placeholder': {
            color: 'black',
          },
        },
      });
      this.stripeCard.mount(document.getElementById('card-element'));

      this.stripeCard.addEventListener('change', (event: any) =>
        this.handleCardChanged(event)
      );

    //     this.stripeCardNumber.addEventListener('change', (event: any) =>
    //     this.handleCardChanged(event)
    //   );


    // this.stripeCardExpiry.addEventListener('change', (event: any) =>
    //     this.handleCardChanged(event)
    //   );

    //   this.stripeCardCvc.addEventListener('change', (event: any) =>
    //     this.handleCardChanged(event)
    //   );
    }
  }

  

  protected setupStripeElements():void{
    const elements = this.stripe.elements();
    var elementStyles = {
      base: {
        color: '#fff',
        fontWeight: 600,
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        ':focus': {
          color: '#424770',
        },

        '::placeholder': {
          color: '#9BACC8',
        },

        ':focus::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        color: '#fff',
        ':focus': {
          color: '#FA755A',
        },
        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    };

    var elementClasses = {
      focus: 'focus',
      empty: 'empty',
      invalid: 'invalid',
    };

    this.stripeCardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.stripeCardNumber.mount('#card-number');

    this.stripeCardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.stripeCardExpiry.mount('#card-expiry');

    this.stripeCardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.stripeCardCvc.mount('#card-cvc');
  }


  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    // if a plan has been passed in via param set the selected plan accordingly
    if(this.planParam){
      this.selectedPlan = this.State.Plans.find(p => p.Lookup === this.planParam);
    }

    if (this.State.PaymentStatus) {
      console.log("Payment Status",this.State.PaymentStatus)
      if (this.State.PaymentStatus.Code === 101) {
        this.stripe.confirmCardPayment('requires_action').then(function (result: any) {
          if (result.error) {
            // Display error message in  UI.
            this.StripeError = this.State.PaymentStatus.Message;
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            // Show a success message to your customer
            this.paymentSuccess();
          }
        });

      }
      else if (this.State.PaymentStatus.Code === 1) {
        this.StripeError = this.State.PaymentStatus.Message;
      }

      else {
        this.paymentSuccess();
      }
    }

    // if (this.State.SetupStep === UserManagementStepTypes.Complete) {
    // }
  }
  /**
   * When the payment returns Successfully
   */
  protected paymentSuccess(): void {
    //TODO do something
    this.PaymentSuccessful = true;
  }
}
