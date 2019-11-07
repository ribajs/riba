import {
  EASDK,
  EASDKWrapper,
  BarConfig,
  Bar,
  BarWrapper,
  LoadingStateWrapper,
  Config,
  PaginationConfig,
  ButtonConfig,
  ButtonCallback,
  Modal,
  ModalWrapper,
  ModalInit,
  ModalAlertOptions,
  ModalConfirmOptions,
  ModalInputOptions,
  ProductPickerOptions,
  ProductPickerCallback,
  User,
  UserData,
  ReceiveMessage,
  ShopifyApp,
} from '../interfaces/shopify-easdk';

import { WrapperService } from './wrapper.service';

export class UserWrapperService extends WrapperService implements User {

  // Singleton instace
  public static instance?: UserWrapperService;

  constructor(
    shopifyApp?: EASDK,
  ) {
    super(shopifyApp);
    if (UserWrapperService.instance) {
      return UserWrapperService.instance;
    }
    UserWrapperService.instance = this;
  }

  get current(): UserData | undefined {
    if (this.shopifyApp.User) {
      return this.shopifyApp.User.current;
    } else {
      // this.shopifyApp.User is undefined if we are not in iframe
      return undefined; // TODO
    }
  }
}
