import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserBillingStateContext } from '../../state/user-billing/user-billing-state.context';
import { BillingPlanOption } from '../../state/user-billing/user-billing.state';

@Component({
  selector: 'lcu-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {


  @Input('plan') Plan: BillingPlanOption;

  @Input('show-button') ShowButton: boolean;

  @Output('buy-now-clicked') BuyNowClicked: EventEmitter<any>;

  constructor(protected userBillState: UserBillingStateContext) { 
    this.BuyNowClicked = new EventEmitter();
  }

  ngOnInit() {
    console.log('Plan from plan card: ',this.Plan);
  }

  public BuyNow(plan: any){
    console.log("Plan selected: ", plan);
    this.BuyNowClicked.emit(plan);
  }
  // protected stateChanged(): void{
  //   console.log("state = ", this.State);
  // }

}
