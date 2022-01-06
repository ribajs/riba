import { Component, TemplateFunction } from "@ribajs/core";
import { NavigableGroupComponentScope } from "../../types";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./navigable-group.component.pug";

export class NavigableGroupComponent extends Component {
  public static tagName = "navigable-group";

  static get observedAttributes() {
    return ["foobar"];
  }

  public scope: NavigableGroupComponentScope = {
    foobar: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(NavigableGroupComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
