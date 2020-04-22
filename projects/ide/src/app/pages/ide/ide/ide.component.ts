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
  public BotBoundingContainer: string = '#ideMainSideBar'; // .ide-overflowed / #ideMainSideBar
  public BotPadding: number = 5;
  public BotScreenPosition: GuideBotScreenPosition = GuideBotScreenPosition.BottomLeft;
  public EnableChat: boolean = true;
  public EnableFirstTimePopup: boolean = true;

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

  private clickDataFlowManageButton() {
    console.log('clickDataFlowManageButton()');
    let clickEvent = new MouseEvent('click', { bubbles: true, view: window });
    console.log('clickDataFlowManageButton() clickEvent: ', clickEvent);

    let element = document.querySelector('lcu-limited-trial-data-apps-element lcu-app-list .mat-card:nth-of-type(1) button');
    console.log('clickDataFlowManageButton() element: ', element);

    // let element = document.querySelector('.guided-tour-spotlight-overlay');
    if (element) {
      console.log('clickDataFlowManageButton() dispatchEvent');
      element.dispatchEvent(clickEvent);
    }
  }

  protected createGuidedTour(): GuidedTour {
    return {
      tourId: 'app-tour',
      useOrb: false,
      steps: [
        {
          title: 'Welcome to Fathym!',
          subtitle: 'Welcome Tour',
          content: `Welcome to Fathym's limited trial of our new and cutting-edge IDE! Building solutions
          doesn’t have to be so time-consuming and resource intensive. Our low-code framework radically reduces
          the time and resources required by your developer team. <br/><br/> Keep clicking to get the full tour!`
        },
        {
          title: 'Trial Applications',
          subtitle: 'Welcome Tour',
          selector: '.mat-expansion-panel:first-of-type',
          content: `Here you can find the list of applications that you have access to in this trial. With the
          full version, you'll gain access to dozens of more applications!`,
          orientation: Orientation.Right,
          actionDelay: 300,
          action: () => {
            this.ideState.SelectSideBarAction('data-apps', 'lcu-limited-trial', 'Limited Low-Code Unit™ Trials');
          }
        },
        {
          title: 'Data Applications',
          subtitle: 'Welcome Tour',
          selector: '.ide-side-bar-action:nth-of-type(3)',
          content: `Let's start by taking a look at <b>Data Applications</b>. Data flow Applications everything you need to manage
          your public and private applications.`,
          orientation: Orientation.Right,
        },
        {
          title: 'Data Applications',
          subtitle: 'Data Applications Tour',
          selector: '.mat-tab-body-wrapper',
          content: `Data applications are quick and easy ways to build and deliver enterprise scalable experiences to your users.
          Create your own, configure your own, or use pre-existing applications.`,
          orientation: Orientation.Left
        },
        {
          title: 'Manage an Existing Data Application',
          subtitle: 'Data Applications Tour',
          selector: 'lcu-limited-trial-data-apps-element lcu-app-list .mat-card:nth-of-type(1) button',
          content: `Let's manage an existing data app, so that we can see how our app is currently configured. <br/><br/>
          You can click the <b>Settings</b> button anytime to view/edit a Data Application.`,
          orientation: Orientation.Left,
          closeAction: () => {
            // this.clickDataFlowManageButton();
          }
        },
        {
          title: 'What a Nice Data Application',
          subtitle: 'Data Applications Tour',
          selector: 'lcu-data-apps-config > .mat-card',
          content: `Here's where we can manage and configure our data application. You can update the version of your
          data app here, as well as the application details of it like its name, description, and even the path you want
          to host it on. <br/><br/> Go ahead and start playing around! This is just a sandbox, so no need to worry about
          accidently breaking anything.`,
          orientation: Orientation.Left,
          actionDelay: 500,
          action: () => {
            this.clickDataFlowManageButton();
          }
        },
        // {
        //   title: 'What a Nice Data Application',
        //   subtitle: 'Data Applications Tour',
        //   selector: 'lcu-data-apps-config > .mat-card',
        //   content: `Here's where we can manage and configure our data application, in order to provision the resources we need for our
        //   applications. This is a drag-and-drop interface, so everything we need to do can be done right from within
        //   the UI! <br/><br/> Go ahead and start playing around! This is just a sandbox, so no need to worry about
        //   accidently provisioning a bunch of Azure resources.`,
        //   orientation: Orientation.Left,
        //   actionDelay: 500,
        //   action: () => {
        //     this.clickDataFlowManageButton();
        //   }
        // }
      ]
    };
  }

}
