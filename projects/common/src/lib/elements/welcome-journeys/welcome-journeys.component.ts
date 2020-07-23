import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  JourneyRoleTypes,
  LimitedJourneysManagementState,
  JourneyOption,
  JourneyContentTypes,
} from '../../state/journeys/journeys.state';
import { LimitedJourneysManagementStateContext } from '../../state/journeys/journeys-state.context';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export class LcuNapkinIdeWelcomeJourneysElementState {}

export class LcuNapkinIdeWelcomeJourneysContext extends LCUElementContext<
  LcuNapkinIdeWelcomeJourneysElementState
> {}

export const SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT =
  'lcu-napkin-ide-welcome-journeys-element';

@Component({
  selector: SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT,
  templateUrl: './welcome-journeys.component.html',
  styleUrls: ['./welcome-journeys.component.scss'],
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

  public ChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Device 1' },
    { data: [65, 55, 40, 59, 80, 81, 56], label: 'Device 2' },
  ];

  public ChartLabels: Label[] = [
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ];

  public ChartLegend = true;

  public ChartType: ChartType = 'line';

  public ChartPlugins: any[] = [];

  public IoTChartColors: Color[];

  public IoTChartOptions: ChartOptions;

  public IoTDataLabels: Label[];

  public IoTDataResults: ChartDataSets[];

  /**
   * Current state
   */
  public State: LimitedJourneysManagementState;

  public get JourneyRoles() {
    return Object.keys(JourneyRoleTypes);
  }

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
  public ContainsRoleType(journey: JourneyOption, roleType: JourneyRoleTypes) {
    return !!journey.Roles.find((r) => r === roleType);
  }

  //  Helpers
  protected configureCharts() {
    this.IoTChartOptions = { responsive: true, maintainAspectRatio: false };

    this.IoTChartColors = [
      { borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' },
    ];

    // this.IoTDataLabels = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    //   'July',
    // ];
    this.IoTDataLabels = !this.State.IoTData
      ? []
      : Object.keys(this.State.IoTData[0].Data);

    // this.IoTDataResults = [
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Device 1' },
    //   { data: [65, 55, 40, 59, 80, 81, 56], label: 'Device 2' },
    // ];
    this.IoTDataResults = !this.State.IoTData
      ? []
      : this.State.IoTData.map((data) => {
          return {
            label: data.Name,
            data: Object.keys(data.Data).map((dk) => {
              return data.Data[dk];
            }),
          };
        });
  }
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
      this.divideJourneys();
    }

    this.configureCharts();
  }
}
