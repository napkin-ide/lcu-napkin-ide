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

  protected loadStateKey() {
    return 'init';
  }

  protected loadStateName() {
    return 'napkin-ide-setup';
  }
}
