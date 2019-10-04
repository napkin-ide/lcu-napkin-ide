import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { FathymSharedModule } from '@lcu/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  LcuNapkinIdeModule,
  SelectorLcuNapkinIdeShellHostElement,
  LcuNapkinIdeShellHostElementComponent
} from '@napkin-ide/lcu-napkin-ide-common';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, FathymSharedModule, LcuNapkinIdeModule.forRoot()],
  exports: [LcuNapkinIdeModule]
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const dfMgr = createCustomElement(LcuNapkinIdeShellHostElementComponent, { injector: this.injector });

    customElements.define(SelectorLcuNapkinIdeShellHostElement, dfMgr);
  }
}
