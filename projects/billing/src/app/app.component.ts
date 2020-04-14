import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToggleThemeUtil } from '@lcu/common';
import { ActivatedRoute } from '@angular/router';
import { UserBillingStateContext } from '@napkin-ide/lcu-napkin-ide-common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public SelectedTheme: string;

  public RedirectUri: string;

  public State: any;

  public Username: string;

  constructor(
    protected overlayContainer: OverlayContainer,
    protected route: ActivatedRoute,
    protected userBillState: UserBillingStateContext,) {
      
      this.route.queryParams.subscribe(params => {
        this.RedirectUri = params['redirectUri'];  // Set redirectUri to some local property on the component
      });
      this.Username = 'Guest';
    }

  public ngOnInit(): void {
    this.userBillState.Context.subscribe((state: any) => {
      this.State = state;
      this.stateChanged();
    });
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

   protected stateChanged(){
     console.log("Billing App State Changed", this.State);
     if(this.State.Username){
       this.Username = this.State.Username;
     }
   }
}
