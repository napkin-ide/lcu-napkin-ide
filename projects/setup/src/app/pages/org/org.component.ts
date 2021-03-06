import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrgDetailsComponent } from '../org-details/org-details.component';
import { OrgInfraComponent } from '../org-infra/org-infra.component';
import {
  Constants,
  UserManagementState,
  UserManagementStateContext,
  NapkinIDESetupStepTypes,
  BootOption
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss'],
  animations: []
})
export class OrgComponent implements OnInit, AfterViewInit {
  //  Fields

  //  Properties
  /**
   * OrgDetailsComponent
   */
  @ViewChildren(OrgDetailsComponent)
  public OrgDetailsComponent: QueryList<OrgDetailsComponent>;

  /**
   * OrgInfraComponent
   */
  @ViewChildren(OrgInfraComponent)
  public OrgInfraComponent: QueryList<OrgInfraComponent>;

  public get RootURL(): string {
    const port = location.port ? `:${location.port}` : '';

    return `${location.protocol}//${location.hostname}${port}`;
  }

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
  public SetupStepTypes = NapkinIDESetupStepTypes;

  /**
   * State mechanism
   */
  public State: UserManagementState;

  public Subdomain: string;
/**
 * The link to the fathym support documentation
 */
  public SupportPage: string;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userMgr: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
  ) {
    this.InfraFormValid = false;
    this.SupportPage = Constants.SUPPORT_WEBPAGE;
  }

  //  Life Cycle
  public ngOnInit() {
    this.userMgr.Context.subscribe(state => {
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

  //   this.userMgr.AcceptTerms(this.State.Terms);
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

  public ResetOrgDetails() {
    this.State.Loading = true;

    this.userMgr.SetOrganizationDetails(null, null);
  }

  public SetStep(step: NapkinIDESetupStepTypes) {
    if (this.State.SetupStep !== NapkinIDESetupStepTypes.Complete) {
      this.State.Loading = true;

      this.userMgr.SetNapkinIDESetupStep(step);
    }
  }

  //  Helpers

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    if (this.State.SetupStep === NapkinIDESetupStepTypes.Complete) {
    }
    // console.log("State: ", this.State)
  }

  /**
   * hook into children forms
   *
   * QueryList is used, because the component is undefined on load
   */
  protected setupChildrenForms(): void {
    // detail form
    this.OrgDetailsComponent.changes.subscribe(
      (itm: QueryList<OrgDetailsComponent>) => {
        if (itm.first && itm.first.DetailsForm) {
          this.DetailsFormValid = itm.first.DetailsForm.valid;
        }
      }
    );

    // detail form
    this.OrgInfraComponent.changes.subscribe(
      (itm: QueryList<OrgInfraComponent>) => {
        if (itm.first && itm.first.InfraForm) {
          this.InfraFormValid = itm.first.InfraForm.valid;
        }
      }
    );

    // this.ParentForm.addControl('InfraForm', this.OrgInfraComponent.InfraForm);
    // this.OrgInfraComponent.InfraForm.setParent(this.ParentForm);
  }
}
