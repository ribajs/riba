import { Component } from "@ribajs/core";
import type { SharedContext } from "@ribajs/ssr";
import type { SsrHtmlHead } from "./types";
import { EventDispatcher } from "@ribajs/events";

export abstract class PageComponent extends Component {
  protected lifecycleEvents = EventDispatcher.getInstance("lifecycle");
  protected ctx: SharedContext["ctx"];
  protected env: SharedContext["env"];

  /**
   * Overwrite / add tags in the html head like the page title
   *
   * TODO add support for more head tags
   */
  protected head: SsrHtmlHead = {};

  constructor() {
    super();
    this.ctx = window.ssr.ctx;
    this.env = window.ssr.env;
  }

  protected setHtmlHead() {
    if (this.head.title) {
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
