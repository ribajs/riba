import { Component, TemplateFunction } from "@ribajs/core";
import {
  EmptyTemplateComponentScope,
  JsxEmptyTemplateProps,
} from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";

export class EmptyTemplateComponent extends Component {
  public static tagName = "empty-template";

  static get observedAttributes(): (keyof JsxEmptyTemplateProps)[] {
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
      return (
        <span>
          Hello from empty component template.
          <br />
          foobar: <span rv-text="foobar"></span>{" "}
        </span>
      );
    } else {
      return null;
    }
  }
}
