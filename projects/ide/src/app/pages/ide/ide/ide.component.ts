import { Component, OnInit, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDEStateManagementContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import {
  GuidedTour,
  GuideBotScreenPosition,
  TourStep,
  GuidedTourManagementStateContext,
  GuidedTourManagementState,
  GuidedTourService,
  ChatTourButton
} from '@lowcodeunit/lcu-guided-tour-common';

@Component({
  selector: 'nide-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  public AppTour: GuidedTour;
  public BotBoundingContainer: string = '#ideMainSideBar';
  public BotPadding: number = 5;
  public BotScreenPosition: GuideBotScreenPosition = GuideBotScreenPosition.BottomLeft;
  public EnableChat: boolean = true;
  public EnableFirstTimePopup: boolean = true;
  public GuidedTourState: GuidedTourManagementState;
  public IdeState: IdeManagementState;
  public IsHandset$: Observable<boolean>;
  public IsOpen: boolean = true;
  public Loading: boolean = false;
  public ShowPanels: boolean = false;
  public TourButtons: ChatTourButton[];
  public Tours: GuidedTour[] = [];

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected elRef: ElementRef,
    protected ideState: IDEStateManagementContext,
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
      this.IdeState = ideState;
      this.Loading = ideState.Loading;
      this.ShowPanels = ideState.ShowPanels;

      this.handleStateChanged();
    });

    this.guidedTourState.Context.subscribe((guidedTourState: GuidedTourManagementState) => {
      // console.log('GUIDED TOUR STATE: ', guidedTourState);
      this.GuidedTourState = guidedTourState;
      this.AppTour = guidedTourState.CurrentTour;
      this.Tours = guidedTourState.Tours;

      if (guidedTourState.CurrentTour && (this.AppTour?.Lookup !== guidedTourState.CurrentTour.Lookup)) {
        this.AppTour = this.Tours.find((tour: GuidedTour) => tour.Lookup === guidedTourState.CurrentTour.Lookup);

        if (this.AppTour?.IsFirstTimeViewing) {
          this.guidedTourService.startTour(this.AppTour);
        }
      }

    });
  }

  public OpenSideBar(): void {
    this.IsOpen = !this.IsOpen;
  }

  public OnStepClosed(step: TourStep): void {
    if (step.ID === '00000000-0000-0000-0000-000000000020') {
      this.ideState.SelectSideBarAction('welcome', 'lcu-limited-trial', 'Limited Low-Code Unit™ Trials');
    }
    if (step.ID === '00000000-0000-0000-0000-000000000031') {
      this.findDataAppSettingsButton();
    }
  }

  public OnStepOpened(step: TourStep): void {
    if (step.ID === '00000000-0000-0000-0000-000000000041') {
      this.findDataFlowManageButton();
    }
  }

  public OnComplete(tour: GuidedTour): void {
    console.log(`OnComplete() The tour: '${tour.Lookup}' is complete.`);
    // TODO: Update 'IsFirstTimeViewing' flag to false in State when tour is complete
  }

  public OnSkipped(tour: GuidedTour): void {
    console.log(`OnSkipped() The tour: '${tour.Lookup}' has been skipped.`);
    // TODO: Update 'IsFirstTimeViewing' flag to false in State when tour is skipped
  }

  protected handleStateChanged(): void {
    this.determineTour();
  }

  protected determineTour(): void {
    const editor = this.IdeState.CurrentEditor?.Editor;

    if (this.IdeState.CurrentActivity?.Lookup === 'limited-trial') {
      switch (editor) {
        case 'lcu-limited-trial-welcome-element':
          this.setCurrentTour('limited-trial-tour');
          break;
        case 'lcu-limited-trial-data-apps-element':
          this.setCurrentTour('data-applications-tour');
          break;
        case 'lcu-limited-trial-data-flow-element':
          this.setCurrentTour('data-flow-management-tour');
          setTimeout(() => {
            this.findDataFlowManageButton();
          }, 3000);
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
    }
  }

  protected findDataAppSettingsButton(): void {
    const element = this.elRef.nativeElement.querySelector('lcu-app-list .mat-card:nth-of-type(1) button');
    const clickEvent = new MouseEvent('click', { bubbles: true, view: window });

    if (element) {
      element.dispatchEvent(clickEvent);
    } else {
      console.warn('Could not find button for Data Apps Settings');
    }
  }

  protected findDataFlowManageButton(): void {
    const element = this.elRef.nativeElement.querySelector('lcu-data-flow-list-element .mat-card:nth-of-type(1) button');

    if (element) {
      element.addEventListener('click', this.startEmulatedDataFlowTour.bind(this));
    } else {
      console.warn('Could not find button for Emulated Data Flow');
    }
  }

  protected startEmulatedDataFlowTour(): void {
    this.setCurrentTour('data-flow-tool-tour');
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

          this.startEmulatedDataFlowTour();
        }
      }
    ];
  }

  protected setSideBarAction(lookup: string): void {
    if (this.IdeState.CurrentEditor?.Lookup !== `lcu-limited-trial|${lookup}`) {
      this.ideState.SelectSideBarAction(lookup, 'lcu-limited-trial', 'Limited Low-Code Unit™ Trials');
    }
  }

}
