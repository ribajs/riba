import { HttpService } from "@ribajs/core";
import Debug from "debug";
import { ShopifyConnect } from "./../interfaces/shopify-connect/connect";
import { FacebookConnect } from "./../interfaces/facebook-connect/connect";
import { shopifyEasdkModule } from "@ribajs/shopify-easdk";

export class AuthService {
  public static instance?: AuthService;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  protected debug = Debug("services:AuthService");

  // protected shopifyApp = new shopifyEasdkModule.services.EASDKWrapperService();

  public connect(
    type: "shopify" | "facebook" | "vimeo",
    myshopifyDomain?: string
  ) {
    this.debug("connect");
    const connectUrl = `/${type}/auth?shop=${myshopifyDomain}`;
    if (shopifyEasdkModule?.services?.EASDKWrapperService.inIframe()) {
      const win = window.open(connectUrl + "&iniframe=true");
      if (win) {
        const timer = setInterval(() => {
          if (win.closed) {
            clearInterval(timer);
            location.reload();
          }
        }, 100);
      }
    } else {
      window.location.href = connectUrl;
    }
  }

  public async shopifyConnectIframe(myshopifyDomain?: string) {
    const connectUrl = `/shopify/auth/iframe?shop=${myshopifyDomain}`;
    return HttpService.getJSON(connectUrl).then(
      (result: { authUrl: string }) => {
        this.debug("shopifyConnectIframe", result.authUrl);
        return result;
      }
    );
  }

  public async disconnect(
    type: "shopify" | "facebook" | "vimeo",
    profile: ShopifyConnect | FacebookConnect
  ) {
    this.debug("disconnect TODO");
    const id =
      (profile as FacebookConnect).facebookID ||
      (profile as ShopifyConnect).shopifyID;
    const disconnectUrl = `/${type}/auth/disconnect/${id}`;
    return HttpService.getJSON(disconnectUrl).then(
      (result: { success: boolean }) => {
        this.debug("disconnected", result);
        return result;
      }
    );
  }

  /**
   * Get user account of type
   * @param type
   */
  public async connected(type: "shopify" | "facebook" | "vimeo") {
    return HttpService.getJSON(`/${type}/auth/connected/current`).then(
      (account: ShopifyConnect | null) => {
        this.debug("isConnected", account);
        return account;
      }
    );
  }

  /**
   * Check if the current user is logged in
   */
  public async loggedIn() {
    return HttpService.getJSON(`/shopify/auth/loggedIn`).then(
      (loggedIn: boolean) => {
        this.debug("loggedIn", loggedIn);
        return loggedIn;
      }
    );
  }

  public logout() {
    this.debug("logout");
    const logoutUrl = `/shopify/auth/logout`;
    window.location.href = logoutUrl;
  }
}
