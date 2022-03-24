import {
  EASDK,
  // EASDKWrapper,
  BarConfig,
  // Bar,
  BarWrapper,
  LoadingStateWrapper,
  // Config,
  PaginationConfig,
  ButtonConfig,
  ButtonsConfig,
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
  // ReceiveMessage,
  // ShopifyApp,
} from "../interfaces/shopify-easdk.js";

import { EventDispatcher } from "@ribajs/events";

import { State } from "@ribajs/router";

import { WrapperService } from "./wrapper.service.js";

export class BarWrapperService extends WrapperService implements BarWrapper {
  /**
   * Singleton instace
   */
  public static instance?: BarWrapperService;

  /**
   * Holds the setted buttons (setted by initialize BarWrapper['method']) to access for the fallback mode
   */
  public buttons?: ButtonsConfig;

  /**
   * Holds the setted breadcrumbs config to access for the fallback mode
   */
  public breadcrumb?: ButtonConfig;

  /**
   * Holds the setted title string to access for the fallback mode
   */
  public title?: string;

  /**
   * Holds the icon url to access for the fallback mode.
   */
  public icon?: string;

  /**
   *  Holds the pagination config to access for the fallback mode.
   */
  public pagination?: PaginationConfig;

  /**
   * Holds the loading status to subscribe for the fallback mode.
   * Inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
   *
   * @type {LoadingStateWrapper>}
   * @memberof BarWrapperService
   */
  public loading: LoadingStateWrapper = {
    on: false,
  };

  /**
   * With this BehaviorSubject you can force the visablity of the fallback bar
   *
   * @type {boolean>}
   * @memberof BarWrapperService
   */
  public showFallbackBar = false;

  protected route = new EventDispatcher("main");

  constructor(shopifyApp?: EASDK) {
    super(shopifyApp);
    if (BarWrapperService.instance) {
      return BarWrapperService.instance;
    }
    BarWrapperService.instance = this;
  }

  /**
   * Accepts an object that defines how the top bar and buttons will look and behave.
   * This should almost always be called in the ready() method.
   * Default behavior if initialize is never called will result in some pretty safe defaults,
   * except that the loading spinner will never stop spinning.
   */
  public initialize(config: BarConfig): void {
    this.buttons = config.buttons;
    this.breadcrumb = config.breadcrumb;
    this.title = config.title;
    this.icon = config.icon;
    this.pagination = config.pagination;
    this.event.trigger("bar:initialize", this.useFallback(false), {
      buttons: this.buttons,
      breadcrumb: this.breadcrumb,
      title: this.title,
      icon: this.icon,
      pagination: this.pagination,
    });
    return this.shopifyApp.Bar.initialize(config);
  }

  /**
   * Force the visablity of the fallback bar which is normally only used outside the iframe
   *
   * @param {boolean} [forceFallback] Force the visablity of the fallback bar which is normally only used outside the iframe
   * @memberof BarWrapperService
   */
  public setShowFallbackBar(forceFallback: boolean) {
    const showFallbackBar = this.useFallback(forceFallback);
    if (this.showFallbackBar !== showFallbackBar) {
      this.showFallbackBar = showFallbackBar;
      this.event.trigger("bar:setShowFallbackBar", this.showFallbackBar);
    }
  }

  /**
   * Restarts the loading bar. It is a best practice to call it when moving between pages or firing off AJAX requests.
   * Fallback mode inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
   * @param {boolean} [forceFallback] Force the fallback mode which is used if you are not in the shopify iframe
   * @param {('determinate' | 'indeterminate' | 'buffer' | 'query')} [mode='determinate'] The progress-bar supports four modes.
   * @param {('primary' | 'accent' | 'warn')} [color] The color of a progress-bar can be changed by using the color property.
   * @returns {void}
   * @memberof BarWrapperService
   */
  public loadingOn(forceFallback = false): void {
    if (this.loading.on !== true) {
      const fallback = this.useFallback(forceFallback);
      this.loading = {
        on: true,
      };
      console.debug("loadingOn", fallback, this.loading);
      this.event.trigger("bar:loading", fallback, this.loading);
      this.event.trigger("bar:loadingOn", fallback, this.loading);
      return this.shopifyApp.Bar.loadingOn();
    }
  }

  /**
   * Stops the loading spinner. Should probably be called on every page in shopifyApp.ready().
   * Fallback mode inspired by https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
   */
  public loadingOff(): void {
    if (this.loading.on !== false) {
      this.loading = {
        on: false,
      };
      const fallback = this.useFallback(false);
      console.debug("loadingOff", fallback);
      this.event.trigger("bar:loading", fallback, this.loading);
      this.event.trigger("bar:loadingOff", fallback, this.loading);
      return this.shopifyApp.Bar.loadingOff();
    }
  }

  /**
   * Listen for route events to set the loading spinner automatically.
   * This is a custom method and not part of the officially Shopify EASDK!
   *
   * @param forceFallback
   * @memberof BarWrapperService
   */
  public autoLoading(forceFallback = false) {
    this.route.on("newPageReady", () =>
      // viewId: string,
      // currentStatus: State,
      // prevStatus: State,
      // container: HTMLElement,
      // newPageRawHTML: string,
      // dataset: any,
      // isFirstPageLoad: boolean
      {
        this.loadingOff();
      }
    );

    this.route.on(
      "initStateChange",
      (/*viewId: string, currentStatus: State, prevStatus: State*/) => {
        this.loadingOn(forceFallback);
      }
    );
  }

  /**
   * Manually set the title string in the top bar. See shopifyApp.Bar.initialize().
   */
  public setTitle(title = ""): void {
    if (this.title !== title) {
      this.title = title; // for the fallback
      this.event.trigger("bar:setTitle", this.useFallback(false), this.title);
      return this.shopifyApp.Bar.setTitle(title);
    }
  }

  /**
   * Automatically set the title on route change, needs the title property in rbia route dataset
   */
  public autoTitle(formatter?: (title: string) => Promise<string>) {
    this.route.on(
      "newPageReady",
      (
        viewId: string,
        currentStatus: State,
        prevStatus: State,
        container: HTMLElement,
        newPageRawHTML: string,
        dataset: any
        // isFirstPageLoad: boolean
      ) => {
        if (formatter) {
          formatter(dataset.title)
            .then((title) => {
              this.setTitle(title);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          this.setTitle(dataset.title);
        }
      }
    );
  }

  /**
   * Manually set the icon of the top bar from a URL. See shopifyApp.Bar.initialize().
   * @param icon
   */
  public setIcon(icon: string): void {
    if (this.icon !== icon) {
      this.icon = icon;
      this.event.trigger("bar:setIcon", this.useFallback(false), this.icon);
      return this.shopifyApp.Bar.setIcon(this.icon);
    }
  }

  /**
   * Automatically set the icon on route change, needs the icon property in rbia route dataset
   */
  public autoIcon(/*forceFallback = false*/) {
    this.route.on(
      "newPageReady",
      (
        viewId: string,
        currentStatus: State,
        prevStatus: State,
        container: HTMLElement,
        newPageRawHTML: string,
        dataset: any
        // isFirstPageLoad: boolean
      ) => {
        this.setTitle(dataset.icon);
      }
    );
  }

  /**
   * Manually set the pagination arrows, or pass undefined to remove them entirely. See ShopifyApp.Bar.initialize().
   */
  public setPagination(config?: PaginationConfig): void {
    if (this.pagination !== config) {
      this.pagination = config;
      this.event.trigger(
        "bar:setPagination",
        this.useFallback(false),
        this.pagination
      );
      this.shopifyApp.Bar.setPagination(config);
    }
  }

  /**
   * Manually set the breadcrumb in the top bar for an extra level of navigation.
   * Pass a button object, or pass undefined to remove it entirely. See shopifyApp.Bar.initialize().
   * @param config
   * @memberof BarWrapperService
   */
  public setBreadcrumb(config?: ButtonConfig) {
    if (this.breadcrumb !== config) {
      this.breadcrumb = config;
      this.event.trigger(
        "bar:setBreadcrumb",
        this.useFallback(false),
        this.breadcrumb
      );
      return this.shopifyApp.Bar.setBreadcrumb(config);
    }
  }
}
