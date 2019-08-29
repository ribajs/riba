import { IEASDK, IUser, IUserData } from '../interfaces/shopify-easdk';
import { WrapperService } from './wrapper.service';
export declare class UserWrapperService extends WrapperService implements IUser {
    static instance?: UserWrapperService;
    constructor(shopifyApp?: IEASDK);
    readonly current: IUserData | undefined;
}
