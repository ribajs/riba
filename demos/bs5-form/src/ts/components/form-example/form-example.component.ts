import { Component } from "@ribajs/core";
import template from "./form-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export class FormExampleComponent extends Component {
  public static tagName = "rv-form-example";

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
    super.init(FormExampleComponent.observedAttributes);
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
