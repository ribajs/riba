import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./taggedimage-example.component.html";
import { PopoverOptions } from "@ribajs/bs4";
import { Tag } from "@ribajs/tagged-image";

interface Scope {
  name: string;
  fadeshowImages: {
    src: string;
    srcset: string;
    title: string;
    tags: Tag[];
  }[];
  responsiveTags: Tag[];
}

export class TaggedImageExampleComponent extends Component {
  public static tagName = "taggedimage-example";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    name: "hello",
    responsiveTags: [0, 1, 2, 3, 4, 5].reduce(
      (a, n) => [
        ...a,
        ...[0, 1, 2, 3, 4, 5].map((m) => ({
          x: n * 0.2,
          y: m * 0.2,
          color: `rgb(${n * 50}, ${m * 50}, 0)`,
          popoverOptions: {
            title: `(${n}, ${m})`,
            content: `(${n}, ${m})`,
          },
        })),
      ],
      []
    ),
    fadeshowImages: [1, 2, 3, 4, 5].map((n) => ({
      src: `../../../images/shotokan-karate-cuxhaven-${n}.jpg`,
      srcset: [800, 1000, 1200, 1400, 1600, 1920]
        .map(
          (w) => `../../../images/shotokan-karate-cuxhaven-${n}-${w}.jpg ${w}w,`
        )
        .join("\n"),
      title: `Image ${n}`,
      tags: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
        popoverOptions: {
          title: `Title tag ${n}`,
          content: `Content tag ${n}`,
        },

        x: Math.random(),
        y: Math.random(),

        borderRadius: Math.random() * 70 + "%",

        color: ((r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`)(
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.random()
        ),

        ...((size) => ({
          smallSize: Math.floor(size * (0.25 + Math.random() / 3)) + "px",
          fullSize: size + "px",
        }))(24 + Math.floor(Math.random() * 50)),
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
