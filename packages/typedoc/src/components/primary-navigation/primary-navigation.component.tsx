import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import { EventDispatcher } from "@ribajs/events";

import type { PrimaryNavigationComponentScope } from "../../types/index.js";

export class PrimaryNavigationComponent extends Component {
  public static tagName = "tsd-primary-navigation";

  static get observedAttributes() {
    return [];
  }

  protected routerEvents = new EventDispatcher("main");

  public scope: PrimaryNavigationComponentScope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PrimaryNavigationComponent.observedAttributes);
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
      "tsd-navigation-primary-template"
    ) as HTMLTemplateElement | null;
    if (!templateEl) {
      console.warn("[PrimaryNavigationComponent] No template found!");
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
