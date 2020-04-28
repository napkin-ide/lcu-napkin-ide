import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserBillingStateContext,
  UserBillingState,
  NapkinIDESetupStepTypes,
} from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingPlanOption } from 'projects/common/src/lcu.api';

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
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserBillingState;

  protected planID: string;

  public SelectedPlan: BillingPlanOption;

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
    this.calcDate();
  }

  //  API methods

  //  Helpers
  protected stateChanged() {
    // console.log('state success page: ', this.State);

    if (!this.State.PaymentStatus) {
      this.router.navigate(['']);
    }
    if (this.planID && this.State.Plans) {
      this.SelectedPlan = this.State.Plans.find(
        (p: any) => p.Lookup === this.planID
      );
      // console.log('SELECTED PLAN:', this.SelectedPlan);
    }
  }
  protected calcDate(){
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    // console.log("end date:", endDate);

    let tempDate = endDate.toString().split(" ");

    // console.log("tempDate:", tempDate);

    this.FreeTrialEndDate = tempDate[0] + " " +tempDate[1] + " " + tempDate[2];

  }
}
