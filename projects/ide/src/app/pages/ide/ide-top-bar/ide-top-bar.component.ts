import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import { UserManagementState, UserManagementStateContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { MatSidenav } from '@angular/material/sidenav';
import {IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-ide-top-bar',
  templateUrl: './ide-top-bar.component.html',
  styleUrls: ['./ide-top-bar.component.scss']
})
export class IdeTopBarComponent implements OnInit {


  protected SideBarOpened: boolean = false;

  public UserEmail: string;


  @Input() public isHandset: boolean = false;

  @Output() public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected ideState: IdeStateStateManagerContext ) { }

  public ngOnInit(): void { 
  }
 public  ngAfterContentInit(): void {
    // this.usersCtxt.Start;

    this.ideState.Context.subscribe((ideState:any) => {
      this.UserEmail = this.ideState.Settings.StateConfig.UsernameMock;

    });

  }

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }


  public LogoutClicked(event: any){
    //TODO hook up to auth
    console.log("Logout clicked: ", event);
  }
  

}
