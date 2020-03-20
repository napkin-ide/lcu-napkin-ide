import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserInfoModel } from '../../models/user-info.model';

@Component({
  selector: 'lcu-user-account-sidenav',
  templateUrl: './user-account-sidenav.component.html',
  styleUrls: ['./user-account-sidenav.component.scss']
})
export class UserAccountSidenavComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) public drawer: MatSidenav;

  @Input('user-info')
  public UserInfo: UserInfoModel;

  @Output('button-clicked')
  public ButtonClicked: EventEmitter<any>;

  constructor() {
    this.ButtonClicked = new EventEmitter<any>();
  }

  public ngOnInit(): void {
    if (!this.UserInfo) {
      this.UserInfo = new UserInfoModel;
    }
    if (!this.UserInfo.Email) {
      this.UserInfo.Email = "Guest";
    }
  }

  public ToggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close()
    }
    else {
      this.drawer.open();
    }
  }
  public Logout() {
    this.ButtonClicked.emit("Logout");
  }
}
