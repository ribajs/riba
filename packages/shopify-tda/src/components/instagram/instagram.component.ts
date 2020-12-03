import { Component } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import template from "./instagram.component.html";
import {
  InstagramMedia,
  InstagramResponse,
  InstagramService,
} from "@ribajs/shopify-tda";

export interface Scope {
  media?: InstagramMedia;
  instagramId?: string;
  openLinks: boolean;
  limit: number;
  onTap: ShopifyTdaInstagramComponent["onTap"];
}

export class ShopifyTdaInstagramComponent extends Component {
  public static tagName = "shopify-tda-instagram";

  public _debug = false;

  static get observedAttributes() {
    return ["instagram-id", "open-links", "limit"];
  }

  protected scope: Scope = {
    media: undefined,
    openLinks: false,
    limit: 0,
    instagramId: undefined,
    onTap: this.onTap,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyTdaInstagramComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: Event, scope: any, eventEl: HTMLElement) {
    if (!this.scope.openLinks) {
      return;
    }
    const pjax = Pjax.getInstance("main");
    if (!pjax) {
      return;
    }
    const url = eventEl.dataset.url;
    if (url) {
      pjax.goTo(url, true);
    }
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      return Promise.reject();
    }
    InstagramService.loadMedia(this.scope.instagramId, this.scope.limit)
      .then((response: InstagramResponse) => {
        this.scope.media = response.media;
        // console.debug('response', response);
      })
      .catch((error: Error) => {
        console.debug(`Error: Can't load instagram media`, error);
      });
  }

  protected async beforeBind() {
    // console.debug('beforeBind', this.scope);
    return this.loadMedia();
  }

  protected requiredAttributes() {
    return ["instagramId", "limit"];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el && this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
