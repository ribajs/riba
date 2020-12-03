import { Component } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import { getViewportDimensions } from "@ribajs/utils/src/dom";
import {
  InstagramMedia,
  InstagramResponse,
  InstagramService,
} from "@ribajs/shopify-tda";
import template from "./instagram-scrollbar.component.html";

export interface Scope {
  instagramId?: string;
  openLinks: boolean;
  openUrl: string;
  limit: number;
  onScroll: ShopifyTdaInstagramScrollbarComponent["onScroll"];
  onTap: ShopifyTdaInstagramScrollbarComponent["onTap"];
  media?: InstagramMedia;
}

export class ShopifyTdaInstagramScrollbarComponent extends Component {
  public static tagName = "shopify-tda-instagram-scrollbar";

  static get observedAttributes() {
    return ["instagram-id", "open-links", "limit", "open-url"];
  }

  protected scope: Scope = {
    instagramId: undefined,
    openLinks: false,
    openUrl: "",
    limit: 0,
    onScroll: this.onScroll,
    onTap: this.onTap,
    media: undefined,
  };

  private scollWith: HTMLElement | null = null;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyTdaInstagramScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: Event, scope: any, eventEl: HTMLElement) {
    const pjax = Pjax.getInstance("main");
    if (!pjax) {
      return;
    }
    if (this.scope.openUrl.length > 0) {
      pjax.goTo(this.scope.openUrl);
    }
    if (this.scope.openLinks) {
      const url = (eventEl.firstChild as HTMLElement)?.dataset.url;
      if (url) {
        pjax.goTo(url, true);
      }
    }
  }

  /**
   * get instagram in the middle of the scrollbar elementinnerWidth
   * TODO not used
   */
  public onScroll(event: Event, scope: any, eventEl: HTMLElement) {
    // console.debug('onScroll', eventEl.scrollLeft, this.scollWith);
    if (this.scollWith) {
      const factor = 3;
      this.scollWith.scrollLeft = eventEl.scrollLeft / factor;
    }
  }

  /**
   * Get width insite the scrollbar of the autoscolling title
   * TODO not used
   */
  protected getTitleWidth() {
    if (!this.scollWith) {
      return 0;
    }
    return this.scollWith.querySelector(".title-col")?.clientWidth || 0;
  }

  /**
   * Get width insite the scrollbar of the dragablle / scrollable area
   */
  protected getInstagramWidth() {
    if (!this.scope.media) {
      return;
    }
    const width =
      (getViewportDimensions().w / 3) * this.scope.media.data.length;
    return width;
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      throw new Error("instagram id is required!");
    }
    InstagramService.loadMedia(this.scope.instagramId, this.scope.limit)
      .then((response: InstagramResponse) => {
        this.scope.media = response.media;
        console.debug("response", response);
      })
      .catch((error) => {
        console.debug(`Error: Can't load instagram media`, error);
      });
  }

  protected async beforeBind() {
    // console.debug('beforeBind', this.scope);
    this.scollWith = this.el.querySelector<HTMLElement>(".title-row");
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