import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./photoswipe-example.component.html";

export class PhotoswipeExampleComponent extends Component {
  public static tagName = "rv-photoswipe-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PhotoswipeExampleComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected requiredAttributes() {
    return [];
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      // this.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // this.debug('Use template', template);
      return template;
    }
  }
}
