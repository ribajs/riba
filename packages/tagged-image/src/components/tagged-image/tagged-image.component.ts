import { Component } from "@ribajs/core";
// import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { TooltipService, PopoverService } from "@ribajs/bs4";

interface Tag {
  title: string;
  content: string | HTMLElement;
  position: {
    x: number;
    y: number;
  };
  popup?: TooltipService | PopoverService;
}
interface Scope {
  src: string;
  tags: Tag[];
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;
  public _debug = true;

  static get observedAttributes() {
    return ["src"];
  }

  protected scope: Scope = {
    src: "",
    tags: [],
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected initTags() {
    for (const t of Array.from(this.el.querySelectorAll("tag"))) {
      const tag = t as HTMLElement;

      const title = tag.getAttribute("title") || "";
      const content = tag.innerHTML;

      const x = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tag.getAttribute("x") || "")
      );
      const y = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tag.getAttribute("y") || "")
      );

      tag.style.left = x * 100 + "%";
      tag.style.top = y * 100 + "%";

      // const tooltipType = tag.getAttribute("type") || this.el.getAttribute("tooltip-type");

      const popup = new PopoverService(tag, {
        ...PopoverService.Default,
        title,
        content,
      });

      const tagData = {
        title,
        content,
        position: { x, y },
        popup,
      };
      this.scope.tags.push(tagData);
    }
  }

  protected setImage() {
    const img = document.createElement("img");
    img.setAttribute("rv-src", "src");
    this.el.appendChild(img);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.initTags();
    this.setImage();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
