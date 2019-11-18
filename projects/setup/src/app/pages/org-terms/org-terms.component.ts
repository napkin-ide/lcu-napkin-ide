import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { NapkinIDESetupStepTypes, NapkinIDESetupState } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';

@Component({
  selector: 'lcu-org-terms',
  templateUrl: './org-terms.component.html',
  styleUrls: ['./org-terms.component.scss']
})
export class OrgTermsComponent implements OnInit {
  // Properties
  public Terms: string;
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

  constructor(protected nideState: NapkinIDESetupStateManagerContext) {}

  ngOnInit() {
    this.setupState();
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
    // console.log('state', this.State);
    if (this.State.Terms) {
      this.Terms = this.State.Terms.replace(/\\/g, '');
      // console.log('finalData', this.Terms);
    }
  }

  /**
   * Setup state mechanism
   */
  protected setupState(): void {
    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }
}
