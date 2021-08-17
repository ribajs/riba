import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./ionic-example.component.pug";

export class IonicExampleComponent extends Component {
  public static tagName = "ionic-example";

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
    super.init(IonicExampleComponent.observedAttributes);
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
