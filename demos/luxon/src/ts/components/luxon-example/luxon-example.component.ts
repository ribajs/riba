import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./luxon-example.component.html";

export class LuxonExampleComponent extends Component {
  public static tagName = "luxon-example";

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
    this.init(LuxonExampleComponent.observedAttributes);
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
