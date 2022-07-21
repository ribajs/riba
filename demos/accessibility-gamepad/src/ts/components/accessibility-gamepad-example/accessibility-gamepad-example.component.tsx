import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class AccessibilityGamepadExampleComponent extends Component {
  public static tagName = "accessibility-gamepad-example";

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
    super.init(AccessibilityGamepadExampleComponent.observedAttributes);
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const template = await import(
        "./accessibility-gamepad-example.component.pug"
      );
      return template.default(this.scope);
    }
  }
}
