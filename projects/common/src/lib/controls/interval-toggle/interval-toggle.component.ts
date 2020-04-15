import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-interval-toggle',
  templateUrl: './interval-toggle.component.html',
  styleUrls: ['./interval-toggle.component.scss']
})
export class IntervalToggleComponent implements OnInit {

  public ToggleValue: boolean;
/**
 * The current interval selected
 */
  @Input('current-interval') CurrentInterval: string;

  /**
   * List of intervals
   */
  @Input('intervals') Intervals: string[];

  // @Input('plans')Plans: BillingPlanOption[];

  @Output('interval-selected') IntvervalSelected: EventEmitter<string>;


  constructor() { 
    this.IntvervalSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    if(this.CurrentInterval){
      if(this.CurrentInterval === this.Intervals[1]){
        this.ToggleValue = true;
      }
      else{
        this.ToggleValue = false;
      }
    }
    else{
      this.ToggleValue = false;
    }
    console.log("Toggle Value: ", this.ToggleValue)
  }

  public ToggleChanged(event: any): void {

    let toggleSelected: string;
    if (event.checked === true) {
      toggleSelected = this.Intervals[1];
    } else {
      toggleSelected = this.Intervals[0];
    }
    this.IntvervalSelected.emit(toggleSelected);
    // false === Annually
    // true === Monthly
    // console.log("toggle changed: ", event.checked);
  }

}
