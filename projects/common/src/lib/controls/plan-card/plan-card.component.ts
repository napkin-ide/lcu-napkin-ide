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
   * The Featured Plan group to display the **Most Popular tag**
   */

  @Input('featured-plan-group') FeaturedPlanGroup: string;

/**
 * The plan to be displayed
 */
  @Input('plan') Plan: BillingPlanOption;

  /**
   * Whether or not to display the buy now button (Button for plan page only)
   */
  @Input('show-button') ShowButton: boolean;

  /**
   * Event emitted when the button has been clicked
   */
  @Output('buy-now-clicked') BuyNowClicked: EventEmitter<any>;

  constructor() { 
    this.BuyNowClicked = new EventEmitter();
  }

  ngOnInit() {
    // console.log('Plan from plan card: ',this.Plan);
  }

  public BuyNow(plan: any){
    console.log("Plan selected from plan page: ", plan);
    this.BuyNowClicked.emit(plan);
  }
  

}
