import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class DemoThemeComponent extends Component {
  public static tagName = "demo-theme";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(DemoThemeComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./demo-theme.component.html?raw"
      );
      return template;
    }
  }
}
