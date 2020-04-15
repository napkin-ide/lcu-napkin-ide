import { Status } from '@lcu/common';

export class UserBillingState {
  public CustomerName?: string;

  public FeaturedPlanGroup?: string;

  public Loading?: boolean;

  public PaymentMethodID?: string;

  public PaymentStatus?: Status;

  public Plans?: BillingPlanOption[];

  public RequiredOptIns?: string[];

  public Status?: Status;

  public Username?: string;

}

export class BillingPlanOption {
  public DataApps?: number;

  public Description?: string;

  public DataFlows?: number;

  public DiscountedFrom?: string;

  public Interval?: string;

  public LCUs?: number;

  public Lookup?: string;

  public Name?: string;

  public PlanGroup?: string;

  public Price?: number;
}
