import { Component, TemplateFunction } from "@ribajs/core";
import template from "./riba-increase.component.html";

export class RibaIncreaseComponent extends Component {
  public static tagName = "rv-increase";

  protected autobind = true;

  public _debug = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected scope = {
    capacity: 3,
    increaseCapacity: this.increaseCapacity,
  };

  constructor() {
    super();
  }

  public increaseCapacity() {
    this.scope.capacity++;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(RibaIncreaseComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
