import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuNapkinIdeWelcomeJourneysElementState {}

export class LcuNapkinIdeWelcomeJourneysContext extends LCUElementContext<LcuNapkinIdeWelcomeJourneysElementState> {}

export const SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT = 'lcu-napkin-ide-welcome-journeys-element';

@Component({
  selector: SELECTOR_LCU_NAPKIN_IDE_WELCOME_JOURNEYS_ELEMENT,
  templateUrl: './welcome-journeys.component.html',
  styleUrls: ['./welcome-journeys.component.scss']
})
export class LcuNapkinIdeWelcomeJourneysElementComponent extends LcuElementComponent<LcuNapkinIdeWelcomeJourneysContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}
