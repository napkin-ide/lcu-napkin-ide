import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nide-ide-top-bar',
  templateUrl: './ide-top-bar.component.html',
  styleUrls: ['./ide-top-bar.component.scss']
})
export class IdeTopBarComponent implements OnInit {

  protected SideBarOpened: boolean = false;

  @Input() public isHandset: boolean = false;

  @Output() public openSideBarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public ngOnInit(): void { }

  public ToggleSideBar(): void {
    this.openSideBarEvent.emit(!this.SideBarOpened);
  }

}
