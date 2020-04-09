import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import { UserManagementState, UserManagementStateContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatSidenav } from '@angular/material/sidenav';
import {
  // import { IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common/lcu.api';
  IdeStateStateManagerContext,
  UserManagementStateContext,
  UserManagementState,
  IdeManagementState,
  IdeActionTypes
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-ide-top-bar',
  templateUrl: './ide-top-bar.component.html',
  styleUrls: ['./ide-top-bar.component.scss']
})
export class IdeTopBarComponent implements OnInit {


  protected SideBarOpened: boolean = false;

  public UserEmail: string;

  public State: IdeManagementState;


  @Input() public isHandset: boolean = false;

  @Output() public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected ideState: IdeStateStateManagerContext, protected userMngState: UserManagementStateContext) { }

  public ngOnInit(): void {
  }

  public ngAfterContentInit(): void {
    // this.usersCtxt.Start;

    this.ideState.Context.subscribe((state: IdeManagementState) => {
      this.State = state;

      this.State.HeaderActions = [
        {
          Text: 'Home',
          Type: IdeActionTypes.ExternalLink,
          Icon: 'home',
          Action: 'http://google.com'
        },
        {
          Text: 'Data Apps',
          Type: IdeActionTypes.Link,
          Icon: 'view_list',
          Action: 'http://google.com'
        },
        {
          Text: 'Data Flow',
          Type: IdeActionTypes.Link,
          Icon: 'account_tree',
          Action: 'http://google.com'
        },
        {
          Text: 'Buy Now',
          Type: IdeActionTypes.Modal,
          Icon: 'forward',
          Action: 'http://google.com'
        },
        {
          Text: 'Documentation',
          Type: IdeActionTypes.ExternalLink,
          Icon: 'assignment',
          Action: 'http://google.com'
        },
        {
          Text: 'Support',
          Type: IdeActionTypes.ExternalLink,
          Icon: 'help_outline',
          Action: 'http://google.com'
        }
      ];

      // this.UserEmail = this.State.Username;
    });

    // this.ideState.Context.subscribe((ideState:any) => {
    //   this.UserEmail = this.ideState.Settings.StateConfig.UsernameMock;

    // });

  }

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }


  public LogoutClicked(event: any) {
    //TODO hook up to auth
    console.log("Logout clicked: ", event);
  }

  public HeaderActionClicked(action: any) {
    if (action.Type === IdeActionTypes.ExternalLink) {
      console.log('navigating to external link: ' + action.Action);
    } else if (action.Type === IdeActionTypes.Link) {
      console.log('navigating to internal link: ' + action.Action);
    } else if (action.Type === IdeActionTypes.Modal) {
      console.log('opening modal: ' + action.Action);
    }
  }


}
