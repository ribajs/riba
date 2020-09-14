import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./taggedimage-example.component.html";

interface Scope {
  fadeshowImages: {
    src: string;
    srcset: string;
    title: string;
  }[];
}

export class TaggedImageExampleComponent extends Component {
  public static tagName = "taggedimage-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    fadeshowImages: [1, 2, 3, 4, 5].map((n) => ({
      src: `../../../images/shotokan-karate-${n}.jpg`,
      srcset: [800, 1000, 1200, 1400, 1600, 1920]
        .map((w) => `../../../images/shotokan-karate-${n}-${w}.jpg ${w}w`)
        .join("\n"),
      title: `Image ${n}`,
    })),
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageExampleComponent.observedAttributes);
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
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
