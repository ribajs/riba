import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import Debug from "debug";
import pugTemplate from "./content.component.pug";

export abstract class ShopifyNestContentComponent extends Component {
  public static tagName = "shopify-nest-content";

  protected autobind = true;

  protected debug = Debug("component:" + ShopifyNestContentComponent.tagName);

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.debug("beforeBind");
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
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
    if (hasChildNodesTrim(this.el)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
