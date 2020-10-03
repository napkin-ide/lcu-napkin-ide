import { Component } from '@angular/core';
import { NavListModel } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public SelectedTheme: string;
  public SettingsLinks: Array<NavListModel>;
  public SettingsTitle: string;


  constructor()  {}

  public ngOnInit(): void {
    this.resetTheme();
    this.SettingsTitle = 'IDE Settings';

    this.SettingsLinks = [
      // { Label: 'Architecture', RouterURL: '/architecture', Icon: 'square_foot', Id: 'settingsArchitectureNavLink' },
      { Label: 'Configuration', RouterURL: '/configuration', Icon: 'perm_data_setting', Id: 'settingsConfigurationNavLink' },
      { Label: 'Setup', RouterURL: '/setup', Icon: 'build', Id: 'settingsSetupNavLink' },
      { Label: 'Marketplace', RouterURL: '/marketplace', Icon: 'shopping_basket', Id: 'settingsMarketplaceNavLink' }
    ];
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
   }
}
