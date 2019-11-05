import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdeStateStateManagerContext } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'nide-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {

  public IsHandset$: Observable<boolean>;
  public IsOpen: boolean = true;
  public Loading: boolean = false;
  public ShowPanels: boolean = false;

  constructor(
    protected breakpointObserver: BreakpointObserver,
    protected ideState: IdeStateStateManagerContext
  ) { }

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

    this.ideState.Context.subscribe(ideState => {
      this.Loading = ideState.Loading;
      this.ShowPanels = ideState.ShowPanels;
    });
  }

  public OpenSideBar(): void {
    this.IsOpen = !this.IsOpen;
  }

}
