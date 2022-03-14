import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import Debug from "debug";
import pugTemplate from "./permissions-card.component.pug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class ShopifyNestPermissionsCardComponent extends Component {
  public static tagName = "shopify-nest-permissions-card";

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestPermissionsCardComponent.tagName
  );

  public scope = {};

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ShopifyNestPermissionsCardComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    await super.beforeBind();
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

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
