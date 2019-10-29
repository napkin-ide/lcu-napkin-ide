import { Component, OnInit, Input } from '@angular/core';
import { IdeSettingsState, LowCodeUnitSetupConfig } from '../../core/ide-settings.state';

@Component({
  selector: 'lcu-settings-setup',
  templateUrl: './settings-setup.component.html',
  styleUrls: ['./settings-setup.component.scss']
})
export class SettingsSetupComponent implements OnInit {

  public get ExpandActivityBar(): boolean {
    return !!this.State.EditActivity || this.State.AddNew.Activity || !this.State.Activities || this.State.Activities.length <= 0;
  }

  public get LCUGroups(): string[] {
    return Object.keys(this.State.LCUSolutionOptions);
  }

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: IdeSettingsState;

  constructor() { }

  public ngOnInit(): void { }

}



