import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import type { SsrHtmlHead, SharedContext } from "./types/index.js";

export abstract class PageComponent extends Component {
  protected lifecycleEvents = EventDispatcher.getInstance("lifecycle");
  protected ctx: SharedContext["ctx"] = {};
  protected env: SharedContext["env"] = {};

  /**
   * Overwrite / add tags in the html head like the page title
   *
   * TODO add support for more head tags
   */
  protected head: SsrHtmlHead = {};

  constructor() {
    super();
    if (window.ssr) {
      this.ctx = window.ssr.ctx;
      this.env = window.ssr.env;
    } else {
      console.error(
        `window.ssr is not defined for "${this.tagName}"!\n` +
          "Are you sure you are not trying to use this component in the browser?\n" +
          "PageComponents may only be executed on the server side, " +
          'but you can create a "normal" component with the same `tagName` and use it client-side. ' +
          "This way you have the possibility to have a server side and a client side logic for this page component."
      );
    }
  }

  protected setHtmlHead() {
    if (this.head.title && document) {
      document.title = this.head.title;
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.setHtmlHead();
  }

  protected async afterBind() {
    this.setHtmlHead();
    await super.afterBind();
  }
}
