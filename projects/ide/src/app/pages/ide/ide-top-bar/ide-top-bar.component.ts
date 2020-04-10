import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
// import { UserManagementState, UserManagementStateContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatSidenav } from "@angular/material/sidenav";
import {
  // import { IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common/lcu.api';
  IdeStateStateManagerContext,
  IdeManagementState,
  IDEActionTypes,
  ExternalDialogComponent,
  UserInfoModel,
} from "@napkin-ide/lcu-napkin-ide-common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

@Component({
  selector: "nide-ide-top-bar",
  templateUrl: "./ide-top-bar.component.html",
  styleUrls: ["./ide-top-bar.component.scss"],
})
export class IdeTopBarComponent implements OnInit {
  protected billingDialog: MatDialogRef<ExternalDialogComponent, any>;

  protected SideBarOpened: boolean = false;

  public State: IdeManagementState;

  public UsersInfo: UserInfoModel;

  @Output()
  public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public isHandset = false;

  constructor(
    protected ideState: IdeStateStateManagerContext,
    protected dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.ideState.Context.subscribe((state: IdeManagementState) => {
      this.State = state;

      this.stateChanged();

      this.getUserInfo();
    });
  }

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }

  public LogoutClicked(event: any) {
    // TODO hook up to auth
    console.log("Logout clicked: ", event);

    window.location.replace("/.oauth/logout");
  }

  public HeaderActionClicked(action: any) {
    if (action.Type === IDEActionTypes.ExternalLink) {
      window.open(action.Action); // navigate to external link
    } else if (action.Type === IDEActionTypes.Link) {
      console.log('navigating to internal link: ', action.Action);
    } else if (action.Type === IDEActionTypes.Modal) {
      this.openLinkInModal(action.Action);
    }
  }

  protected openLinkInModal(linkUrl: string): void {
    this.billingDialog = this.dialog.open(ExternalDialogComponent, {
      width: '90%',
      data: { ExternalPath: linkUrl },
    });

    this.billingDialog.afterClosed().subscribe((result: Observable<any>) => {
      this.ideState.$Refresh();

      this.billingDialog = null;
    });
  }

  protected getUserInfo() {
    console.log("State: ", this.State);
  }

  protected stateChanged() {
    console.log("State: ", this.State);
    if (!this.UsersInfo) {
      this.UsersInfo = new UserInfoModel();
    }

    this.UsersInfo.Username = this.State.Username;
  }
}
