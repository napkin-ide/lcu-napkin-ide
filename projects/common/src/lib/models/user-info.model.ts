/**
 * UserInfo user for the user account sidenav and any other user info needed along the way
 * 
 * of development
 */
export class UserInfoModel {
    /**
     * Username of the user
     */
    public Username?: string;

    /**
     * Email of the user
     */
    public Email?: string;

    /**
     * The Date when the user signed up for the free trial
     */
    public FreeTrialSignUp?: Date

    /**
     * The date when the users free trial will expire
     */
    public ExpirationDate?: Date

    /**
     * When the user signed up for the paid version
     */
    public PaidSignUpDate?: Date


    /**
     * the name of the organization that the user belongs to
     */
    public Organization?: string

}