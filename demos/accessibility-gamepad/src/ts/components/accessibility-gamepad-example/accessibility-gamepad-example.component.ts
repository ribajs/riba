import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./accessibility-gamepad-example.component.pug";

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

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template(this.scope);
    }
  }
}
