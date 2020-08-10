import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  LcuNapkinIdeModule,
  SelectorLcuNapkinIdeShellHostElement,
  LcuNapkinIdeShellHostElementComponent,
} from '@napkin-ide/lcu-napkin-ide-common';
import { environment } from '../environments/environment';
//   LcuNapkinIdeWelcomeJourneysElementComponent,  SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT,


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuNapkinIdeModule,
  ],
  exports: [LcuNapkinIdeModule],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const dfMgr = createCustomElement(LcuNapkinIdeShellHostElementComponent, {
      injector: this.injector,
    });

    customElements.define(SelectorLcuNapkinIdeShellHostElement, dfMgr);


    // const welcomeJourneys = createCustomElement(
    //   LcuNapkinIdeWelcomeJourneysElementComponent,
    //   { injector: this.injector }
    // );

    // customElements.define(
    //   SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT,
    //   welcomeJourneys
    // );
  }
}
