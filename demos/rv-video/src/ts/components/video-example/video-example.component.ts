import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./video-example.component.html";

export class VideoExampleComponent extends Component {
  public static tagName = "video-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected scope = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(VideoExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
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
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
