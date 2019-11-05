import { Component, OnInit } from '@angular/core';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';
import { FaviconsService } from '@lcu/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToggleThemeUtil } from '@lcu/common';

@Component({
  selector: 'nide-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public SelectedTheme: string;
  public ShowPanels: boolean;

  constructor(
    protected faviconsService: FaviconsService,
    protected ideState: IdeStateStateManagerContext,
    protected overlayContainer: OverlayContainer
  ) { }

  /**
   * Angular Lifecycle Hook
   */
  public ngOnInit() {
    this.ideState.Context.subscribe(ideState => {
      this.ShowPanels = ideState.ShowPanels;
    });

    this.resetFavicon();
    this.resetTheme();
  }

  /**
   * Set default favicon
   */
  protected resetFavicon(): void {
    this.faviconsService.reset();
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
