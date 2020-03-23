import { IdeUserAccessState, } from './ide-user-access.state';
import { StateManagerContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdeUserAccessStateManagerContext extends StateManagerContext<IdeUserAccessState> {
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

  protected loadStateKey(): Promise<string> {
    return Promise.resolve('init');
  }

  protected loadStateName(): Promise<string> {
    return Promise.resolve('napkin-ide-setup');
  }
}
