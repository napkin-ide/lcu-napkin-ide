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
  UserManagementStateContext,
  UserManagementState,
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

  public season: any;

  public State: UserManagementState;

  public StripeError: string;

  public NapkinIDESetupStepTypes = NapkinIDESetupStepTypes;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMngState: UserManagementStateContext,
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
    this.userMngState.Context.subscribe((state: any) => {
      this.State = state;

      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {
    // setTimeout(()=>{
    //   this.setupStripe();
    // },2000)
    
  }
  public ngAfterViewChecked(): void{
    // this.setupStripe()
  }
  

  //  API methods
  // public OpenHelpPdf() {
  //   window.open(Constants.HELP_PDF);
  // }

  public SetUserSetupStep(step: NapkinIDESetupStepTypes) {
    this.State.Loading = true;

    this.userMngState.SetNapkinIDESetupStep(step);
  }

  public StepperChanged(event: StepperSelectionEvent) {
    if (event.selectedIndex === 0) {
      // this.setupStripe();
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

      this.userMngState.SetPaymentMethod(result.paymentMethod.id);
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
  });
  }

  protected setupStripe() {
    console.log("Stripe = ", this.stripe)
    if (!this.stripe) {
      // Your Stripe public key
      this.stripe = Stripe(this.lcuSettings.Settings.Stripe.PublicKey);

      const elements = this.stripe.elements();

      this.stripeCard = elements.create('card',{
        'style': {
          'base': {
            'fontFamily': 'Arial, sans-serif',
            'fontSize': '14px',
            'color': 'black',
            'background-color': 'whitesmoke',
          },
          'invalid': {
            'color': 'red',
          },
        }
      });
      this.stripeCard.mount(document.getElementById('card-element'));


      // this.stripeCard.mount(this.cardElement.nativeElement);
      // this.setupStripeElements();

      this.stripeCard.addEventListener('change', (event: any) =>
        this.handleCardChanged(event)
      );

    //   this.stripeCardNumber.addEventListener('change', (event: any) =>
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

    // if (this.State.SetupStep === UserManagementStepTypes.Complete) {
    // }
  }
}
