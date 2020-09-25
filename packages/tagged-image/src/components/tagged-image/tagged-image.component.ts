import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { PopoverService } from "@ribajs/bs4";
import template from "./tagged-image.component.html";

interface Tag {
  title: string;
  content: string | HTMLElement;
  x: number;
  y: number;
  index?: number;
  left?: string;
  top?: string;
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

      const popup = new PopoverService(tagEl, {
        ...PopoverService.Default,
        title,
        content,
      });

      const tagData = {
        title,
        content,
        x,
        y,
        el: tagEl,
        popup,
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
