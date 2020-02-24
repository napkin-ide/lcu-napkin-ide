import { Component, OnInit } from '@angular/core';
import { NavListModel } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public SettingsLinks: Array<NavListModel>;
  public SettingsTitle: string;

  constructor() { }

  public ngOnInit(): void {
    this.SettingsTitle = 'Enterprise IDE Settings';

    this.SettingsLinks = [
      { Label: 'Setup', RouterURL: '/setup', Icon: 'build'},
      { Label: 'Configuration', RouterURL: '/configuration', Icon: 'perm_data_setting'},
      { Label: 'Architecture', RouterURL: '/architecture', Icon: 'square_foot'},
      { Label: 'Marketplace', RouterURL: '/marketplace', Icon: 'shopping_basket'}
    ];
  }
}
