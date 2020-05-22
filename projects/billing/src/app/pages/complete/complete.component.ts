import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
} from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingPlanOption } from 'projects/common/src/lcu.api';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'lcu-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  animations: [],
})
export class CompleteComponent implements OnInit {
  //  Fields

  //  Properties

  // tslint:disable-next-line:no-input-rename
  // @Input('setup-step-types')
  // public SetupStepTypes: NapkinIDESetupStepTypes;
/**
 * State being passed in to the complete page
 */
  // tslint:disable-next-line:no-input-rename
  // @Input('state')

  public HeaderName: string;

  /**
   * The user billing state to determine payment status
   */
  public State: UserBillingState;

  /**
   * passed in via routes, determines which plan to display in the order summary
   */
  protected planID: string;

  /**
   * The plan based on the id passed in, info to display in order summary
   */
  public SelectedPlan: BillingPlanOption;

  /**
   * the date that is calculated form point in time when 
   * 
   * this is run to determine when free trial will end
   */
  public FreeTrialEndDate: string;

  //  Constructors
  constructor(
    protected userMgr: UserBillingStateContext,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}

  //  Life Cycle
  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.planID = params.get('id');
    });
    this.userMgr.Context.subscribe((state: UserBillingState) => {
      this.State = state;

      this.stateChanged();
    });
    if(this.SelectedPlan.TrialPeriodDays){
      this.calcDate();
    }
  }

  //  API methods

  //  Helpers
  protected stateChanged() {
    console.log('state success page: ', this.State);
//avoid error if the user trys to manually navigate to the complete page
    if (!this.State.PaymentStatus) {
      this.router.navigate(['']);
    }
    // console.log("PlanID: ", this.planID);
    if (this.planID && this.State.Plans) {
      this.SelectedPlan = this.State.Plans.find(
        (p: any) => p.Lookup === this.planID
      );
      // console.log('purchased PLAN:', this.SelectedPlan);
    }
    if(this.SelectedPlan){
      this.convertName();
    }
  }

  /**
   * Calculates the free trial expiration date from point in time method is run
   */
    protected calcDate(){
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + this.SelectedPlan.TrialPeriodDays);
    // console.log("end date:", endDate);

    let tempDate = endDate.toString().split(" ");

    // console.log("tempDate:", tempDate);

    this.FreeTrialEndDate = tempDate[0] + " " +tempDate[1] + " " + tempDate[2];

  }

  protected convertName(){
    //   console.log("pipe =", value)
    if(this.SelectedPlan.LicenseType === "lcu"){
        this.HeaderName ="Fathym Low Code Framework";
    }
    else if(this.SelectedPlan.LicenseType === "forecast"){
        this.HeaderName = "Fathym Forecaster API";
    }
  }
}
