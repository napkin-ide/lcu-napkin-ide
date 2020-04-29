import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
  NapkinIDESetupStepTypes,
  BillingPlanOption,
} from '@napkin-ide/lcu-napkin-ide-common';
import { LCUServiceSettings } from '@lcu/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  /**
   * The plan lookup that is passed in via params
   */
  protected planGroupID: any;

  /**
   * The plan ID to pass to stripe
   */
  protected planID: any;

  protected get stripePublicKey(): string {
    const stateCfg: any = (window as any).LCU.State;

    return stateCfg && stateCfg.Stripe ? stateCfg.Stripe.PublicKey : '';
  }

  //  Properties
  public BillingForm: FormGroup;

  // public productPlan: any;

  public State: UserBillingState;

  /**
   * The Plan that is displayed on the side
   */
  public SelectedPlan: BillingPlanOption;

  /**
   * Error displayed by stripe
   */
  public StripeError: string;

  public StripeValid: boolean;

  public NapkinIDESetupStepTypes = NapkinIDESetupStepTypes;

  /**
   * Whether or not the user has accepted the Terms of Service
   */
  public AcceptedTOS: boolean;
  /**
   * Whether or not the user has accepted the Enterprise Agreement
   */
  public AcceptedEA: boolean;

  /**
   * List of plan Groups
   */

  public PlanGroups: Array<string>;

  /**
   * An array of the intervals to pass to the Interval Toggle
   */
  public Intervals: string[];

  public stripeCardNumber: any;
  public stripeCardExpiry: any;
  public stripeCardCvc: any;

  public SelectedInterval: string;

  public SelectedPlanGroupPlans: BillingPlanOption[];

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userBillState: UserBillingStateContext,
    protected lcuSettings: LCUServiceSettings,
    protected cdr: ChangeDetectorRef,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}

  //  Life Cycle
  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.planGroupID = params.get('id');
    });
    this.setupForms();
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;
      // console.log('billing state: ', this.State);
      // console.log('Plan id', this.planID);
      this.stateChanged();
    });

  }

  public ngAfterViewInit(): void {}

  public ngAfterViewChecked(): void {
    this.setupStripe();
  }

  //  API methods

  public SubmitBilling(event: Event) {
    this.State.Loading = true;

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

  public ToggleChanged(toggleSelected: any): void {
   
    // false === Annually
    // true === Monthly
    // console.log("toggle changed: ", toggleSelected);
    this.State.Plans.forEach((plan: BillingPlanOption) => {
      if (
        this.SelectedPlan.PlanGroup === plan.PlanGroup &&
        plan.Interval === toggleSelected.value
      ) {
        this.SelectedPlan = plan;
        this.planID = this.SelectedPlan.Lookup;
        // console.log("Toggled to: ", this.SelectedPlan);
      }
    });
  }

  public GoBack() {
    this.router.navigate(['']);
  }

  public TOSChanged(event: any) {
    // console.log('TOS: ', event);
    this.AcceptedTOS = event.checked;
  }
  public EAChanged(event: any) {
    // console.log('EA: ', event);
    this.AcceptedEA = event.checked;
  }

  public IsButtonDisabled(): boolean {
    if (
      this.AcceptedEA &&
      this.AcceptedTOS &&
      this.StripeValid &&
      this.BillingForm.value.userName &&
      this.SelectedInterval
    ) {
      return false;
    } else {
      return true;
    }
  }

  //  Helpers
  protected handleCardChanged(event: any) {
    if (event.error) {
      this.StripeError = event.error.message;

      this.StripeValid = false;
    } else if (event.complete) {
      this.StripeError = '';

      this.StripeValid = true;
    }
  }

  protected handleStripePaymentMethodCreated(result: any) {
    if (result.error) {
      this.StripeError = result.error;
    } else {
      this.StripeError = '';
      // console.log('Billing Form: ', this.BillingForm);
      this.userBillState.CompletePayment(
        result.paymentMethod.id,
        this.BillingForm.value.userName,
        this.SelectedPlan.Lookup
      );
    }
  }

  protected setupForms() {
    this.BillingForm = this.formBldr.group({
      prodPlan: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
    });

    this.StripeValid = false;
  }

  protected setupStripe() {
    if (!this.stripe) {
      // Your Stripe public key
      this.stripe = Stripe(this.stripePublicKey);
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
              color: 'black',
            },

            '::placeholder': {
              color: 'grey',
            },

            ':focus::placeholder': {
              color: 'black',
            },
          },
          invalid: {
            color: '#FA755A',
            ':focus': {
              color: '#FA755A',
            },
          },
          '::placeholder': {
            color: 'grey',
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
        color: 'black',
        fontWeight: 600,
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        ':focus': {
          color: 'black',
        },

        '::placeholder': {
          color: 'grey',
        },

        ':focus::placeholder': {
          color: 'black',
        },
      },
      invalid: {
        color: '#FA755A',
        ':focus': {
          color: '#FA755A',
        },
        '::placeholder': {
          color: 'grey',
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
    
    this.assignGroupIntervals();
    
    this.determineCheckboxes();
    // console.log("planID =", this.planID);
    // if a plan has been passed in via param set the selected plan accordingly
    this.findPlan();
    this.buildSelectedPlanGroupPlans();
    
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    // this.cdr.detectChanges();
    this.determinePaymentStatus();
    
  }
  protected assignGroupIntervals(){
    if (this.State.Plans) {
    this.PlanGroups = new Array<string>();
      this.Intervals = new Array<string>();

      this.State.Plans.forEach((plan: BillingPlanOption) => {
        if (!this.PlanGroups.includes(plan.PlanGroup)) {
          this.PlanGroups.push(plan.PlanGroup);
        }
        if(!this.Intervals.includes(plan.Interval)){
          this.Intervals.push(plan.Interval);
        }
      });

      // console.log('plan groups', this.PlanGroups);
    }
  }

  protected determineCheckboxes(){
    if (this.State.RequiredOptIns) {
      if (!this.State.RequiredOptIns.includes('ToS')) {
        this.AcceptedTOS = true;
      }
      if (!this.State.RequiredOptIns.includes('EA')) {
        this.AcceptedEA = true;
      }
    }
  }

  protected findPlan(){
    if (this.planGroupID && this.State.Plans && !this.SelectedPlan) {
      this.SelectedPlan = this.State.Plans.find(
        (p: BillingPlanOption) => p.PlanGroup === this.planGroupID
      );
      // console.log('SELECTED PLAN:', this.SelectedPlan);
    }
  }

  protected buildSelectedPlanGroupPlans(){
    if (!this.SelectedPlanGroupPlans && this.State.Plans){
      this.SelectedPlanGroupPlans = new Array<BillingPlanOption>();
      this.SelectedPlanGroupPlans= this.State.Plans.filter((plan: BillingPlanOption) => plan.PlanGroup === this.SelectedPlan.PlanGroup);
      // console.log("SPGP:", this.SelectedPlanGroupPlans);
    }
  }

  protected determinePaymentStatus(){
    if (this.State.PaymentStatus) {
      // console.log('Payment Status', this.State.PaymentStatus);
      if (this.State.PaymentStatus.Code === 101) {
        this.stripe
          .confirmCardPayment('requires_action')
          .then(function(result: any) {
            if (result.error) {
              // Display error message in  UI.
              this.StripeError = this.State.PaymentStatus.Message;
              // The card was declined (i.e. insufficient funds, card has expired, etc)
            } else {
              // Show a success message to your customer
              this.paymentSuccess();
            }
          });
      } else if (this.State.PaymentStatus.Code === 1) {
        this.StripeError = this.State.PaymentStatus.Message;
      } else if (this.State.PaymentStatus.Code === 0) {
        this.paymentSuccess();
      } else {
        // TODO: What to do in case of other errors
      }
    }
  }

  // protected getSaving(){
  //   let temp = this.State.Plans.filter(plan => plan.PlanGroup === this.SelectedPlan.PlanGroup);
  //   let Saving = temp[0].Price
  //   // console.log("Other plan interval:", this.OtherPlan);
  //   this.OtherIntervalPrice = this.OtherPlan.Price;
  //   this.Saving
  // }
  /**
   * When the payment returns Successfully
   */
  protected paymentSuccess(): void {
    // console.log("selected plan on pay:", this.SelectedPlan)
    this.router.navigate(['complete', this.SelectedPlan.Lookup]);
  }
}
