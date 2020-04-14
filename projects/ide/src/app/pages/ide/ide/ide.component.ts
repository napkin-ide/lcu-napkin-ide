import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdeStateStateManagerContext, IdeManagementState } from '@napkin-ide/lcu-napkin-ide-common';
import { GuidedTour, GuideBotScreenPosition, Orientation } from '@lowcodeunit/lcu-guided-tour-common';

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
  public EnableChat: boolean = false;

  public IsHandset$: Observable<boolean>;
  public IsOpen: boolean = true;
  public Loading: boolean = false;
  public ShowPanels: boolean = false;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected ideState: IdeStateStateManagerContext
  ) {
    this.AppTour = this.createGuidedTour();
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
      this.Loading = ideState.Loading;
      this.ShowPanels = ideState.ShowPanels;
    });
  }

  public OpenSideBar(): void {
    this.IsOpen = !this.IsOpen;
  }

  protected createGuidedTour(): GuidedTour {
    return {
      tourId: 'app-tour',
      useOrb: false,
      steps: [
        {
          title: 'Welcome to Fathym!',
          subtitle: 'Welcome Tour',
          selector: '.mat-tab-body-wrapper',
          content: `Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here. Welcome to the tour! As you can see, you can highlight certain elements of an application
          and display more information here.`,
          orientation: Orientation.Left
        },
        {
          title: 'Data Flow',
          subtitle: 'Welcome Tour',
          selector: '.flowchart-object',
          content: `This is a Data Flow Object.`,
          orientation: Orientation.Left
        }
      ]
    };
  }

}
