import { Component, TemplateFunction } from "@ribajs/core";
import template from "./form-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class FormExampleComponent extends Component {
  public static tagName = "rv-form-example";

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
    super.init(FormExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
