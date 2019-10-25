import { Component, OnInit } from '@angular/core';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { IdePanel } from '@lcu/common';

@Component({
  selector: 'nide-ide-panels',
  templateUrl: './ide-panels.component.html',
  styleUrls: ['./ide-panels.component.scss']
})
export class IdePanelsComponent implements OnInit {
  public CurrentPanel: IdePanel;
  public Loading: boolean;
  public Panels: IdePanel[];
  public ShowPanels: boolean;

  constructor(
    protected ideState: IdeStateStateManagerContext
  ) { }

  public ngOnInit(): void {
    this.ideState.Context.subscribe(ideState => {
      this.Panels = ideState.Panels;

      this.CurrentPanel = ideState.CurrentPanel;

      this.ShowPanels = ideState.ShowPanels;

      this.Loading = ideState.Loading;

      // this.ideState.AddStatusChange('Editors Loaded...');
    });
  }

  public ToggleShowPanels(): void {
    this.Loading = true;

    this.ideState.ToggleShowPanels();
  }
}
