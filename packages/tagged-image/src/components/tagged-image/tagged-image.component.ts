import { Component } from "@ribajs/core";

import template from "./tagged-image.component.html";

interface Scope {
  imageUrl: string;
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;

  static get observedAttributes() {
    return [
      "image-url",
      "initial-lng",
      "initial-zoom",
      "tile-url",
      "attribution",
    ];
  }

  protected scope: Scope = {
    imageUrl: "abc",
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
    await super.afterBind();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // for (const el of this.el.children) {
    //   if (el.tagName === "ICON") {
    //   }
    // }
    return template;
  }
}
