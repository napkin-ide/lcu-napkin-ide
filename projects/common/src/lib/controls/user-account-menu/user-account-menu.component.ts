import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-user-account-menu',
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss']
})
export class UserAccountMenuComponent implements OnInit {

  /**
   * The users email to display in the menu
   */
  @Input('user-email') UserEmail: string;

  /**
   * Emits that the logout button has been clicked
   */
  @Output('logout-clicked') LogoutClicked: EventEmitter<any>;

  constructor() {
    this.LogoutClicked = new EventEmitter<any>();
    this.UserEmail = "Guest";
   }

  ngOnInit(): void {
  }
/**
 * Called when Log out button has been clicked
 */
  public Logout(){
    this.LogoutClicked.emit();
  }

}
