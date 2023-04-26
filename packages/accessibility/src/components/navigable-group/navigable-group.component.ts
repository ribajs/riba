import { Component } from "@ribajs/core";
import { NavigableGroupComponentScope } from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils";

export class NavigableGroupComponent extends Component {
  public static tagName = "a11y-navigable-group";

  static get observedAttributes() {
    return [];
  }

  public scope: NavigableGroupComponentScope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavigableGroupComponent.observedAttributes);
  }

  protected async template() {
    if (!hasChildNodesTrim(this)) {
      const { default: template } = await import(
        "./navigable-group.component.pug"
      );
      return template(this.scope);
    } else {
      return null;
    }
  }
}
