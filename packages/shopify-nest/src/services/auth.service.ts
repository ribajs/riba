import { HttpService } from "@ribajs/core";
import Debug from "debug";
import { ShopifyConnect } from "./../interfaces/shopify-connect/connect.js";
import { FacebookConnect } from "./../interfaces/facebook-connect/connect.js";
import { EASDKWrapperService } from "@ribajs/shopify-easdk";
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
    if (EASDKWrapperService.inIframe()) {
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
    return HttpService.getJSON<{ authUrl: string }>(connectUrl).then(
      (result) => {
        this.debug("shopifyConnectIframe", result.body);
        return result.body;
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
    const result = await HttpService.getJSON<{ success: boolean }>(
      disconnectUrl
    );

    this.debug("disconnected", result.body);
    return result.body;
  }

  /**
   * Get user account of type
   * @param type
   */
  public async connected(type: "shopify" | "facebook" | "vimeo") {
    return HttpService.getJSON<ShopifyConnect | null>(
      `/${type}/auth/connected/current`
    ).then((res) => {
      const account = res.body;
      this.debug("isConnected", account);
      return account;
    });
  }

  /**
   * Check if the current user is logged in
   */
  public async loggedIn() {
    const result = await HttpService.getJSON<boolean>(`/shopify/auth/loggedIn`);
    this.debug("result", result);
    const loggedIn = result.body;
    this.debug("loggedIn", loggedIn);
    return loggedIn;
  }

  public logout() {
    this.debug("logout");
    const logoutUrl = `/shopify/auth/logout`;
    window.location.href = logoutUrl;
  }
}
