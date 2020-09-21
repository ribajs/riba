import { Component } from "@ribajs/core";

import template from "./tagged-image.component.html";

interface Scope {
  imageUrl: string;
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;

  static get observedAttributes() {
    return ["image-url"];
  }

  protected scope: Scope = {
    imageUrl: "",
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {
    return await super.beforeBind();
  }

  protected async afterBind() {
    return await super.afterBind();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return template;
  }
}
