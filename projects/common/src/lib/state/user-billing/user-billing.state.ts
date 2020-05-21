import { Status } from '@lcu/common';

export class UserBillingState {
  public CustomerName?: string;

  public FeaturedPlanGroup?: string;

  public Loading?: boolean;

  public LicenseType?: LicenseTypeDetails;

  public PaymentMethodID?: string;

  public PaymentStatus?: Status;

  public Plans?: BillingPlanOption[];

  public PopularPlanGroup?: string;

  public RequiredOptIns?: string[];

  public Status?: Status;

  public Username?: string;

  public PurchasedPlanLookup?: string; 

}

export class BillingPlanOption {
  public DataApps?: number;

  public Description?: string;

  public DataFlows?: number;

  public DiscountedFrom?: string;

  public Interval?: string;

  public LCUs?: number;

  public Lookup?: string;

  public LicenseType?: LicenseTypeDetails;

  public Name?: string;

  public PlanGroup?: string;

  public Price?: number;

  public PlanFeatures?: string;

  public TrialPeriodDays?: number;

  public PointQueries?: string;
}
export class LicenseTypeDetails {
  public Lookup: string; // Would contain the actual license type value 'LCU' or 'forecaster' or whatever else comes down the line

  public Name: string;  //  Use this value for display the license type name to a user
}
