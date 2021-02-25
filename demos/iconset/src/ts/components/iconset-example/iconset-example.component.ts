import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import template from "./iconset-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import Color from "@sphinxxxx/color-conversion";

export class IconsetExampleComponent extends Component {
  public static tagName = "iconset-example";
  protected eventDispatcher?: EventDispatcher;
  static get observedAttributes() {
    return ["iconset"];
  }

  protected scope = {
    size: 32,
    iconset: [],
    // Icon colors
    color: "",
    namespace: "main",
  };

  constructor() {
    super();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.eventDispatcher = EventDispatcher.getInstance(
      "bs5-colorpicker:" + this.scope.namespace
    );
    this.eventDispatcher.on("change", this.onColorChanged, this);
  }

  protected onColorChanged(color: Color) {
    this.scope.color = color.hslaString;
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(IconsetExampleComponent.observedAttributes);
    console.debug("scope", this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
