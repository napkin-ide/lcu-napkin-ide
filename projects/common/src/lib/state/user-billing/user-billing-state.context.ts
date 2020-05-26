import { BillingPlanOption, UserBillingState } from './user-billing.state';
import { StateContext, Status } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';
import { forkJoin, combineLatest } from 'rxjs';
import { Router, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserBillingStateContext extends StateContext<UserBillingState> {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public CompletePayment(
    methodId: string,
    customerName: string,
    plan: string,
    trialPeriodDays: number
  ) {
    this.Execute({
      Arguments: {
        CustomerName: customerName,
        MethodID: methodId,
        Plan: plan,
        TrialPeriodDays: trialPeriodDays,
      },
      Type: 'CompletePayment',
    });
  }

  public ResetState(licenseType: string) {
    this.Execute({
      Arguments: { LicenseType: licenseType },
      Type: 'ResetStateCheck',
    });
  }

  //  Helpers
  protected callRefresh() {}

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
