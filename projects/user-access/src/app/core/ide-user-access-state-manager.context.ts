import { IdeUserAccessState, LowCodeUnitSetupConfig, IdeUserAccessConfigSolution } from './ide-user-access.state';
import { StateManagerContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';
import { IdeActivity, IdeSideBarAction, DataFlowModulePackSetup } from '@lcu/common';

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
    return 'main';
  }

  protected loadStateName() {
    return 'ide-user-access';
  }
}
