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
   * All the plans from the state
   */
  @Input('all-plans') AllPlans: BillingPlanOption[];

  /**
   * The Featured Plan group to display the **Most Popular tag**
   */

  @Input('featured-plan-group') FeaturedPlanGroup: string;

  /**
   * an array of the intervals to display in the toggle
   */
  @Input('intervals') Intervals: string[];

/**
 * The plan to be displayed
 */
  @Input('plan') Plan: BillingPlanOption;

  /**
   * The plan groups to key off of the indexes
   */
  @Input('plan-groups') PlanGroups: Array<string>;

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
  @Output('interval-toggled') IntervalToggled: EventEmitter<string>;

  constructor() { 
    this.BuyNowClicked = new EventEmitter<any>();
    this.IntervalToggled = new EventEmitter<string>();
  }

  ngOnInit() {
    // console.log('Plan from plan card: ',this.Plan);
  }

  public BuyNow(plan: any){
    console.log("Plan selected from plan page: ", plan);
    this.BuyNowClicked.emit(plan);
  }

  public IntervalSelected(interval: string){
    this.IntervalToggled.emit(interval);
    
  }
  

}
