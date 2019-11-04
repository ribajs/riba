import { Utils, EventDispatcher } from '@ribajs/core';

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

export class WrapperService {

  public static inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  protected static ERRORS = {
    EASDK_NOT_FOUND: `Shopify's EASDK is required!
    Add <script src="https://cdn.shopify.com/s/assets/external/app.js"></script> to your html head.
    See https://help.shopify.com/en/api/embedded-apps/embedded-app-sdk for more informations.`,
  };

  public event = new EventDispatcher('shopify-easdk');

  protected shopifyApp: IEASDK;

  constructor(
    shopifyApp?: IEASDK,
  ) {
    if (!shopifyApp && !ShopifyApp) {
      throw new Error(WrapperService.ERRORS.EASDK_NOT_FOUND);
    }
    this.shopifyApp = shopifyApp || ShopifyApp;
  }

  public useFallback(force: boolean) {
    return !WrapperService.inIframe() || force;
  }
}
