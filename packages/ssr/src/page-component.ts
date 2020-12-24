import { Component } from "@ribajs/core";
export abstract class PageComponent extends Component {
  public static ssrEvents = window.ssrEvents;
  protected async afterBind() {
    await super.afterBind();
    PageComponent.ssrEvents.trigger("PageComponent:afterBind", {
      tagName: this.tagName.toLocaleLowerCase(),
      scope: this.scope,
    });
  }
}
