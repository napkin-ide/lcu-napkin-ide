import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { UserManagementStepTypes, UserManagementState } from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';

@Component({
  selector: 'lcu-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss']
})
export class UserTermsComponent implements OnInit {
  // Properties
  public Terms: string;
  /**
   * Setup step types
   */
  // tslint:disable-next-line:no-input-rename
  @Input('setup-step-types')
  public SetupStepTypes: UserManagementStepTypes;

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: UserManagementState;

  constructor(protected nideState: UserManagementStateContext) {}

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
