import { Component } from "@ribajs/core";
import Debug from "debug";
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

  static get observedAttributes() {
    return ["event", "data", "role"];
  }

  protected debug = Debug(
    "component:" + ShopifyNestSocketEventCardComponent.tagName
  );

  protected scope: Scope = {
    close: this.close,
    event: undefined,
    data: undefined,
    role: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
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
    await super.afterBind();
    this.debug("afterBind", this.scope);
  }

  protected requiredAttributes() {
    return ["event"];
  }

  protected attributeChangedCallback(
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

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
