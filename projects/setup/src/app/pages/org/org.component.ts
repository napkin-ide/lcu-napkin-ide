import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NapkinIDESetupState, NapkinIDESetupStepTypes } from '../../core/napkin-ide-setup.state';
import { NapkinIDESetupStateManagerContext } from '../../core/napkin-ide-setup-state-manager.context';
import { OrgDetailsComponent } from '../org-details/org-details.component';
import { OrgInfraComponent } from '../org-infra/org-infra.component';
import { OrgHostComponent } from '../org-host/org-host.component';

@Component({
  selector: 'lcu-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss'],
  animations: []
})
export class OrgComponent implements OnInit, AfterViewInit {

  //  Fields

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

  /**
   * Host component
   */
  @ViewChildren(OrgHostComponent)
  public OrgHostComponent: QueryList<OrgHostComponent>;
  // @ViewChild(OrgHostComponent, { static: false })
  // public OrgHostComponent: OrgHostComponent;

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
  public SetupStepTypes = NapkinIDESetupStepTypes;

  /**
   * State mechanism
   */
  public State: NapkinIDESetupState;

  public Subdomain: string;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected nideState: NapkinIDESetupStateManagerContext,
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

  public ResetOrgDetails() {
    this.State.Loading = true;

    this.nideState.SetOrganizationDetails(null, null, null);
  }

  public SetStep(step: NapkinIDESetupStepTypes) {
    if (this.State.Step !== NapkinIDESetupStepTypes.Complete) {
      this.State.Loading = true;

      this.nideState.SetNapkinIDESetupStep(step);
    }
  }

  //  Helpers

  protected stateChanged() {
    // use change detection to prevent ExpressionChangedAfterItHasBeenCheckedError, when
    // using *ngIf with external form properties
    this.cdr.detectChanges();

    if (this.State.Step === NapkinIDESetupStepTypes.Complete) {
      setTimeout(() => {
        location.href = `https://${this.State.Host}/fathym-it`;
      }, 15000);
    }
  }

  /**
   * hook into children forms
   *
   * QueryList is used, because the component is undefined on load
   */
  protected setupChildrenForms(): void {

    // detail form
    this.OrgDetailsComponent.changes.subscribe((itm: QueryList<OrgDetailsComponent>) => {
      if (itm.first) {
        this.DetailsFormValid = itm.first.DetailsForm.valid;
      }
     });

    // detail form
    this.OrgInfraComponent.changes.subscribe((itm: QueryList<OrgInfraComponent>) => {
      if (itm.first) {
        this.InfraFormValid = itm.first.InfraForm.valid;
      }
    });

    // host form
    this.OrgHostComponent.changes.subscribe((itm: QueryList<OrgHostComponent>) => {
     if (itm.first) {
        this.HostFormValid = itm.first.HostForm.valid;
     }
    });

    // this.ParentForm.addControl('InfraForm', this.OrgInfraComponent.InfraForm);
    // this.OrgInfraComponent.InfraForm.setParent(this.ParentForm);
  }
}
