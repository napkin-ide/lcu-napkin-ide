import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
// import { UserManagementState, UserManagementStateContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ExternalDialogComponent } from '../external-dialog/external-dialog.component';
import { IdeManagementState, IDEActionTypes } from '../../state/ide/ide-management.state';
import { UserInfoModel } from '../../models/user-info.model';
import { IDEStateManagementContext } from '../../state/ide/ide-management-state.context';
import { UserAccountModalComponent } from '../user-account-modal/user-account-modal.component';
import { UserManagementStateContext } from '../../state/user-management/user-management-state.context';
import { UserManagementState } from '../../state/user-management/user-management.state';

@Component({
  selector: 'lcu-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent implements OnInit {
/**
 * Dialog for the billing component to open in
 */
  protected billingDialog: MatDialogRef<ExternalDialogComponent, any>;

  protected SideBarOpened = false;

  public IDEActionTypes = IDEActionTypes;

  public State: IdeManagementState;

  public UsersInfo: UserInfoModel;

  /**
   * The Users state that is passed into the useraccount modal
   */
  public UsersState: UserManagementState;


  @Output()
  public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('back-button-clicked')
  public BackButtonClickedEvent: EventEmitter<any>;

  @Input() public isHandset = false;

  @Input('show-back-button')
  public ShowBackButton: boolean;

  constructor(
    protected ideState: IDEStateManagementContext,
    protected userStateCtx: UserManagementStateContext,
    protected dialog: MatDialog,
    protected userAccountDialog: MatDialog
  ) {
    this.BackButtonClickedEvent = new EventEmitter<any>();
  }

  public ngOnInit(): void {
    this.ideState.Context.subscribe((state: IdeManagementState) => {
      this.State = state;

      this.stateChanged();

      // this.getUserInfo();
    });

    this.userStateCtx.Context.subscribe((ustate: UserManagementState) => {
      this.UsersState = ustate;
      console.log("Users state on toolbar", this.UsersState)
    });
  }

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }

  public LogoutClicked(event: any) {
    // TODO hook up to auth
    // console.log('Logout clicked: ', event);

    window.location.replace('/.oauth/logout');
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

  public GoBack(){
    this.BackButtonClickedEvent.emit();
  }

  /**
   * Opens the users account modal passing in the users state so there is no lag in 
   * 
   * filling out user info
   */
  public OpenMyAccount(){
   this.userAccountDialog.open(UserAccountModalComponent,
      {
        position: {top: '64px', right:'0px'},
        width: '260px',
        panelClass: 'user-account-dialog-container',
        data: this.UsersState 
      });
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

  // protected getUserInfo() {
    // console.log('State: ', this.State);
  // }

  protected stateChanged() {
    if (!this.UsersInfo) {
      this.UsersInfo = new UserInfoModel();
    }

    this.UsersInfo.Username = this.State.Username;
  }
}

