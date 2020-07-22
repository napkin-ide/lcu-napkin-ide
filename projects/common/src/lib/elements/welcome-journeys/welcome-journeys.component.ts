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
  results: any[];

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

  public get IoTDataColorScheme() {
    return {
      domain: !this.State.IoTData ? [] : this.State.IoTData.map(data => {
        return {
          name: data.Name
        };
      })
    };
  }

  public get IoTDataResults(): any[] {
    return !this.State.IoTData ? [] : this.State.IoTData.map(data => {
      return {
        name: data.Name,
        series: Object.keys(data.Data).map(dk => {
          return {
            name: dk,
            value: data.Data[dk]
          };
        })
      };
    });
  }

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

    this.results = [
      {
        name: 'Bhutan',
        series: [
          {
            value: 6330,
            name: '2016-09-19T04:05:57.165Z',
          },
          {
            value: 6131,
            name: '2016-09-13T00:33:21.791Z',
          },
          {
            value: 4893,
            name: '2016-09-14T01:43:18.351Z',
          },
          {
            value: 3743,
            name: '2016-09-12T21:30:52.261Z',
          },
          {
            value: 3007,
            name: '2016-09-18T07:39:26.686Z',
          },
        ],
      },
      {
        name: 'Niue',
        series: [
          {
            value: 6864,
            name: '2016-09-19T04:05:57.165Z',
          },
          {
            value: 3331,
            name: '2016-09-13T00:33:21.791Z',
          },
          {
            value: 5786,
            name: '2016-09-14T01:43:18.351Z',
          },
          {
            value: 2647,
            name: '2016-09-12T21:30:52.261Z',
          },
          {
            value: 6990,
            name: '2016-09-18T07:39:26.686Z',
          },
        ],
      },
      {
        name: 'French Polynesia',
        series: [
          {
            value: 2118,
            name: '2016-09-19T04:05:57.165Z',
          },
          {
            value: 3692,
            name: '2016-09-13T00:33:21.791Z',
          },
          {
            value: 6688,
            name: '2016-09-14T01:43:18.351Z',
          },
          {
            value: 2625,
            name: '2016-09-12T21:30:52.261Z',
          },
          {
            value: 4815,
            name: '2016-09-18T07:39:26.686Z',
          },
        ],
      },
      {
        name: 'Switzerland',
        series: [
          {
            value: 2370,
            name: '2016-09-19T04:05:57.165Z',
          },
          {
            value: 2817,
            name: '2016-09-13T00:33:21.791Z',
          },
          {
            value: 5096,
            name: '2016-09-14T01:43:18.351Z',
          },
          {
            value: 5787,
            name: '2016-09-12T21:30:52.261Z',
          },
          {
            value: 5312,
            name: '2016-09-18T07:39:26.686Z',
          },
        ],
      },
      {
        name: 'Azerbaijan',
        series: [
          {
            value: 4094,
            name: '2016-09-19T04:05:57.165Z',
          },
          {
            value: 3355,
            name: '2016-09-13T00:33:21.791Z',
          },
          {
            value: 4014,
            name: '2016-09-14T01:43:18.351Z',
          },
          {
            value: 3910,
            name: '2016-09-12T21:30:52.261Z',
          },
          {
            value: 3319,
            name: '2016-09-18T07:39:26.686Z',
          },
        ],
      },
    ];

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
  }
}
