import {
  Component,
  TemplateFunction,
  HttpService,
} from "@ribajs/core/src/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import Debug from "debug";

import pugTemplate from "./account-connects.component.pug";

import { ShopifyConnect } from "../../interfaces/shopify-connect/connect";
import { FacebookConnect } from "../../interfaces/facebook-connect/connect";
import { FbUserPictureData } from "@ribajs/shopify-tda";
import { AuthService } from "../../services/auth.service.js";

import { EASDKWrapperService } from "@ribajs/shopify-easdk";

interface Scope {
  myshopify_domain?: string;
  type?: "shopify" | "facebook" | "vimeo";
  avatarUrl?: string;
  isConnected: boolean;
  account?: ShopifyConnect | FacebookConnect;
  locales: any;
  connect: ShopifyNestAccountConnectsComponent["connect"];
  disconnect: ShopifyNestAccountConnectsComponent["disconnect"];
  logout: ShopifyNestAccountConnectsComponent["logout"];
  inIframe: boolean;
}

declare const shop: string;

export class ShopifyNestAccountConnectsComponent extends Component {
  public static tagName = "shopify-nest-account-connects";

  static get observedAttributes(): string[] {
    return ["type"];
  }

  protected debug = Debug(
    "component:" + ShopifyNestAccountConnectsComponent.tagName
  );
  protected authService = new AuthService();

  public scope: Scope = {
    myshopify_domain: shop || undefined,
    account: undefined,
    isConnected: false,
    type: undefined,
    avatarUrl: undefined,
    locales: {
      title: "components.accountConnects.{type}.title",
      info: "components.accountConnects.{type}.info",
      notConnected: "components.accountConnects.{type}.notConnected",
    },
    connect: this.connect,
    disconnect: this.disconnect,
    logout: this.logout,
    inIframe: EASDKWrapperService.inIframe(),
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestAccountConnectsComponent.observedAttributes);
  }

  public connect() {
    this.debug("connect");
    if (!this.scope.type) {
      throw new Error("Type attribute is required on this component");
    }
    return this.authService.connect(
      this.scope.type,
      this.scope.myshopify_domain
    );
  }

  public async disconnect() {
    if (!this.scope.type) {
      throw new Error("Type attribute is required on this component");
    }
    if (!this.scope.account) {
      throw new Error("You can't disconnect an account that does not exist");
    }
    const result = await this.authService.disconnect(
      this.scope.type,
      this.scope.account
    );

    if (result.success) {
      this.scope.isConnected = false;
      this.scope.account = undefined;
      this.scope.avatarUrl = undefined;
    }
  }

  /**
   * Logout from app
   */
  public logout() {
    this.debug("logout");
    return this.authService.logout();
  }

  protected async getAvatarUrl() {
    if (this.scope.type === "shopify") {
      return "/images/shopify.svg";
    }
    this.debug("getAvatarUrl");

    if (this.scope.type === "facebook") {
      let picture: FbUserPictureData;
      try {
        const res = await HttpService.getJSON<FbUserPictureData>(
          `/facebook/api/user/picture?type=normal`
        );
        picture = res.body;
        return picture.url;
      } catch (error: any) {
        if (error.type === "OAuthException") {
          console.error(error);
          this.disconnect();
        } else {
          throw error;
        }
      }

      return null;
    }
  }

  protected async isShopifyConnected() {
    if (!this.scope.type) {
      throw new Error("Type attribute is required on this component");
    }
    return this.authService.connected(this.scope.type);
  }

  protected async beforeBind() {
    this.debug("beforeBind");

    this.scope.locales.title = this.scope.locales.title.replace(
      "{type}",
      this.scope.type
    );
    this.scope.locales.info = this.scope.locales.info.replace(
      "{type}",
      this.scope.type
    );
    this.scope.locales.notConnected = this.scope.locales.notConnected.replace(
      "{type}",
      this.scope.type
    );

    return this.isShopifyConnected()
      .then((account: ShopifyConnect | FacebookConnect | null) => {
        if (account?.accessToken) {
          this.scope.isConnected = true;
          this.scope.account = account;
        }
        this.debug("account", account);
        return account;
      })
      .then(async () => {
        if (this.scope.isConnected) {
          return this.getAvatarUrl();
        }
        return null;
      })
      .then(async (avatar) => {
        this.scope.avatarUrl = avatar ? avatar : undefined;
        return this.scope.avatarUrl;
      })
      .catch((error: any) => {
        console.error(error.responseJSON ? error.responseJSON : error);
        /**
         * If Access token has expired
         * @see https://developers.facebook.com/docs/graph-api/using-graph-api/error-handling/
         */
        if (
          this.scope.type === "facebook" &&
          error.responseJSON &&
          error.responseJSON.code === 190
        ) {
          // TODO this.scope.needReconnect and delete account on server
          this.scope.isConnected = false;
          this.scope.account = undefined;
        }
      });
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return ["type"];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
