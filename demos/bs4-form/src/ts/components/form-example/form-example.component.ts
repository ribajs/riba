import { Component, EventDispatcher } from "@ribajs/core";
import template from "./form-example.component.html";

interface Scope {

}

export class FormExampleComponent extends Component {
  public static tagName = "rv-form-example";

  protected autobind = true;
  protected eventDispatcher: EventDispatcher = new EventDispatcher("toast");

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
  };

  constructor(element?: HTMLElement) {
    super(element);
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
    if (this.el.hasChildNodes()) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
