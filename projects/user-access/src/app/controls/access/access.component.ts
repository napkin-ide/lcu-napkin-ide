import { Subject } from 'rxjs/internal/Subject';
import { OrgModel } from '../../models/org.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { IdeUserAccessStateManagerContext } from '../../core/ide-user-access-state-manager.context';
import { IdeUserAccessState } from '../../core/ide-user-access.state';
import { fromEvent } from 'rxjs';
import { take, takeWhile, throttleTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lcu-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  public Orgs: Array<OrgModel> = [
    {Value: 'org-one', Label: 'Organization One', Disabled: false},
    {Value: 'org-two', Label: 'Organization Two', Disabled: true},
    {Value: 'org-three', Label: 'Organization Three', Disabled: false},
    {Value: 'org-four', Label: 'Organization Four', Disabled: false},
    {Value: 'org-five', Label: 'Organization Five', Disabled: true},
    {Value: 'org-six', Label: 'Organization Six', Disabled: false},
    {Value: 'org-seven', Label: 'Organization Seven', Disabled: false}
  ];

  onStop = new Subject<void>();

  /**
   * Current state
   */
  // tslint:disable-next-line:no-input-rename
  @Input('state')
  public State: IdeUserAccessState;

  public DisableRequestButton: boolean;

  /**
   * property for reactive form
   */
  public Form: FormGroup;

  /**
   * State loading
   */
  public Loading: boolean;

  /**
   * property when an unathorized org is selected
   */
  public UnathorizedSelected: OrgModel;

  /**
   * Access UsernameInput field
   */
  public get OrgControl(): AbstractControl {
    return this.Form.get('orgControl');
  }

  // constructor(protected userAccessState: IdeUserAccessStateManagerContext) {
 constructor() {
    this.UnathorizedSelected = null;
    this.Loading = false;
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  /**
   * Request organization access
   */
  public RequestAccess(evt: Event): void {
    // this.userAccessState.RequestUserAccess();

    // for testing
    setTimeout (() => {
      this.DisableRequestButton = false;
     }, 3000);
  }

  /**
   * Setup the reactive form
   */
  protected setupForm(): void {
    this.Form = new FormGroup({
      orgControl: new FormControl('')
    });

    this.onChanges();
  }

  /**
   * On form changes
   */
  protected onChanges(): void {
    this.OrgControl.valueChanges.subscribe((val: OrgModel) => {
      if (val.Disabled) {
        this.UnathorizedSelected = val;
      } else {
        this.UnathorizedSelected = null;
      }
    });
  }

  /**
   * Setup state
   */
  protected setupState(): void {
    // this.userAccessState.Context.subscribe(state => {
    //   this.State = state;
    //   this.Loading = state.Loading;

    //   this.stateChanged();
    // });
  }

  /**
   * When state changes
   */
  protected stateChanged() {
  
  }

}
