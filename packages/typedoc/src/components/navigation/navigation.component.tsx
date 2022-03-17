import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

import type { NavigationComponentScope } from "../../types";

export class NavigationComponent extends Component {
  public static tagName = "tsd-navigation";

  static get observedAttributes() {
    return [];
  }

  protected routerEvents = new EventDispatcher("main");

  public scope: NavigationComponentScope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavigationComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.addEventListeners();
  }

  protected addEventListeners() {
    this.routerEvents.on("transitionCompleted", this.onNewPage, this);
  }

  protected onNewPage() {
    const templateEl = document.getElementById(
      "tsd-navigation-secondary-template"
    ) as HTMLTemplateElement | null;
    if (!templateEl) {
      console.warn("[NavigationComponent] No template found!");
      return;
    }
    this.scope.template = templateEl.innerHTML;
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      this.scope.template = this.innerHTML;
    }
    return <div rv-template="template"></div>;
  }
}
