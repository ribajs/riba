import {
  IEASDK,
  IEASDKWrapper,
  IBarConfig,
  IBar,
  IBarWrapper,
  ILoadingStateWrapper,
  IConfig,
  IPaginationConfig,
  IButtonConfig,
  ButtonCallback,
  IModal,
  IModalWrapper,
  IModalInit,
  IModalAlertOptions,
  IModalConfirmOptions,
  IModalInputOptions,
  IProductPickerOptions,
  ProductPickerCallback,
  IUser,
  IUserData,
  IReceiveMessage,
  ShopifyApp,
} from '../interfaces/shopify-easdk';

import { WrapperService } from './wrapper.service';

export class UserWrapperService extends WrapperService implements IUser {

  // Singleton instace
  public static instance?: UserWrapperService;

  constructor(
    shopifyApp?: IEASDK,
  ) {
    super(shopifyApp);
    if (UserWrapperService.instance) {
      return UserWrapperService.instance;
    }
    UserWrapperService.instance = this;
  }

  get current(): IUserData | undefined {
    if (this.shopifyApp.User) {
      return this.shopifyApp.User.current;
    } else {
      // this.shopifyApp.User is undefined if we are not in iframe
      return undefined; // TODO
    }
  }
}
