import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./taggedimage-example.component.html";

interface Scope {
  name: string;
  fadeshowImages: {
    src: string;
    srcset: string;
    title: string;
    tags: {
      x: number;
      y: number;
    }[];
  }[];
}

export class TaggedImageExampleComponent extends Component {
  public static tagName = "taggedimage-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    name: "hello",
    fadeshowImages: [1, 2, 3, 4, 5].map((n) => ({
      src: `../../../images/shotokan-karate-cuxhaven-${n}.jpg`,
      srcset: [800, 1000, 1200, 1400, 1600, 1920]
        .map(
          (w) => `../../../images/shotokan-karate-cuxhaven-${n}-${w}.jpg ${w}w,`
        )
        .join("\n"),
      title: `Image ${n}`,
      tags: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
        title: `Title tag ${n}`,
        content: `Content tag ${n}`,
        x: Math.random(),
        y: Math.random(),
      })),
    })),
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageExampleComponent.observedAttributes);
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
