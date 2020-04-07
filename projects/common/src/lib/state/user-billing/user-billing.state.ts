import { Status } from '@lcu/common';

export class UserBillingState {
  public Loading?: boolean;

  public PaymentMethodID?: string;

  public Plans?: BillingPlanOption[];

  public Status?: Status;
}

export class BillingPlanOption {
  public Description?: string;

  public Lookup?: string;

  public Name?: string;

  public Price?: number;
}
