import { Component, TemplateFunction } from "@ribajs/core";
import template from "./bs5-theme-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

export class Bs5ThemeExampleComponent extends Component {
  public static tagName = "bs5-theme-example";

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

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}