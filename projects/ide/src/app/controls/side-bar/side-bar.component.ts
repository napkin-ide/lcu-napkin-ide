import { Component, OnInit } from '@angular/core';

import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { IdeSideBar, IdeSideBarAction } from '@lcu/common';

@Component({
  selector: 'nide-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  // Properties
  public Loading: boolean;

  public SideBar: IdeSideBar;

  public SideBarSections: string[];

  //  Constructors
  constructor(protected ideState: IdeStateStateManagerContext) {}

  //  Life Cycle
  public ngOnInit() {
    this.ideState.Context.subscribe(ideState => {
      this.SideBar = ideState.SideBar;

      this.Loading = ideState.Loading;

      if (this.SideBar && this.SideBar.Actions) {
        const sections = this.SideBar.Actions.map(a => {
          return a.Section;
        }).filter((a, i, self) => self.indexOf(a) === i);

        this.SideBarSections = sections;
      }

      // this.ideState.AddStatusChange('Side Bar Loaded...');
    });
  }

  //  API Methods
  public IsSectionActive(section: string) {
    return this.SideBar.CurrentAction &&
      this.SideBar.Actions.filter(a2 => a2.Section === section).some(
        a2 => a2.Group === this.SideBar.CurrentAction.Group && a2.Action === this.SideBar.CurrentAction.Action
      );
  }

  public SelectSideBarAction(section: string, action: IdeSideBarAction) {
    this.Loading = true;

    this.ideState.SelectSideBarAction(action.Action, action.Group, section);
  }
}
