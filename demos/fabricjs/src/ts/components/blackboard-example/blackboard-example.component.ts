import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./blackboard-example.component.html";
import { EventDispatcher } from "@ribajs/events";

export class BlackboardExampleComponent extends Component {
  public static tagName = "blackboard-example";

  protected autobind = true;

  eventDispatcher: EventDispatcher;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    color: [0, 255, 0],
  };

  constructor() {
    super();
    this.eventDispatcher = EventDispatcher.getInstance("bs5-colorpicker:main");
    this.eventDispatcher.on("change", (color) => {
      console.log("Change color", JSON.parse(JSON.stringify(color)));
      this.scope.color = JSON.parse(JSON.stringify(color._rgba));
    });
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(BlackboardExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    await super.init(observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      console.debug("Do not use template, because element has child nodes");
      return null;
    } else {
      console.debug("Use template", template);
      return template;
    }
  }
}
