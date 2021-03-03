import { Component } from "@ribajs/core";
import template from "./bs5-toggle-button-sidebar-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export class Bs5ToggleButtonSidebarExampleComponent extends Component {
  public static tagName = "rv-bs5-toggle-button-sidebar-example";

  protected autobind = true;
  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs5ToggleButtonSidebarExampleComponent.observedAttributes);
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
