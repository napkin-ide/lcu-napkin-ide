import { Status } from '@lcu/common';

export class UserBillingState {
  public CustomerName?: string;

  public Loading?: boolean;

  public PaymentMethodID?: string;

  public PaymentStatus?: Status;

  public Plans?: BillingPlanOption[];

  public Status?: Status;

  public Username?: string;
}

export class BillingPlanOption {
  public Description?: string;

  public Lookup?: string;

  public Name?: string;

  public Price?: number;
}
