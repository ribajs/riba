import { Component } from "@ribajs/core";
import type { SharedContext } from "@ribajs/ssr";
import type { EventDispatcher } from "@ribajs/events";
export abstract class PageComponent extends Component {
  protected events: EventDispatcher;
  protected ctx: SharedContext["ctx"];

  protected getEventData() {
    const data = {
      tagName: this.tagName.toLocaleLowerCase(),
      scope: this.scope,
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
    const data = this.getEventData();
    this.events.trigger("PageComponent:afterBind", data);
  }

  protected async beforeBind() {
    await super.beforeBind();
    const data = this.getEventData();
    this.events.trigger("PageComponent:beforeBind", data);
  }
}
