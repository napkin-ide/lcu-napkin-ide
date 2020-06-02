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
import {
  Constants,
  UserManagementStateContext,
  UserManagementState,
  // UserManagementStepTypes,
  UserTypes,
  JourneyPersona
} from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: []
})
export class OverviewComponent implements OnInit, AfterViewInit {
  //  Fields

  //  Properties

  public get Categories(): string[] {
    const persona = this.CurrentPersona;

    if (persona != null) {
      return Object.keys(persona.DetailLookupCategories);
    }

    return [];
  }

  public get CurrentPersona(): JourneyPersona {
    const persona = this.State.Personas.find(
      p => p.Lookup === this.State.UserType
    );

    return persona;
  }

  /**
   * State mechanism
   */
  public State: UserManagementState;

  public UserTypes = UserTypes;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userState: UserManagementStateContext,
    protected cdr: ChangeDetectorRef
  ) {}

  //  Life Cycle
  public ngOnInit() {
    this.userState.Context.subscribe(state => {
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

  public LoadJourneyDetails(detLookup: string) {
    return this.State.Details.find(det => det.Lookup === detLookup);
  }

  public SetUserDetails() {
    this.State.Loading = true;

    this.userState.SetUserDetails('Full Name', 'USA', 'Handle');
  }

  public SetUserType(userType: UserTypes) {
    this.State.Loading = true;

    this.userState.SetUserType(userType);
  }

  //  Helpers

  protected stateChanged() {
    this.cdr.detectChanges();
  }

  /**
   * hook into children forms
   *
   * QueryList is used, because the component is undefined on load
   */
  protected setupChildrenForms(): void {}
}
