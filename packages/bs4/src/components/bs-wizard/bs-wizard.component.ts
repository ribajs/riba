import { Component } from "@ribajs/core";
import template from "./bs-wizard.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export interface Scope {}

export class BsWizard extends Component {
  public static tagName = "bs-wizard";

  protected autobind = true;
  public _debug = false;


  static get observedAttributes() {
    return [;
  }

  protected scope: Scope = {
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(BsWizard.observedAttributes);
  }


  protected async afterBind() {
    super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this.el)) {
      return template;
    }
    return null;
  }
}
