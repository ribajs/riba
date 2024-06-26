import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import Color from "@sphinxxxx/color-conversion";

export class IconsetExampleComponent extends Component {
  public static tagName = "iconset-example";
  protected eventDispatcher?: EventDispatcher;
  static get observedAttributes(): string[] {
    return ["iconset"];
  }

  public scope = {
    size: 32,
    iconset: [] as string[],
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
      "bs5-colorpicker:" + this.scope.namespace,
    );
    this.eventDispatcher.on("change", this.onColorChanged, this);
  }

  protected onColorChanged(color: Color) {
    this.scope.color = color.hslaString;
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(IconsetExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./iconset-example.component.html?raw"
      );
      return template;
    }
  }
}
