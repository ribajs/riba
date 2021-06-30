import { Component, TemplateFunction } from "@ribajs/core";
import { EmptyTemplateComponentScope } from "../../types";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./empty-template.component.pug";

export class EmptyTemplateComponent extends Component {
  public static tagName = "empty-template";

  static get observedAttributes() {
    return ["foobar"];
  }

  public scope: EmptyTemplateComponentScope = {
    foobar: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(EmptyTemplateComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
