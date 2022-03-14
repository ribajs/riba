import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./slideshow-example.component.html";

export class SlideshowExampleComponent extends Component {
  public static tagName = "rv-slideshow-example";

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
    this.init(SlideshowExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
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
