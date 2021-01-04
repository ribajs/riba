import { Component } from "@ribajs/core";
import type { SharedContext } from "@ribajs/ssr";
import type { EventDispatcher } from "@ribajs/events";
import type { PageComponentAfterBindEventData } from "./types/page-component-after-bind-event-data";
export abstract class PageComponent extends Component {
  protected events: EventDispatcher;
  protected ctx: SharedContext["ctx"];

  protected getBindEventData() {
    const data: PageComponentAfterBindEventData = {
      tagName: this.tagName.toLocaleLowerCase(),
      scope: this.scope,
      component: this,
    };
    return data;
  }

  constructor() {
    super();
    this.ctx = window.ssr.ctx;
    this.events = window.ssr.events;
  }

  protected async afterBind() {
    await super.afterBind();
    const data = this.getBindEventData();
    this.events.trigger("PageComponent:afterBind", data);
  }

  protected async beforeBind() {
    await super.beforeBind();
    const data = this.getBindEventData();
    this.events.trigger("PageComponent:beforeBind", data);
  }
}
