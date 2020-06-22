import { Component, EventDispatcher } from "@ribajs/core";

import template from "./form-example.component.html";

interface Scope {
  testToast: FormExampleComponent["testToast"];
  inputValue: string;
}

export class FormExampleComponent extends Component {
  public static tagName = "rv-form-example";

  protected autobind = true;
  protected eventDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    testToast: this.testToast,
    inputValue: "Eine Nachricht",
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.eventDispatcher = new EventDispatcher("toast");
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(FormExampleComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
  }

  public testToast() {
    console.log("test");
    this.eventDispatcher.trigger("showToast", this.scope.inputValue);
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
