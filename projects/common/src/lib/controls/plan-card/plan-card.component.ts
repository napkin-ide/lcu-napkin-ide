import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserBillingStateContext } from '../../state/user-billing/user-billing-state.context';
import { BillingPlanOption } from '../../state/user-billing/user-billing.state';

@Component({
  selector: 'lcu-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {

  /**
   * The Displayed plans from the state
   */
  @Input('displayed-plans') DisplayedPlans: BillingPlanOption[];

  /**
   * The Featured Plan group to display the **Most Popular tag**
   */

  @Input('featured-plan-group') FeaturedPlanGroup: string;

  /**
   * an array of the intervals to display in the toggle
   */
  // @Input('intervals') Intervals: string[];

/**
 * The plan to be displayed
 */
  @Input('plan') Plan: BillingPlanOption;

  /**
   * The plan groups to key off of the indexes
   */
  // @Input('plan-groups') PlanGroups: Array<string>;

  /**
   * The plans coming back from the state to display the different prices
   */
  @Input('all-plans') AllPlans: Array<BillingPlanOption>;

  /**
   * Whether or not to display the buy now button (Button for plan page only)
   */
  @Input('show-button') ShowButton: boolean;
/**
 * Whether or not to display the toggle button
 */
  @Input('show-toggle') ShowToggle: boolean;

  /**
   * Event emitted when the button has been clicked
   */
  @Output('buy-now-clicked') BuyNowClicked: EventEmitter<any>;

  /**
   * Event emitted when the toggle has been toggled
   */
  // @Output('interval-toggled') IntervalToggled: EventEmitter<string>;

  /**
   * The price of the other plan that is not displayed
   */
  public OtherIntervalPrice: any;

  public OtherPlan: BillingPlanOption;

  public PlanFeatures: string[];
  public PlanGroups: Array<string>;


  constructor() { 
    this.BuyNowClicked = new EventEmitter<any>();
    // this.IntervalToggled = new EventEmitter<string>();
  }

  ngOnInit() {
    // console.log('All plans: ',this.AllPlans);
    // this.getOtherIntervalPrice();
  }
  ngOnChanges(){
    this.determinePlanGroups()
    this.getOtherIntervalPrice();
    this.extractPlanFeatures();
  }
/**
 * 
 * Passes the selected plan back to the plans component to determine which plan to display
 * 
 * in the billing component
 */
  public BuyNow(plan: any){
    // console.log("Plan selected from plan page: ", plan);
    this.BuyNowClicked.emit(plan);
  }

  // public IntervalSelected(interval: string){
  //   this.IntervalToggled.emit(interval); 
  // }

  protected getOtherIntervalPrice(){
    let temp = this.AllPlans.filter(plan => plan.Interval !== this.Plan.Interval && plan.PlanGroup === this.Plan.PlanGroup);
    this.OtherPlan = temp[0];
    // console.log("Other plan interval:", this.OtherPlan);
    this.OtherIntervalPrice = this.OtherPlan.Price;
  }

  protected extractPlanFeatures(){
    if(this.Plan.PlanFeatures){
      this.PlanFeatures = this.Plan.PlanFeatures.split("|");
    }
  }

  protected determinePlanGroups(){
    if (this.AllPlans) {
    this.PlanGroups = new Array<string>();
      // this.Intervals = new Array<string>();

      this.AllPlans.forEach((plan: BillingPlanOption) => {
        if (!this.PlanGroups.includes(plan.PlanGroup)) {
          this.PlanGroups.push(plan.PlanGroup);
        }
        // if(!this.Intervals.includes(plan.Interval)){
        //   this.Intervals.push(plan.Interval);
        // }
      });

      // console.log('plan groups', this.PlanGroups);
    }
  }
  

}
