import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class Bs5ToggleButtonSidebarExampleComponent extends Component {
  public static tagName = "rv-bs5-toggle-button-sidebar-example";

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
    super.init(Bs5ToggleButtonSidebarExampleComponent.observedAttributes);
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
        "./bs5-toggle-button-sidebar-example.component.html?raw"
      );
      return template;
    }
  }
}
