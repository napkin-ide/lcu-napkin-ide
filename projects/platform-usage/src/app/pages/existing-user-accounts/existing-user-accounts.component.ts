import { Component, OnInit } from '@angular/core';
import { Constants } from 'projects/platform-usage/src/lib/utils/constants';
import { UserInfoModel } from 'projects/common/src/lcu.api';

@Component({
  selector: 'app-existing-user-accounts',
  templateUrl: './existing-user-accounts.component.html',
  styleUrls: ['./existing-user-accounts.component.scss']
})
export class ExistingUserAccountsComponent implements OnInit {

  public UserData: Array<UserInfoModel>;

  public DisplayedColumns: Array<string>;

  constructor() { 
    this.UserData = Constants.USER_DATA;
    this.DisplayedColumns = ['Email', 'Username', 'FreeTrialSignUp', 'ExpirationDate', 'PaidSignUpDate'];
  }

  ngOnInit() {
    console.log("UserData",Constants.USER_DATA);

  }

}
