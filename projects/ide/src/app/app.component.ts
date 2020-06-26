import { Component, OnInit } from '@angular/core';
import { FaviconsService } from '@lcu/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToggleThemeUtil } from '@lcu/common';
import { UserManagementState } from '@napkin-ide/lcu-napkin-ide-common/napkin-ide-lcu-napkin-ide-common';

@Component({
  selector: 'nide-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public SelectedTheme: string;

  constructor(
    protected faviconsService: FaviconsService,
    protected overlayContainer: OverlayContainer
  ) { }

  /**
   * Angular Lifecycle Hook
   */
  public ngOnInit() {
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
    // this.changeTheme('ivy-light-theme');
    this.changeTheme('contrast');
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
