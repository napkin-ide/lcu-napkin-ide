import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserManagementState, UserManagementStateContext, UserInfoModel } from '@napkin-ide/lcu-napkin-ide-common';


@Component({
  selector: 'nide-ide-top-bar',
  templateUrl: './ide-top-bar.component.html',
  styleUrls: ['./ide-top-bar.component.scss']
})
export class IdeTopBarComponent implements OnInit {


  public State: UserManagementState;

  public UsersInfo: UserInfoModel;


  protected SideBarOpened: boolean = false;


  @Input() public isHandset: boolean = false;

  @Output() public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected usersCtxt: UserManagementStateContext) { }

  public ngOnInit(): void { 
    this.GetUserInfo();
  }
  ngAfterContentInit(): void {
    // this.usersCtxt.Start;
   
    this.usersCtxt.Context.subscribe((state: any) => {
      this.State = state;
      if (this.State) {
        this.stateChanged();
      }
    });

  }

 

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }


  public LogoutClicked(event: any){
    //TODO hook up to auth
    console.log("Logout clicked: ", event);
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
