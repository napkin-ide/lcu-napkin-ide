import { Component, OnInit, Input } from '@angular/core';
import { NapkinIDESetupStepTypes, NapkinIDESetupState } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-terms',
  templateUrl: './org-terms.component.html',
  styleUrls: ['./org-terms.component.scss']
})
export class OrgTermsComponent implements OnInit {

// Properties

  /**
   * Setup step types
   */
  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: NapkinIDESetupStepTypes;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: NapkinIDESetupState;

  constructor(protected nideState: NapkinIDESetupStateManagerContext) { }

  ngOnInit() {
  }

  //  API methods
  public AcceptTerms() {
    this.State.Loading = true;

    this.nideState.AcceptTerms(this.State.Terms);
  }

  // Helpers
  /**
   * When state values change
   */
  protected stateChanged(): void {
  }

}
