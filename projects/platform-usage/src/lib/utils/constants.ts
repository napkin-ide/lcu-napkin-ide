// @dynamic
/**
 * @dynamic need this because there are static memebers
 */

import { UserInfoModel } from 'projects/common/src/lcu.api';



export class Constants {
    public TodaysDate = new Date();

    public static readonly USER_DATA: Array<UserInfoModel> = [
        {Email: "jake@statefarm.com", Username: "Jake From State Farm", FreeTrialSignUp: new Date(2020,0,1), ExpirationDate: new Date(2020,0,15) }
        
      ];
    }