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
  UserManagementStepTypes,
  UserTypes,
  JourneyPersona,
  JourneyDetail
} from '@napkin-ide/lcu-napkin-ide-common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'lcu-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
  animations: []
})
export class JourneyComponent implements OnInit, AfterViewInit {
  //  Fields

  //  Properties
  public get CurrentJourney(): JourneyDetail {
    const persona = this.State.Details.find(
      det => det.Lookup === this.CurrentJourneyLookup
    );

    return persona;
  }

  public get CurrentPersona(): JourneyPersona {
    const persona = this.State.Personas.find(
      p => p.Lookup === this.CurrentUserType
    );

    return persona;
  }

  public CurrentJourneyLookup: string;

  public CurrentUserType: UserTypes;

  public State: UserManagementState;

  public UserTypes = UserTypes;

  //  Constructor
  constructor(
    protected formBldr: FormBuilder,
    protected userState: UserManagementStateContext,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef
  ) {}

  //  Life Cycle
  public ngOnInit() {
    this.userState.Context.subscribe(state => {
      this.State = state;

      this.stateChanged();
    });

    this.route.paramMap.subscribe(params => {
      this.CurrentUserType = params.get('userType') as UserTypes;

      this.CurrentJourneyLookup = params.get('journey');
    });
  }

  public ngAfterViewInit(): void {}

  //  API methods
  // public AcceptTerms() {
  //   this.State.Loading = true;

  //   this.nideState.AcceptTerms(this.State.Terms);
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
}
