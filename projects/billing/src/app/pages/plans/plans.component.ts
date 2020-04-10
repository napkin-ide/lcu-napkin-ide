import { Component, OnInit } from '@angular/core';
import { UserBillingStateContext } from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lcu-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {


  public State: any;

  public ShowButton: boolean;

  constructor(
    protected userBillState: UserBillingStateContext,
    protected route: ActivatedRoute,
    protected router: Router) {
      this.ShowButton = true;
     }

  ngOnInit() {
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;
      this.stateChanged();
    });
    console.log('Plans: ',this.State.Plans);
  }

  public BuyNowClicked(plan: any){
    console.log("Buy Now Clicked:", plan);
    this.router.navigate(['plan', plan.Lookup]);
    
  }

  protected stateChanged(): void{
    console.log("state = ", this.State);
  }

}
