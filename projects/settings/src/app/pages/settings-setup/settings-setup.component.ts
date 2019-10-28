import { Component, OnInit, Input } from '@angular/core';
import { IdeSettingsState, LowCodeUnitSetupConfig } from '../../core/ide-settings.state';

@Component({
  selector: 'lcu-settings-setup',
  templateUrl: './settings-setup.component.html',
  styleUrls: ['./settings-setup.component.scss']
})
export class SettingsSetupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
  * Current state
  */
 // tslint:disable-next-line:no-input-rename
 @Input('state')
 public State: IdeSettingsState;

  

}



