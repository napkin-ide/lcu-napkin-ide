import { IdeUserAccessState, } from './ide-user-access.state';
import { StateContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdeUserAccessStateManagerContext extends StateContext<IdeUserAccessState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public RequestUserAccess() {
    this.Execute({
      Arguments: {},
      Type: 'RequestUserAccess'
    });
  }

  //  Helpers
  protected defaultValue() {
   return { Loading: true } as IdeUserAccessState;
  }

  protected loadStateKey(): any {
    return Promise.resolve('init');
  }

  protected loadStateName(): any {
    return Promise.resolve('napkin-ide-setup');
  }
}
