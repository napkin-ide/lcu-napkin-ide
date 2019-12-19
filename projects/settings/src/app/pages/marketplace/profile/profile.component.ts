import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-marketplace-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MarketplaceProfileComponent implements OnInit {

  public ProfileOptions: any;
  public ActiveOptionValue: string;

  constructor() {
    this.ProfileOptions = [
      { Title: 'My Info', Active: false, Value: 'myInfo' },
      { Title: 'Password', Active: false, Value: 'password' },
      { Title: 'Subscriptions', Active: false, Value: 'subscriptions' }
    ];
    this.SetActiveOption('myInfo');
  }

  ngOnInit() {
  }

  public SetActiveOption(value) {
    this.ProfileOptions.forEach((op, idx) => {
      if (op.Value === value) {
        this.ProfileOptions[idx].Active = true;
        this.ActiveOptionValue = this.ProfileOptions[idx].Value;
      } else {
        this.ProfileOptions[idx].Active = false;
      }
    });
  }

}
