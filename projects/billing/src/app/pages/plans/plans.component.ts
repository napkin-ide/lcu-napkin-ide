import { Component, OnInit } from '@angular/core';
import { UserBillingStateContext, BillingPlanOption } from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lcu-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {


  public State: any;

  public ShowButton: boolean;

  public PlanGroups: Array<BillingPlanOption>;

  constructor(
    protected userBillState: UserBillingStateContext,
    protected route: ActivatedRoute,
    protected router: Router) {
      this.ShowButton = true;
     }

  public ngOnInit() {
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;

      console.log('Plans: ', this.State.Plans);

      this.stateChanged();
    });

  }

  public BuyNowClicked(plan: any) {
    console.log('Buy Now Clicked:', plan);
    this.router.navigate(['plan', plan.Lookup]);

  }

  protected stateChanged(): void {
    console.log('state plan page = ', this.State);
    // TODO below code causes infinite loop
    // if(!this.State.Loading && this.State.PaymentStatus.Code === 0){
    //   this.userBillState.ResetState();
    //   console.log("State after resetting state: ", this.State);
    // }

    if (this.State.Plans) {
      this.PlanGroups = new Array<BillingPlanOption>();
      this.State.Plans.forEach((plan: BillingPlanOption) => {
        if (plan.Interval === 'month') {
          this.PlanGroups.push(plan);
        }
      });
      console.log('plan groups', this.PlanGroups);
    }
  }

}
