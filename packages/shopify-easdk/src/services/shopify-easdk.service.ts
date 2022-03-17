// rxjs
// import { Promise, Subscription, BehaviorSubject, Subject } from 'rxjs';

/* tslint:disable:member-ordering variable-name */

import { EventDispatcher } from "@ribajs/events";

import {
  EASDK,
  EASDKWrapper,
  // BarConfig,
  // Bar,
  // BarWrapper,
  LoadingStateWrapper,
  Config,
  PaginationConfig,
  ButtonConfig,
  // ButtonCallback,
  // Modal,
  // ModalWrapper,
  // ModalInit,
  // ModalAlertOptions,
  // ModalConfirmOptions,
  // ModalInputOptions,
  // ProductPickerOptions,
  // ProductPickerCallback,
  // User,
  // UserData,
  ReceiveMessage
  // ShopifyApp,
} from "../interfaces/shopify-easdk.js";

import { WrapperService } from "./wrapper.service.js";
import { BarWrapperService } from "./shopify-easdk-bar.service.js";
import { ModalWrapperService } from "./shopify-easdk-modal.service.js";
import { UserWrapperService } from "./shopify-easdk-user.service.js";

// import { AlertComponent } from './alert/alert.component';
// import { ConfirmComponent } from './confirm/confirm.component';
// import { OpenComponent } from './open/open.component';

export class EASDKWrapperService
  extends WrapperService
  implements EASDKWrapper
{
  public static instance?: EASDKWrapperService;

  public event = new EventDispatcher("shopify-easdk");

  protected config: Config = { shopOrigin: "", apiKey: "" };

  protected message?: ReceiveMessage;

  public Bar: BarWrapperService;
  public Modal: ModalWrapperService;
  public User: UserWrapperService;

  constructor(shopifyApp?: EASDK) {
    super(shopifyApp);
    this.Bar = new BarWrapperService(this.shopifyApp);
    this.Modal = new ModalWrapperService(this.shopifyApp);
    this.User = new UserWrapperService(this.shopifyApp);
    if (EASDKWrapperService.instance) {
      return EASDKWrapperService.instance;
    }
    this.listenForMessage();
    EASDKWrapperService.instance = this;
  }

  /**
   * Receive EASDK messages and listen for them
   * Subscribe `message$' to get the messages!
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
   */
  protected listenForMessage() {
    window.addEventListener(
      "message",
      (event) => {
        let data = {};
        let message = "";
        try {
          const _data = JSON.parse(event.data);
          data = _data.data;
          message = _data.message;
        } catch (error) {
          console.debug("Error on parse message data", error);
        }
        this.message = {
          message,
          data
        };
        console.debug("Receive message:", event, message, data);
      },
      false
    );

    this.event.on(
      "bar:loading",
      (fallback: boolean, loading: LoadingStateWrapper) => {
        console.debug("bar:loading", fallback, loading);
      }
    );

    this.event.on(
      "bar:loadingOn",
      (fallback: boolean, loading: LoadingStateWrapper) => {
        console.debug("bar:loadingOn", fallback, loading);
      }
    );

    this.event.on(
      "bar:loadingOff",
      (fallback: boolean, loading: LoadingStateWrapper) => {
        console.debug("bar:loadingOff", fallback, loading);
      }
    );

    this.event.on("bar:setTitle", (fallback: boolean, title: string) => {
      console.debug("bar:setTitle", fallback, title);
    });

    this.event.on("bar:setIcon", (fallback: boolean, icon: string) => {
      console.debug("bar:setIcon", fallback, icon);
    });

    this.event.on(
      "bar:setPagination",
      (fallback: boolean, config: PaginationConfig) => {
        console.debug("bar:setPagination", fallback, config);
      }
    );

    this.event.on(
      "bar:setBreadcrumb",
      (fallback: boolean, config: ButtonConfig) => {
        console.debug("bar:setBreadcrumb", fallback, config);
      }
    );
  }

  /**
   * Should be called immediately after the script file has loaded,
   * as early as possible on the page (not in a jQuery.ready() or something).
   * It will initialize data values, add postMessage listeners,
   * check that the app is embedded in an iframe, and setup our initializers.
   */
  public init(config: Config): void {
    this.config = config;
    this.shopifyApp.init(config);
    return;
  }

  /**
   * Works similarly to jQuery's ready() function.
   * It can be called many times on a page, it accepts functions,
   * and when the Admin and the app are loaded it will call the functions in order.
   *
   * ```
   * shopifyApp.ready(function(){
   *   alert("Ready");
   * });
   * ```
   */
  public ready(cb: () => void): void {
    return this.shopifyApp.ready(cb);
  }

  /**
   * Used to rewrite the current URL. This is called automatically and probably doesn't need to be explicitly called at all.
   *
   * @param {string} path The path to rewrite in the current URL outsite of the iframe
   * @returns {void}
   * @memberof EASDKWrapperService
   */
  public pushState(path: string): void {
    return this.shopifyApp.pushState(path);
  }

  /**
   * Displays a message in the Shopify admin chrome styled as a notice. Use only for successful or neutral messages.
   * `shopifyApp.flashNotice("Unicorn was created successfully.");`
   *
   * @param message The message to show
   * @param forceFallback Force the fallback mode which is used if you are not in the shopify iframe
   * @memberof EASDKWrapperService
   */
  public flashNotice(message: string, forceFallback = false): void {
    this.event.trigger("flashNotice", message, forceFallback);
    return this.shopifyApp.flashNotice(message);
  }

  /**
   * Displays a message in the Shopify admin chrome styled as an error. Use only for errors or failures.
   *
   * `shopifyApp.flashError("Unicorn could not be created.");`
   *
   * @param {string} message The message to show
   * @param {boolean} [forceFallback] Force the fallback mode which is used if you are not in the shopify iframe
   * @param {string} [action] Label for the optional action button, only available in fallback mode
   * @param {() => Promise<void>} [onAction] Promise which fires when the action button is clicked
   * @returns {void}
   * @memberof EASDKWrapperService
   */
  public flashError(message: string, forceFallback = false): void {
    this.event.trigger("flashError", message, forceFallback);
    return this.shopifyApp.flashError(message);
  }

  /**
   * Dispatches away from the app and into another section in the Shopify admin.
   * The path should be prefixed with a slash, but should not include the /admin part.
   * Example: /customers/120999015 or /settings/domains.
   *
   * @param {string} path The path to redirect the user
   * @returns {void}
   * @memberof EASDKWrapperService
   */
  public redirect(path: string, forceFallback = false): void {
    console.debug("redirect", path);
    if (this.useFallback(forceFallback)) {
      const config = this.config;
      if (!config.shopOrigin || config.shopOrigin.length <= 0) {
        console.error("You need to call the init function first!");
        return;
      }
      const href = config.shopOrigin + "/admin" + path;
      console.debug("redirect in fallbackmode to", href);
      window.location.href = href;
    } else {
      return this.shopifyApp.redirect(path);
    }
  }
}
