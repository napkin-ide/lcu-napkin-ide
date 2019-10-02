import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NapkinIDESetupState, NapkinIDESetupStepTypes } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';
import { AzureInfaSettings } from '../../core/napkin-ide-setup.state';

@Component({
  selector: 'lcu-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  animations: []
})
export class CompleteComponent implements OnInit {
  //  Fields

  //  Properties

  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: NapkinIDESetupState;

  //  Constructors
  constructor(protected nideState: NapkinIDESetupStateManagerContext) {
  }

  //  Life Cycle
  public ngOnInit() {
    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  //  API methods

  //  Helpers
  protected stateChanged() {
  }
}
