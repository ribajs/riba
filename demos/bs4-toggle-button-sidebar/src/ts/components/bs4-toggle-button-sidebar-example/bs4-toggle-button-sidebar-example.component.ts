import { Component, TemplateFunction } from "@ribajs/core";
import template from "./bs4-toggle-button-sidebar-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export class BS4ToggleButtonSidebarExampleComponent extends Component {
  public static tagName = "rv-bs4-toggle-button-sidebar-example";

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
    super.init(BS4ToggleButtonSidebarExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
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
