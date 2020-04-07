import { BillingPlanOption, UserBillingState } from './user-billing.state';
import { StateContext } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserBillingStateContext extends StateContext<UserBillingState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public SetPaymentMethod(methodId: string) {
    this.Execute({
      Arguments: {
        MethodID: methodId,
      },
      Type: 'SetPaymentMethod',
    });
  }

  //  Helpers
  protected defaultValue() {
    return { Loading: true } as UserBillingState;
  }

  protected loadStateKey(): string {
    return 'billing';
  }

  protected loadStateName(): string {
    return 'usermanagement';
  }
}
