import { Injectable, Injector } from '@angular/core';
import { DAFService, IdeActivity } from '@lcu/common';
import { IdeStateChange, IdeState, IdeStateChangeTypes } from '@napkin-ide/lcu-napkin-ide-common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdeStateService extends DAFService {
  //  Fields
  protected state: IdeState;

  protected stateChange: BehaviorSubject<IdeStateChange>;

  //  Properties
  public StateChange: Observable<IdeStateChange>;

  //  Consturctors
  constructor(injector: Injector) {
    super(injector);

    // this.state = <IdeState>{
    //   Loading: false,
    //   Activities: [{
    //     Icon: 'cloud',
    //     IconSet: null,
    //     Lookup: 'lcu-infrastructure',
    //     Title: 'Infrastructure'
    //   }],
    //   CurrentActivity: null,
    //   CurrentEditor: null,
    //   CurrentPanel: null,
    //   Editors: [{
    //     Title: 'Solutions - Applications (Overview)',
    //     Editor: '',
    //     Lookup: 'lcu-infrastructure',
    //     Toolkit: ''
    //   }, {
    //     Title: 'Solutions - Flux (Documentation)',
    //     Editor: '',
    //     Lookup: 'lcu-infrastructure',
    //     Toolkit: ''
    //   }],
    //   Panels: [{
    //     Title: 'Output',
    //     Editor: '',
    //     Lookup: 'lcu-infrastructure',
    //     Toolkit: ''
    //   }, {
    //     Title: 'Flux Modules',
    //     Lookup: 'lcu-infrastructure',
    //     Editor: '',
    //     Toolkit: ''
    //   }],
    // SideBar: {
    //   Sections: [{
    //     Actions: [{
    //       Action: '',
    //       Group: '',
    //       Title: 'Applications'
    //     }, {
    //       Action: '',
    //       Group: '',
    //       Title: 'Package Sources'
    //     }],
    //     FindNewText: 'Find More Solutions',
    //     Title: 'Solutions'
    //   },
    //   {
    //     Actions: [{
    //       Action: '',
    //       Group: '',
    //       Title: 'Service & Maintenance'
    //     }],
    //     FindNewText: 'Find New Partners',
    //     Title: 'Partners'
    //   }],
    //   Title: 'Infrastructure'
    //},
    // StatusChanges: []
    // };

    this.stateChange = new BehaviorSubject<IdeStateChange>({
      Types: [IdeStateChangeTypes.Reset],
      State: this.state
    });

    this.StateChange = this.stateChange.asObservable();

    //  Why wasn't Reset getting sent to all subscribers??  Just the first??  This should not be necessary
    setTimeout(() => {
      this.sendState(IdeStateChangeTypes.Reset);
    }, 0);
  }

  //  API Methods
  public AddStatusChange(status: string) {
    this.state.StatusChanges.push(status);

    this.sendState(IdeStateChangeTypes.Status);
  }

  public RemoveNextStatusChange() {
    if (this.state.StatusChanges.length <= 0) {
      return '';
    }

    const status = this.state.StatusChanges.shift();

    this.sendState(IdeStateChangeTypes.Status);

    return status;
  }

  public SetCurrentActivity(activity: IdeActivity) {
    this.state.CurrentActivity = activity;

    this.sendState(IdeStateChangeTypes.Activity);
  }

  //  Helpers
  protected sendState(...types: IdeStateChangeTypes[]) {
    this.stateChange.next({
      Types: types,
      State: this.state
    });
  }
}
