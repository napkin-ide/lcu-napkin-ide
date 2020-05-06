import { Component, OnInit, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdeStateStateManagerContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { GuidedTour, GuideBotScreenPosition, OrientationTypes, TourStep, GuidedTourManagementStateContext, GuidedTourManagementState, GuidedTourService, ChatTourButton } from '@lowcodeunit/lcu-guided-tour-common';

@Component({
  selector: 'nide-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  public AppTour: GuidedTour;
  public BotBoundingContainer: string = '#ideMainSideBar'; // .ide-overflowed / #ideMainSideBar
  public BotPadding: number = 5;
  public BotScreenPosition: GuideBotScreenPosition = GuideBotScreenPosition.BottomLeft;
  public EnableChat: boolean = true;
  public EnableFirstTimePopup: boolean = true;
  public Tours: GuidedTour[] = [];
  public IdeState: IdeManagementState;
  public GuidedTourState: GuidedTourManagementState;
  public TourButtons: ChatTourButton[];

  public IsHandset$: Observable<boolean>;
  public IsOpen: boolean = true;
  public Loading: boolean = false;
  public ShowPanels: boolean = false;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected elRef: ElementRef,
    protected ideState: IdeStateStateManagerContext,
    protected guidedTourState: GuidedTourManagementStateContext,
    protected guidedTourService: GuidedTourService
  ) {
    this.TourButtons = this.setTourButtons();
  }

  public ngOnInit(): void {
    this.IsHandset$ = this.breakpointObserver.observe([
        Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.Small,
        Breakpoints.XSmall
      ])
      .pipe(
        map((result) => {
          if (this.breakpointObserver.isMatched('(min-width: 960px)')) {
            this.IsOpen = true;
          }
          return this.breakpointObserver.isMatched('(max-width: 959px)');
        })
      );

    this.ideState.Context.subscribe((ideState: IdeManagementState) => {
      console.log('IDE State: ', ideState);
      this.IdeState = ideState;
      this.Loading = ideState.Loading;
      this.ShowPanels = ideState.ShowPanels;

      this.handleStateChanged();
    });

    this.guidedTourState.Context.subscribe((guidedTourState: GuidedTourManagementState) => {
      console.log('GUIDED TOUR STATE: ', guidedTourState);
      this.GuidedTourState = guidedTourState;
      // this.AppTour = this.createGuidedTour();
      this.AppTour = guidedTourState.CurrentTour;
      this.Tours = guidedTourState.Tours;
    });
  }

  protected handleStateChanged(): void {
    this.determineTour();
  }

  protected determineTour(): void {
    console.log('determineTour()');
    const editor = this.IdeState.CurrentEditor?.Editor;

    if (this.IdeState.CurrentActivity?.Lookup === 'limited-trial') {
      switch (editor) {
        case 'lcu-limited-trial-welcome-element':
          // this.AppTour = this.Tours[1];
          this.setCurrentTour('limited-trial-tour');
          break;
        case 'lcu-limited-trial-data-apps-element':
          // this.AppTour = this.Tours[2];
          this.setCurrentTour('data-applications-tour');
          break;
        case 'lcu-limited-trial-data-flow-element':
          // this.AppTour = this.createGuidedTour();
          // this.AppTour = this.Tours[3];
          this.setCurrentTour('data-flow-management-tour');
          if (!this.IdeState.Loading) {
            this.findDataFlowManageButton();
          }
          break;
        default:
          this.setCurrentTour('limited-trial-tour');
          break;
      }
    }
  }

  protected setCurrentTour(lookup: string): void {
    if (this.GuidedTourState.CurrentTour?.Lookup !== lookup) {
      this.guidedTourState.SetActiveTour(lookup);

      setTimeout(() => {
        if (this.GuidedTourState.CurrentTour?.IsFirstTimeViewing) {
          this.guidedTourService.startTour(this.GuidedTourState.CurrentTour);
        }
      }, 500);
    }
  }

  public OpenSideBar(): void {
    this.IsOpen = !this.IsOpen;
  }

  private findDataFlowManageButton() {
    console.log('findDataFlowManageButton()');
    let element = this.elRef.nativeElement.querySelector('lcu-data-flow-list-element .mat-card:nth-of-type(1) button');

    if (element) {
      element.addEventListener('click', this.startEmulatedDataFlowTour.bind(this));
    } else {
      console.warn('Could not find button for Emulated Data Flow');
    }
  }

  public startEmulatedDataFlowTour(): void {
    console.log('startEmulatedDataFlowTour()');
    // this.AppTour = this.Tours[4];
    this.guidedTourState.SetActiveTour('data-flow-tool-tour');

    setTimeout(() => {
      this.guidedTourService.startTour(this.AppTour);
    }, 5500);
  }


  public OnComplete(): void {
    console.log('Tour is Complete!');
  }

  public OnSkipped(): void {
    console.log('Skipping the tour.');
  }

  public OnStepClosed(step: TourStep): void {
    if (step.ID === '00000000-0000-0000-0000-000000000042') {
      this.AppTour = this.Tours[4];
    }
  }

  public OnStepOpened(step: TourStep): void {
    if (step.ID === '00000000-0000-0000-0000-000000000021') {
      this.ideState.SelectSideBarAction('welcome', 'lcu-limited-trial', 'Limited Low-Code Unit™ Trials');
    }
    if (step.ID === '00000000-0000-0000-0000-000000000041') {
      this.findDataFlowManageButton();
    }
  }

  protected setTourButtons(): ChatTourButton[] {
    return [
      {
        Label: 'Intro',
        Lookup: 'limited-trial-tour',
        OpenAction: () => this.setSideBarAction('welcome')
      },
      {
        Label: 'Data Apps',
        Lookup: 'data-applications-tour',
        OpenAction: () => this.setSideBarAction('data-apps')
      },
      {
        Label: 'Data Flow Management',
        Lookup: 'data-flow-management-tour',
        OpenAction: () => this.setSideBarAction('data-flow')
      },
      {
        Label: 'Data Flow Tools',
        Lookup: 'data-flow-tool-tour',
        OpenAction: () => {
          this.setSideBarAction('data-flow');

          const clickEvent = new MouseEvent('click', { bubbles: true, view: window });
          const element = document.querySelector('lcu-data-flow-list-element .mat-card:nth-of-type(1) button');

          if (element) {
            element.dispatchEvent(clickEvent);
          }

          setTimeout(() => {
            this.startEmulatedDataFlowTour();
          }, 3000);
        }
      }
    ];
  }

  protected setSideBarAction(lookup: string): void {
    if (this.IdeState.CurrentEditor?.Lookup !== `lcu-limited-trial|${lookup}`) {
      this.ideState.SelectSideBarAction(lookup, 'lcu-limited-trial', 'Limited Low-Code Unit™ Trials');
    }
  }

  protected createGuidedTour(): GuidedTour {
    return {
      ID: 'app-tour',
      IsFirstTimeViewing: true,
      Lookup: 'limited-trial-tour',
      UseOrb: false,
      Steps: [
        {
          ID: '00000000-0000-0000-0000-000000000040',
          Title: 'Data Flow Management',
          Subtitle: 'Data Flow Management Tour',
          Selector: '.mat-tab-body-wrapper',
          Orientation: OrientationTypes.Left,
          ActionDelay: 5000,
          Content: `This is Bobby's test step.`
        },
        {
          ID: '00000000-0000-0000-0000-000000000041',
          Title: 'Emulated Data Flows',
          Subtitle: 'Data Flow Management Tour',
          Selector: 'lcu-data-flow-list-element .mat-tab-label:nth-of-type(1)',
          Orientation: OrientationTypes.Bottom,
          Content: 'We have created a sample best practice IoT environment for you to explore using an emulated data flow.'
        },
        {
          ID: '00000000-0000-0000-0000-000000000042',
          Title: 'Trial Data Flows',
          Subtitle: 'Data Flow Management Tour',
          Selector: 'lcu-data-flow-list-element .mat-tab-label:nth-of-type(2)',
          Orientation: OrientationTypes.Bottom,
          Content: 'Use our drag-and-drop interface to explore the tool and connect dummy Azure resources.'
        },
        // {
        //   Title: 'Data Flows',
        //   Subtitle: 'Limited Trial Tour',
        //   Selector: '.ide-side-bar-action:nth-of-type(2)',
        //   Content: `The <b>Data Flow Manager</b> is a powerful drag and drop interface for easily configuring and
        //   provisioning end-to-end cloud infrastructure. Navigate here to explore further.`,
        //   Orientation: OrientationTypes.Right,
        // },
        // {
        //   Title: 'Data Applications',
        //   Subtitle: 'Limited Trial Applications Tour',
        //   Selector: '.ide-side-bar-action:nth-of-type(3)',
        //   Content: `<b>Data applications</b> are quick and easy ways to build and deliver enterprise scalable experiences to your users.
        //   Create your own, configure your own, or use pre-existing applications.`,
        //   Orientation: OrientationTypes.Right
        // },
        // {
        //   Title: 'Emulated Data Flows',
        //   Subtitle: 'Data Flow Tour',
        //   Selector: 'lcu-data-flow-list-element .mat-tab-label:nth-of-type(1)',
        //   Orientation: OrientationTypes.Bottom,
        //   Content: 'We have created a sample best practice IoT environment for you to explore using an emulated data flow.'
        // },
        // {
        //   Title: 'Trial Data Flows',
        //   Subtitle: 'Data Flow Tour',
        //   Selector: 'lcu-data-flow-list-element .mat-tab-label:nth-of-type(2)',
        //   Orientation: OrientationTypes.Bottom,
        //   Content: 'Use our drag-and-drop interface to explore the tool and connect dummy Azure resources.'
        // },
        // {
        //   Title: 'Emulator',
        //   Subtitle: 'Emulated Data Flow Tour',
        //   Selector: '.flowchart-object[data-jtk-node-id="e7457c9c-c9b2-4955-b0a2-330b6244982d"]', // selects by attribute selector
        //   Orientation: OrientationTypes.Top,
        //   Content: 'Testing the selector out.'
        // },
        // {
        //   Title: 'Ingest',
        //   Subtitle: 'Emulated Data Flow Tour',
        //   Selector: '.flowchart-object[data-jtk-node-id="f0e0b225-5e51-44c2-8618-a48a0d7678de"]',
        //   Orientation: OrientationTypes.Top,
        //   Content: 'Testing the selector out.'
        // }
      ]
    };
  }

}
