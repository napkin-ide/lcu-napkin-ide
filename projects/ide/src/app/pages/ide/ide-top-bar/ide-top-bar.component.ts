

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
// import { UserManagementState, UserManagementStateContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatSidenav } from '@angular/material/sidenav';
import {
  IdeStateStateManagerContext,
  UserManagementStateContext,
  UserManagementState,
  UserInfoModel
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-ide-top-bar',
  templateUrl: './ide-top-bar.component.html',
  styleUrls: ['./ide-top-bar.component.scss'],
})
export class IdeTopBarComponent implements OnInit {
  protected SideBarOpened = false;

  public UserEmail: string;

  public State: any;

  public UsersInfo: UserInfoModel;


  @Input() public isHandset = false;


  @Output() public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(
    protected ideState: IdeStateStateManagerContext,
    protected userMngState: UserManagementStateContext
  ) {}

  public ngOnInit(): void { 
    this.GetUserInfo();
  }
  ngAfterContentInit(): void {
    // this.usersCtxt.Start;
   
    this.userMngState.Context.subscribe((state: any) => {
      this.State = state;
      if (this.State) {
        this.stateChanged();
      }
      this.UserEmail = this.State.Username;
    });
  }

    // this.ideState.Context.subscribe((ideState:any) => {
    //   this.UserEmail = this.ideState.Settings.StateConfig.UsernameMock;


  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }

  public LogoutClicked(event: any) {
    // TODO hook up to auth
    console.log('Logout clicked: ', event);
    window.location.replace('.oauth/logout');
  }

  protected stateChanged(){
    console.log("State: ", this.State);
    if(!this.UsersInfo){
      this.UsersInfo = new UserInfoModel();
    }
    this.UsersInfo.Username = this.State.Username;
  }

  protected GetUserInfo(){
    console.log("State: ", this.State);
  }

}
