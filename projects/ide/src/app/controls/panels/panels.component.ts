import { Component, OnInit } from '@angular/core';
import { IdePanel, IdeStateChangeTypes, IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { IdeStateService } from '../../svc/ide-state.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nide-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})
export class PanelsComponent implements OnInit {
  // Properties
  public CurrentPanel: IdePanel;

  public Loading: boolean;

  public Panels: IdePanel[];

  public ShowPanels: boolean;

  //  Constructors
  constructor(protected ideState: IdeStateStateManagerContext) {}

  //  Life Cycle
  public ngOnInit() {
    this.ideState.Context.subscribe(ideState => {
      this.Panels = ideState.Panels;

      this.CurrentPanel = ideState.CurrentPanel;

      this.ShowPanels = ideState.ShowPanels;

      this.Loading = ideState.Loading;

      // this.ideState.AddStatusChange('Editors Loaded...');
    });
  }

  //  API Methods
  public ToggleShowPanels() {
    this.Loading = true;

    this.ideState.ToggleShowPanels();
  }
}
