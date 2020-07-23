import { Component, OnInit, Injector } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

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
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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

  public IoTDataForm: FormGroup;

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
    protected formBldr: FormBuilder,
    protected http: HttpClient,
    protected state: LimitedJourneysManagementStateContext
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.IoTDataForm = this.formBldr.group({
      deviceId: ['', Validators.required],
      deviceType: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      temp: ['', Validators.required],
      windHeading: ['', Validators.required],
    });

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

  public SendDeviceData() {
    const data = {
      DeviceID: this.IoTDataForm.controls.deviceId.value,
      DeviceType: this.IoTDataForm.controls.deviceType.value,
      Version: '1',
      Timestamp: new Date(),
      DeviceData: {
        Latitude: this.IoTDataForm.controls.latitude.value,
        Longitude: this.IoTDataForm.controls.longitude.value,
      },
      SensorReadings: {
        Temperature: this.IoTDataForm.controls.temp.value,
        WindHeading: this.IoTDataForm.controls.windHeading.value,
      },
    };

    this.http
      .post('/api/data-flow/iot/data-stream', data, this.httpOptions)
      .pipe(catchError(this.handleError));
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

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
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
