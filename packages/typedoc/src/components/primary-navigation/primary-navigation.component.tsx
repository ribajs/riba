import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

import type { NavigationPrimaryComponentScope } from "../../types/index.js";

export class NavigationPrimaryComponent extends Component {
  public static tagName = "tsd-primary-navigation";

  static get observedAttributes() {
    return [];
  }

  protected routerEvents = new EventDispatcher("main");

  public scope: NavigationPrimaryComponentScope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavigationPrimaryComponent.observedAttributes);
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
      "-template"
    ) as HTMLTemplateElement | null;
    if (!templateEl) {
      console.warn("[NavigationPrimaryComponent] No template found!");
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
