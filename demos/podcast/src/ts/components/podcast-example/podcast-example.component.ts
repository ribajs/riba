import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./podcast-example.component.pug";

import { episode } from "../../data/episode";
import { config } from "../../data/config";

export class EmptyTemplateExampleComponent extends Component {
  public static tagName = "podcast-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    episode,
    config,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(EmptyTemplateExampleComponent.observedAttributes);
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
