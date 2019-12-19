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
    this.SettingsTitle = 'Enterprise IDE Settings';

    this.SettingsLinks = [
      { Label: 'Setup', RouterURL: '/setup', Icon: 'build'},
      { Label: 'Configuration', RouterURL: '/configuration', Icon: 'perm_data_setting'},
      { Label: 'Architecture', RouterURL: '/architecture', Icon: 'square_foot'},
      { Label: 'Marketplace', RouterURL: '/marketplace', Icon: 'shopping_basket'}
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
