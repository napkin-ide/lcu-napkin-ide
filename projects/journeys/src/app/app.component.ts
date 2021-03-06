import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToggleThemeUtil } from '@lcu/common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public SelectedTheme: string;

  constructor(
    protected overlayContainer: OverlayContainer) {}

  public ngOnInit(): void {
    this.resetTheme();
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
