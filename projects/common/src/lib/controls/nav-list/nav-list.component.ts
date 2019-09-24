import { Component, OnInit, Input } from '@angular/core';
import { NavListModel } from '../../models/nav-list.model';

@Component({
  selector: 'lcu-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  /**
   * Input property for logo
   */
  // tslint:disable-next-line:no-input-rename
  @Input('logo-url')
  public LogoURL: string;

  private _logoClass: string;
  // tslint:disable-next-line:no-input-rename
  @Input('logo-class')
  public LogoClass: string;

  /**
   * Input property for logo alt text
   */
  // tslint:disable-next-line:no-input-rename
  @Input('logo-alt')
  public LogoAlt: string;
  /**
   * Input property for navigation links
   */
  // tslint:disable-next-line:no-input-rename
  @Input('nav-links')
  public NavLinks: Array<NavListModel>;

  // tslint:disable-next-line:no-input-rename
  @Input('show-icon')
  public ShowIcon: boolean;

  constructor() { }

  ngOnInit() {
  }

}
