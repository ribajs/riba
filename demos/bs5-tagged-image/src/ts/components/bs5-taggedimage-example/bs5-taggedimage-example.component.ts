import { Component, ScopeBase } from "@ribajs/core";
import { TaggedImageTag as Tag } from "@ribajs/bs5";

interface Scope extends ScopeBase {
  fadeshowImages: {
    src: string;
    srcset: string;
    title: string;
    tags: Tag[];
  }[];
  responsiveTags: Tag[];
}

export class Bs5TaggedImageExampleComponent extends Component {
  public static tagName = "bs5-taggedimage-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  protected getResponsiveTags() {
    const cb = (a: Tag[], n: number): Tag[] => [
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
    ];

    return [0, 1, 2, 3, 4, 5].reduce(cb, []);
  }

  protected getFadeshowImageTags() {
    return [1, 2, 3, 4, 5].map((n) => ({
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
    }));
  }

  public scope: Scope = {
    responsiveTags: this.getResponsiveTags(),
    fadeshowImages: this.getFadeshowImageTags(),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5TaggedImageExampleComponent.observedAttributes);
  }

  protected async template() {
    const { default: template } = await import(
      "./bs5-taggedimage-example.component.html?raw"
    );
    return template;
  }
}
