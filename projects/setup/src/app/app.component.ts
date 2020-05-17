import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ToggleThemeUtil } from '@lcu/common';
import { IDEAction, IDEActionTypes } from '@napkin-ide/lcu-napkin-ide-common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public IsHandset$: Observable<boolean>;

  public NavLinks: IDEAction[];

  public SelectedTheme: string;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected overlayContainer: OverlayContainer) {}

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
          return this.breakpointObserver.isMatched('(max-width: 959px)');
        })
      );

    this.resetTheme();

    this.NavLinks = [
      {
        Action: 'https://github.com/lowcodeunit',
        Icon: 'save_alt',
        Text: '',
        Type: IDEActionTypes.ExternalLink
      },
      {
        Action: 'https://support.fathym.com/',
        Icon: 'assignment',
        Text: '',
        Type: IDEActionTypes.ExternalLink
      },
      {
        Action: 'mailto:support@fathym.com?subject=Fathym%20IDE%20Support%20-%20____&body=Please%20provide%20us%20as%20much%20detail%20as%20you%20can%20so%20that%20we%20may%20better%20support%20you.',
        Icon: 'help_outline',
        Text: '',
        Type: IDEActionTypes.Link
      }
    ];
  }

  /**
   * Component loaded when routes change
   *
   * @param evt router event
   */
  public OnActivate(evt: Event): void {
    // this.routeChanged();
  }

  /**
   * Reset material theme
   */
  protected resetTheme(): void {
    this.changeTheme('ivy-light-theme');
  }

  /**
   * Toggle through Fathym themes
   *
   * @param val theme type
   */
  protected changeTheme(val: string): void {
    this.SelectedTheme = val;

    const element: HTMLElement = this.overlayContainer.getContainerElement();
    const classList: DOMTokenList = element.classList;

    const toggleTheme: ToggleThemeUtil = new ToggleThemeUtil();
    classList.add(ToggleThemeUtil.Toggle(element.classList, val));
   }
}
