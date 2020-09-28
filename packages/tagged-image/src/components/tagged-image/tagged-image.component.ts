import { Component } from "@ribajs/core";
import { PopoverOptions } from "@ribajs/bs4";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./tagged-image.component.html";

interface Tag {
  x: number;
  y: number;
  index?: number;
  left?: string;
  top?: string;
  popover: Partial<PopoverOptions>;
  el?: HTMLElement;
}
interface Scope {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  tags: Tag[];
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;
  public _debug = true;

  static get observedAttributes() {
    return ["src", "sizes", "srcset", "alt", "tags"];
  }

  protected scope: Scope = {
    src: "",
    srcset: "",
    sizes: "",
    alt: "",
    tags: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected parseChildTags() {
    for (const tagEl of Array.from(
      this.el.querySelectorAll("tag") as NodeListOf<HTMLElement>
    )) {
      const title = tagEl.getAttribute("title") || "";
      const content = tagEl.innerHTML;

      const x = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tagEl.getAttribute("x") || "")
      );
      const y = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tagEl.getAttribute("y") || "")
      );

      const tagData = {
        popover: {
          title,
          content,
          html: true,
        },
        x,
        y,
        el: tagEl,
      };
      this.scope.tags.push(tagData);
    }
  }

  protected initTags() {
    for (const [index, tag] of this.scope.tags.entries()) {
      tag.left = tag.x * 100 + "%";
      tag.top = tag.y * 100 + "%";
      tag.index = index;
    }
    this.debug("initTags", this.scope.tags);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageComponent.observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.initTags();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template() {
    if (hasChildNodesTrim(this.el)) {
      this.parseChildTags();
    }
    return template;
  }
}
