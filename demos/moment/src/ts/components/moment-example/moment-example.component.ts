import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class MomentExampleComponent extends Component {
  public static tagName = "moment-example";

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
    this.init(MomentExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./moment-example.component.html"
      );
      return template;
    }
  }
}
