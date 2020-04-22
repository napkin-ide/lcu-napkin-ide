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

  public ShowToggle: boolean;

  public Intervals: string[];
/**
 * List the plan group names for the plan card
 */
  public PlanGroups: Array<string>;
/**
 * list of plans to display on the page excluding duplicate plan with different billing cycles
 */
  public DisplayedPlans: Array<BillingPlanOption>

  constructor(
    protected userBillState: UserBillingStateContext,
    protected route: ActivatedRoute,
    protected router: Router) {
      this.ShowButton = true;
      this.ShowToggle = true;
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

  public IntervalToggled(interval: string, planToChange: BillingPlanOption){
    this.State.Plans.forEach((plan: BillingPlanOption) =>{
      if(planToChange.PlanGroup === plan.PlanGroup && plan.Interval === interval){
        //remove plan from displayedplans
        this.DisplayedPlans.splice(this.DisplayedPlans.indexOf(planToChange),1,plan);
      }
      console.log("New plan: ", this.DisplayedPlans)
    })
  }

  protected stateChanged(): void {
    console.log('state plan page = ', this.State);
    // TODO below code causes infinite loop
    // if(!this.State.Loading && this.State.PaymentStatus.Code === 0){
    //   this.userBillState.ResetState();
    //   console.log("State after resetting state: ", this.State);
    // }

    if (this.State.Plans) {
      this.PlanGroups = new Array<string>();
      this.Intervals = new Array<string>();
      this.DisplayedPlans = new Array<BillingPlanOption>();
      this.State.Plans.forEach((plan: BillingPlanOption) => {
        
        if (this.DisplayedPlans.filter(e => e.PlanGroup === plan.PlanGroup).length === 0) {
          this.DisplayedPlans.push(plan);
        }
        if(!this.PlanGroups.includes(plan.PlanGroup)){
          this.PlanGroups.push(plan.PlanGroup)
        }
        if(!this.Intervals.includes(plan.Interval)){
          this.Intervals.push(plan.Interval)
        }
      });
      console.log('displayed plan groups', this.DisplayedPlans);
    }
  }

}
