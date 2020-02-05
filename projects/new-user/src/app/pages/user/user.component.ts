import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserManagementState, UserManagementStepTypes } from '../../core/user-management.state';
import { UserManagementStateContext } from '../../core/user-management-state.context';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserTypeComponent } from '../user-type/user-type.component';
import { UserTermsComponent } from '../user-terms/user-terms.component';

@Component({
  selector: 'lcu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: []
})
export class UserComponent implements OnInit, AfterViewInit {

  //  Fields

  /**
   * OrgDetailsComponent
   */
  @ViewChildren(UserDetailsComponent)
  public UserDetailsComponent: QueryList<UserDetailsComponent>;

  //  Properties

  public get RootURL(): string {
    const port = location.port ? `:${location.port}` : '';

    return `${location.protocol}//${location.hostname}${port}`;
  }

  /**
   * host form validity
   */
  public HostFormValid: boolean;

  /**
   * detail form validity
   */
  public DetailsFormValid: boolean;

  /**
   * Infra form validity
   */
  public InfraFormValid: boolean;

  /**
   * Step types
   */
  public SetupStepTypes = UserManagementStepTypes;

  /**
   * State mechanism
   */
  public State: UserManagementState;

  public Subdomain: string;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected nideState: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
    ) {
     this.HostFormValid = false;
  }

  //  Life Cycle
  public ngOnInit() {
    this.nideState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });
  }

  public ngAfterViewInit(): void {
    this.setupChildrenForms();
  }

  //  API methods
  // public AcceptTerms() {
  //   this.State.Loading = true;

  //   this.nideState.AcceptTerms(this.State.Terms);
  // }

  public Copy(inputElement: HTMLInputElement) {
    const textarea = document.createElement('textarea');

    textarea.textContent = inputElement.value;

    document.body.appendChild(textarea);

    const selection = document.getSelection();

    const range = document.createRange();

    range.selectNode(textarea);

    selection.removeAllRanges();

    selection.addRange(range);

    console.log('copy success', document.execCommand('copy'));

    selection.removeAllRanges();

    document.body.removeChild(textarea);
  }

  public ResetUserDetails() {
    this.State.Loading = true;

    this.nideState.SetUserDetails(null, null, null);
  }

  public SetStep(step: UserManagementStepTypes) {
    if (this.State.Step !== UserManagementStepTypes.Complete) {
      this.State.Loading = true;

      this.nideState.SetUserManagementStep(step);
    }
  }

  //  Helpers

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    if (this.State.Step === UserManagementStepTypes.Complete) {
    }
  }

  /**
   * hook into children forms
   *
   * QueryList is used, because the component is undefined on load
   */
  protected setupChildrenForms(): void {

    // detail form
    this.UserDetailsComponent.changes.subscribe((itm: QueryList<UserDetailsComponent>) => {
      if (itm.first) {
        this.DetailsFormValid = itm.first.DetailsForm.valid;
      }
     });

    // this.ParentForm.addControl('InfraForm', this.OrgInfraComponent.InfraForm);
    // this.OrgInfraComponent.InfraForm.setParent(this.ParentForm);
  }
}
