import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { NavListModel } from '../../models/nav-list.model';

@Component({
  selector: 'lcu-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  /**
   * Input property to hide / show side nav
   */
  // tslint:disable-next-line:no-input-rename
  @Input('show-side-nav')
  public ShowSideNav: boolean;

  @Input('title')
  public Title: string;

  /**
   * Input property for logo
   */
  // tslint:disable-next-line:no-input-rename
  @Input('logo-url')
  public LogoURL: string;

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


  constructor(protected breakpointObserver: BreakpointObserver) { }

  public ngOnInit(): void {}

}
