import { Component, OnInit } from '@angular/core';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { IdeSideBar, IdeSideBarAction, IdeActivity } from '@lcu/common';

@Component({
  selector: 'nide-ide-side-bar',
  templateUrl: './ide-side-bar.component.html',
  styleUrls: ['./ide-side-bar.component.scss']
})
export class IdeSideBarComponent implements OnInit {
  public CurrentActivity: IdeActivity;
  public Loading: boolean;
  public SideBar: IdeSideBar;
  public SideBarSections: string[];

  constructor(
    protected ideState: IdeStateStateManagerContext
  ) { }

  public ngOnInit(): void {
    this.ideState.Context.subscribe(ideState => {
      console.log('ideState: ', ideState);
      this.SideBar = ideState.SideBar;
      this.Loading = ideState.Loading;

      if (this.SideBar && this.SideBar.Actions) {
        const sections = this.SideBar.Actions.map(a => {
          return a.Section;
        }).filter((a, i, self) => self.indexOf(a) === i);

        this.SideBarSections = sections;
      }

      if (ideState.CurrentActivity) {
        this.CurrentActivity = ideState.CurrentActivity;
      }

      // this.ideState.AddStatusChange('Side Bar Loaded...');
    });
  }

  public IsSectionActive(section: string): boolean {
    return this.SideBar.CurrentAction &&
      this.SideBar.Actions.filter(a2 => a2.Section === section).some(
        a2 => a2.Group === this.SideBar.CurrentAction.Group && a2.Action === this.SideBar.CurrentAction.Action
      );
  }

  public SelectSideBarAction(section: string, action: IdeSideBarAction): void {
    this.Loading = true;

    this.ideState.SelectSideBarAction(action.Action, action.Group, section);
  }
}
