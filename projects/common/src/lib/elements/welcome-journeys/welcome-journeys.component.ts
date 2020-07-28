import { Component, OnInit, Injector } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

import { LCUElementContext, LcuElementComponent } from "@lcu/common";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  LimitedJourneysManagementState,
  JourneyOption,
  JourneyContentTypes,
} from "../../state/journeys/journeys.state";
import { LimitedJourneysManagementStateContext } from "../../state/journeys/journeys-state.context";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label, Color } from "ng2-charts";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export class LcuNapkinIdeWelcomeJourneysElementState {}

export class LcuNapkinIdeWelcomeJourneysContext extends LCUElementContext<
  LcuNapkinIdeWelcomeJourneysElementState
> {}

export const SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT =
  "lcu-napkin-ide-welcome-journeys-element";

@Component({
  selector: SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT,
  templateUrl: "./welcome-journeys.component.html",
  styleUrls: ["./welcome-journeys.component.scss"],
})
export class LcuNapkinIdeWelcomeJourneysElementComponent
  extends LcuElementComponent<LcuNapkinIdeWelcomeJourneysContext>
  implements OnInit {
  //  Fields

  //  Properties

  /**
   * Content Types
   */
  public ContentTypes = JourneyContentTypes;

  /**
   * Array of journeys divided up into role types (used to populate UI)
   */
  public DividedJourneys: Array<{
    JourneyName: string;
    Journeys: Array<any>;
  }> = [];

  public HighlightedJourneys: JourneyOption[];

  public IoTDataLabels: Label[];

  public IoTDataResults: ChartDataSets[];

  /**
   * Current state
   */
  public State: LimitedJourneysManagementState;

  public JourneyRoles: string[];

  //  Constructors
  constructor(
    protected injector: Injector,
    protected state: LimitedJourneysManagementStateContext
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.state.Context.subscribe((state: any) => {
      this.State = state;

      this.State.IsIoTStarter = true;

      this.handleStateChanges();
    });
  }

  //  API Methods
  public ContainsRoleType(journey: JourneyOption, roleType: string) {
    return !!journey.Roles.find((r) => r === roleType);
  }

  //  Helpers
  /**
   * Divides the journeys from the state into individual arrays of role-based journeys
   */
  protected divideJourneys() {
    this.DividedJourneys = [];
    this.JourneyRoles.forEach((role) => {
      this.DividedJourneys.push({ JourneyName: role, Journeys: [] });
    });
    this.State.Journeys.forEach((journey) => {
      journey.Roles.forEach((role: any) => {
        this.DividedJourneys.find((j) => j.JourneyName === role).Journeys.push(
          journey
        );
      });
    });
  }

  /**
   * Handle when the state is returned
   */
  protected handleStateChanges(): void {
    if (this.State.Journeys) {
      this.setJourneyRoles();

      this.divideJourneys();

      this.highlightJourneys();
    }
  }

  protected highlightJourneys() {
    this.HighlightedJourneys = this.State.Journeys.filter(
      (j) => !!j.HighlightedOrder
    );
  }

  protected setJourneyRoles(): void {
    if (this.State.Journeys) {
      const roles = Array.from(new Set(this.State.Journeys.map((j) => j.Roles).reduce((a, b) => {
        return a.concat(b);
      })));

      this.JourneyRoles = roles;
    }
  }
}
