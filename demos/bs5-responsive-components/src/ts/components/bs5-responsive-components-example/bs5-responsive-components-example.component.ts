import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";

export class Bs5ThemeExampleComponent extends Component {
  public static tagName = "bs5-responsive-components-example";

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
    super.init(Bs5ThemeExampleComponent.observedAttributes);
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
        "./bs5-responsive-components-example.component.html"
      );
      return template;
    }
  }
}
