import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import Debug from "debug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import pugTemplate from "./socket-event-card.component.pug";

interface Scope {
  close?: ShopifyNestSocketEventCardComponent["close"];
  event?: string;
  data?: any;
  role?: string;
}

export class ShopifyNestSocketEventCardComponent extends Component {
  public static tagName = "shopify-nest-socket-event-card";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["event", "data", "role"];
  }

  protected debug = Debug(
    "component:" + ShopifyNestSocketEventCardComponent.tagName
  );

  public scope: Scope = {
    close: this.close,
    event: undefined,
    data: undefined,
    role: undefined
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyNestSocketEventCardComponent.observedAttributes);
  }

  public close() {
    this.debug("close");
    this.remove();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug("beforeBind");
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return ["event"];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
