import { Component, OnInit, Input } from '@angular/core';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { IdeSideBar, IdeSideBarAction, IdeActivity } from '@lcu/common';

@Component({
  selector: 'nide-ide-side-bar',
  templateUrl: './ide-side-bar.component.html',
  styleUrls: ['./ide-side-bar.component.scss']
})
export class IdeSideBarComponent implements OnInit {
  public CurrentActivity: IdeActivity;
  public SideBar: IdeSideBar;
  public SideBarSections: string[];

  @Input() public isHandset: boolean = false;

  constructor(
    protected ideState: IdeStateStateManagerContext
  ) { }

  // TODO: Trigger loading on any State actions
  public ngOnInit(): void {
    this.ideState.Context.subscribe(ideState => {
      this.SideBar = ideState.SideBar;

      if (this.SideBar && this.SideBar.Actions) {
        const sections = this.SideBar.Actions.map(a => {
          return a.Section;
        }).filter((a, i, self) => self.indexOf(a) === i);

        this.SideBarSections = sections;
      }

      if (ideState.CurrentActivity) {
        this.CurrentActivity = ideState.CurrentActivity;
      }
    });
  }

  public IsSectionActive(section: string): boolean {
    return this.SideBar.CurrentAction &&
      this.SideBar.Actions.filter(a2 => a2.Section === section).some(
        a2 => a2.Group === this.SideBar.CurrentAction.Group && a2.Action === this.SideBar.CurrentAction.Action
      );
  }

  public SelectSideBarAction(section: string, action: IdeSideBarAction): void {
    this.ideState.SelectSideBarAction(action.Action, action.Group, section);
  }
}
