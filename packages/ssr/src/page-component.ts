import { Component } from "@ribajs/core";
export abstract class PageComponent extends Component {
  public routes?: string[];
  public static ssrEvents = window.ssrEvents;
  protected async afterBind() {
    await super.afterBind();
    PageComponent.ssrEvents.trigger("PageComponent:afterBind", {
      tagName: this.tagName.toLocaleLowerCase(),
      routes: this.routes,
      scope: this.scope,
    });
  }
}
