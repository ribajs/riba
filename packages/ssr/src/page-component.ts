import { Component } from "@ribajs/core";
import type { SharedContext } from "@ribajs/ssr";
import type { EventDispatcher } from "@ribajs/events";
import type { PageComponentAfterBindEventData, SsrHtmlHead } from "./types";

export abstract class PageComponent extends Component {
  protected events: EventDispatcher;
  protected ctx: SharedContext["ctx"];
  protected env: SharedContext["env"];

  /**
   * Overwrite / add tags in the html head like the page title
   *
   * TODO add support for more head tags
   * TODO add support for set title in happy-dom: https://github.com/capricorn86/happy-dom/blob/master/packages/happy-dom/src/nodes/document/Document.ts
   */
  protected head: SsrHtmlHead = {};

  constructor() {
    super();
    this.ctx = window.ssr.ctx;
    this.env = window.ssr.env;
    this.events = window.ssr.events;
  }

  protected setHtmlHead() {
    if (this.head.title) {
      document.title = this.head.title;
    }
  }

  protected getBindEventData() {
    const data: PageComponentAfterBindEventData = {
      tagName: this.tagName.toLocaleLowerCase(),
      scope: this.scope,
      component: this,
    };
    return data;
  }

  protected async afterBind() {
    await super.afterBind();
    const data = this.getBindEventData();
    this.setHtmlHead();
    this.events.trigger("PageComponent:afterBind", data);
  }

  protected async beforeBind() {
    await super.beforeBind();
    const data = this.getBindEventData();
    this.events.trigger("PageComponent:beforeBind", data);
  }
}
