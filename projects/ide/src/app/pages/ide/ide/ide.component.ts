import { Component, OnInit, ElementRef } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import {
  IDEStateManagementContext,
  IdeManagementState,
} from "@napkin-ide/lcu-napkin-ide-common";
import {
  GuidedTour,
  GuideBotScreenPosition,
  TourStep,
  GuidedTourManagementStateContext,
  GuidedTourManagementState,
  GuidedTourService,
  ChatTourButton,
  GuideBotSubItem,
} from "@lowcodeunit/lcu-guided-tour-common";

@Component({
  selector: "nide-ide",
  templateUrl: "./ide.component.html",
  styleUrls: ["./ide.component.scss"],
})
export class IdeComponent implements OnInit {
  public BotBoundingContainer: string = "#ideMainSideBar";
  public BotPadding: number = 5;
  public BotZIndex: number = 1000;
  public BotScreenPosition: GuideBotScreenPosition =
    GuideBotScreenPosition.BottomLeft;
  public BotSubItems: GuideBotSubItem[];
  public CurrentTour: GuidedTour;
  public EnableChat: boolean = false;
  public EnableFirstTimePopup: boolean = true;
  public GuidedTourState: GuidedTourManagementState;
  public IdeState: IdeManagementState;
  public IsHandset$: Observable<boolean>;
  public IsOpen: boolean = true;
  public IsTourOpen: boolean = false;
  public Loading: boolean = false;
  public ShowPanels: boolean = false;
  public TourButtons: ChatTourButton[];
  public Tours: GuidedTour[] = [];
  public ViewingForecast: boolean = false;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected elRef: ElementRef,
    // protected guidedTourService: GuidedTourService,
    // protected guidedTourState: GuidedTourManagementStateContext,
    protected ideState: IDEStateManagementContext
  ) {
    // this.BotSubItems = this.setBotSubItems();
    // this.guidedTourService.isTourOpenStream.subscribe(
    //   (tourLookup: string) => {
    //     this.IsTourOpen = tourLookup ? true : false;
    //   }
    // );
  }

  public ngOnInit(): void {
    this.IsHandset$ = this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .pipe(
        map((result) => {
          if (this.breakpointObserver.isMatched("(min-width: 960px)")) {
            this.IsOpen = true;
          }
          return this.breakpointObserver.isMatched("(max-width: 959px)");
        })
      );

    this.ideState.Context.subscribe((ideState: IdeManagementState) => {
      console.log("IDE State: ", ideState);
      this.IdeState = ideState;
      this.Loading = ideState.Loading;
      this.ShowPanels = ideState.ShowPanels;

      this.handleStateChanges();
      // this.removeThinkyFromForecast();
    });

    // this.guidedTourState.Context.subscribe((guidedTourState: GuidedTourManagementState) => {
    //   // console.log('GUIDED TOUR STATE: ', guidedTourState);
    //   this.GuidedTourState = guidedTourState;
    //   this.Tours = guidedTourState.Tours;

    // });
  }

  // protected removeThinkyFromForecast() {
  //   if (!this.IdeState || this.IdeState.Loading) { return; }

  //   if (this.IdeState.CurrentActivity.Lookup === 'fathym-forecast') {
  //     this.ViewingForecast = true;
  //   } else {
  //     this.ViewingForecast = false;
  //   }
  // }

  public OnComplete(tour: GuidedTour): void {
    console.log(`The tour: '${tour.Lookup}' is complete.`);
    if (tour.Lookup === "iot-developer-journey-tour") {
      this.setSideBarAction("welcome");
    }
  }

  public OnSettingsOpened(isOpen: boolean) {
    //   if (isOpen) {
    //     this.setCurrentTour('pro-settings-tour');
    //   }
  }

  public OnSkipped(tour: GuidedTour): void {
    console.log(`The tour: '${tour.Lookup}' has been skipped.`);
  }

  public OnStepChanged(step: TourStep): void {
    // console.warn(`onStepChanged() lookup: ${step.Lookup}`);
    switch (step.ID) {
      case "00000000-0000-0000-0000-000000000021":
        this.setSideBarAction("welcome");
        break;

      case "00000000-0000-0000-0000-000000000032":
        this.dispatchClickEvent("lcu-app-list .mat-card:nth-of-type(1) button");
        break;

      case "00000000-0000-0000-0000-000000000061":
        this.setSideBarAction("data-flow");
        break;

      case "00000000-0000-0000-0000-000000000062":
        if (
          this.IdeState.CurrentEditor?.Lookup !== `lcu-limited-trial|data-flow`
        ) {
          this.setSideBarAction("data-flow");
          this.pollForElement(
            "lcu-data-flow-list-element .mat-card:nth-of-type(1) button",
            null,
            true
          );
        } else {
          this.dispatchClickEvent(
            "lcu-data-flow-list-element .mat-card:nth-of-type(1) button"
          );
        }
        break;

      case "00000000-0000-0000-0000-000000000063":
        this.setSideBarAction("data-apps");
        break;

      case "00000000-0000-0000-0000-000000000064":
        this.dispatchClickEvent("lcu-app-list .mat-card:nth-of-type(1) button");
        break;

      case "00000000-0000-0000-0000-000000000082":
        this.dispatchClickEvent("#dataAppsAddNewAppBtn");
        break;

      default:
        break;
    }
  }

  public OpenSideBar(): void {
    this.IsOpen = !this.IsOpen;
  }

  // protected determineProTours(): void {
  //   const editor = this.IdeState.CurrentEditor?.Editor;

  //   switch (editor) {
  //     case 'lcu-data-apps-config-manager-element':
  //       this.setCurrentTour('pro-data-applications-tour');
  //       break;
  //     case 'lcu-data-flow-manager-element':
  //       this.pollForElement('lcu-data-flow-manager-element lcu-data-flow-list-element .mat-list-item a.mat-raised-button',
  //         this.startProDataFlowTour);
  //       break;
  //     default:
  //       this.setCurrentTour('pro-welcome-tour');
  //       break;
  //   }
  // }

  // protected determineTrialTours(): void {
  //   const editor = this.IdeState.CurrentEditor?.Editor;

  //   switch (editor) {
  //     case 'lcu-limited-trial-welcome-element':
  //       this.setCurrentTour('limited-trial-tour');
  //       this.pollForElement('lcu-limited-trial-welcome-element #startIotDevJourneyBtn', this.startIoTDeveloperTour);
  //       break;
  //     case 'lcu-limited-trial-data-apps-element':
  //       this.setCurrentTour('data-applications-tour');
  //       break;
  //     case 'lcu-limited-trial-data-flow-element':
  //       this.setCurrentTour('data-flow-management-tour');
  //       this.pollForElement('lcu-data-flow-list-element .mat-card:nth-of-type(1) button', this.startEmulatedDataFlowTour);
  //       break;
  //     default:
  //       this.setCurrentTour('limited-trial-tour');
  //       break;
  //   }
  // }

  protected dispatchClickEvent(selector: string): void {
    const element = this.elRef.nativeElement.querySelector(selector);
    const clickEvent = new MouseEvent("click", { bubbles: true, view: window });

    if (element) {
      element.dispatchEvent(clickEvent);
    } else {
      console.warn(`Could not dispatch click event for selector: ${selector}`);
    }
  }

  protected handleStateChanges(): void {
    // if (this.idestate.currentactivity?.lookup === 'core' || this.idestate.currentactivity?.lookup === 'data-flow') {
    //   this.determineprotours();
    //   this.tourbuttons = null;
    // } else if (this.idestate.currentactivity?.lookup === 'limited-trial') {
    //   this.determinetrialtours();
    //   this.tourbuttons = this.settourbuttons();
    // } else {
    //   this.setcurrenttour(null);
    // }
  }

  protected openExternalLink(link: string): void {
    window.open(link, "_blank");
  }

  protected pollForElement(
    selector: string,
    bindingFunction?: any,
    dispatch?: boolean
  ): void {
    let timeElapsed = 0;
    const timeInt = 100;
    const maxTimeElapsed = 10000;

    const visiblePoller$ = timer(0, timeInt).subscribe((_: any) => {
      timeElapsed += timeInt;

      const selectedElement = this.elRef.nativeElement.querySelector(selector);

      if (selectedElement) {
        if (bindingFunction) {
          selectedElement.addEventListener("click", bindingFunction.bind(this));
        }
        if (dispatch) {
          this.dispatchClickEvent(selector);
        }
        visiblePoller$.unsubscribe();
      } else if (!selectedElement && timeElapsed >= maxTimeElapsed) {
        console.warn(
          `The element: '${selector}' could not be found on the screen.`
        );
        visiblePoller$.unsubscribe();
      }
    });
  }

  // protected setBotSubItems(): GuideBotSubItem[] {
  //   return [
  //     new GuideBotSubItem({
  //       label: 'Start Tour',
  //       icon: 'launch',
  //       action: () => this.startTour()
  //     }),
  //     new GuideBotSubItem({
  //       label: 'Support',
  //       icon: 'support',
  //       action: () => this.openExternalLink('https://support.fathym.com/')
  //     }),
  //     new GuideBotSubItem({
  //       label: 'About Thinky',
  //       icon: 'info_outline',
  //       action: () => this.openExternalLink('https://fathym.com/2019/08/08/a-new-look-how-we-created-a-refreshed-brand-for-fathym/')
  //     })
  //   ];
  // }

  // protected setCurrentTour(lookup: string): void {
  //   if (!this.IsTourOpen) {
  //     this.CurrentTour = this.Tours ? this.Tours.find((tour: GuidedTour) => tour.Lookup === lookup) : null;

  //     if (this.GuidedTourState?.CurrentTour?.Lookup !== lookup) {
  //       this.guidedTourState.SetActiveTour(lookup);
  //     }
  //   }
  // }

  protected setSideBarAction(lookup: string): void {
    if (this.IdeState.CurrentEditor?.Lookup !== `lcu-limited-trial|${lookup}`) {
      this.ideState.SelectSideBarAction(
        lookup,
        "lcu-limited-trial",
        "Limited Low-Code Unit™ Trials"
      );
    }
  }

  // protected setTourButtons(): ChatTourButton[] {
  //   return [
  //     {
  //       Label: 'Intro',
  //       Lookup: 'limited-trial-tour',
  //       OpenAction: () => this.setSideBarAction('welcome')
  //     },
  //     {
  //       Label: 'Data Apps',
  //       Lookup: 'data-applications-tour',
  //       OpenAction: () => this.setSideBarAction('data-apps')
  //     },
  //     {
  //       Label: 'Data Flow Management',
  //       Lookup: 'data-flow-management-tour',
  //       OpenAction: () => this.setSideBarAction('data-flow')
  //     },
  //     {
  //       Label: 'Data Flow Tools',
  //       Lookup: 'data-flow-tool-tour',
  //       OpenAction: () => {
  //         this.setSideBarAction('data-flow');
  //         setTimeout(() => {
  //           this.pollForElement('lcu-data-flow-list-element .mat-card:nth-of-type(1) button', this.startEmulatedDataFlowTour, true);
  //         }, 500);
  //       }
  //     }
  //   ];
  // }

  // protected startProDataFlowTour(): void {
  //   this.setCurrentTour('pro-data-flow-tour');
  // }

  // protected startEmulatedDataFlowTour(): void {
  //   this.setCurrentTour('data-flow-tool-tour');
  // }

  // protected startIoTDeveloperTour(): void {
  //   this.setCurrentTour('iot-developer-journey-tour');
  //   this.startTour();
  // }

  // protected startTour(tour?: GuidedTour): void {
  //   this.guidedTourService.startTour(tour ? tour : this.CurrentTour);
  // }
}
