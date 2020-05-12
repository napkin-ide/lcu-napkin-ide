import { Component, OnInit, Input } from '@angular/core';
import { JourneyContentTypes } from '../../../state/journeys/journeys.state';

@Component({
  selector: 'lcu-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.scss']
})
export class JourneyCardComponent implements OnInit {

  /**
   * the individual journey data to be displayed in the card
   */
  // tslint:disable-next-line
  protected _journeyData: any;

  @Input('journey-data')
  set JourneyData(val: any) {
    this._journeyData = val;
  }
  get JourneyData(): any {
    return this._journeyData;
  }

  get JourneyContentTypes(): any {
    return JourneyContentTypes;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
