import { Component, ScopeBase } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import {
  getViewportDimensions,
  hasChildNodesTrim,
} from "@ribajs/utils/src/dom.js";
import type { InstagramMedia } from "../../interfaces/instagram-api/index.js";
import { InstagramApiService } from "../../services/instagram-api.service.js";

export interface Scope extends ScopeBase {
  instagramId?: string;
  openLinks: boolean;
  openUrl?: string;
  limit: number;
  onScroll: ShopifyTdaInstagramScrollbarComponent["onScroll"];
  onTap: ShopifyTdaInstagramScrollbarComponent["onTap"];
  media?: InstagramMedia;
}

export class ShopifyTdaInstagramScrollbarComponent extends Component {
  public static tagName = "shopify-tda-instagram-scrollbar";

  static get observedAttributes(): string[] {
    return ["instagram-id", "open-links", "limit", "open-url"];
  }

  public scope: Scope = {
    instagramId: undefined,
    openLinks: false,
    openUrl: undefined,
    limit: 0,
    onScroll: this.onScroll,
    onTap: this.onTap,
    media: undefined,
  };

  protected scollWith: HTMLElement | null = null;

  protected instagram = InstagramApiService.getSingleton();

  constructor() {
    super();
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
    if (this.scope.openUrl && this.scope.openUrl.length > 0) {
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

  protected async loadMedia() {
    if (!this.scope.instagramId) {
      throw new Error("instagram id is required!");
    }
    try {
      const response = await this.instagram.media(
        this.scope.instagramId,
        this.scope.limit
      );
      if (response) {
        this.scope.media = response.media;
        console.debug("response", response);
      }
    } catch (error) {
      console.debug(`Error: Can't load instagram media`, error);
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.scollWith = this.querySelector<HTMLElement>(".title-row");
    return this.loadMedia();
  }

  protected requiredAttributes(): string[] {
    return ["instagramId", "limit"];
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./instagram-scrollbar.component.html?raw"
      );
      return template;
    }
  }
}
