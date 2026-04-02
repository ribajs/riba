import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class DemoDropdownComponent extends Component {
  public static tagName = "demo-dropdown";

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
    super.init(DemoDropdownComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./demo-dropdown.component.html?raw"
      );
      return template;
    }
  }
}
