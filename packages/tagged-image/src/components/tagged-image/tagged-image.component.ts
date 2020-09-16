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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Scope {
  tags: Tag[];
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;

  static get observedAttributes() {
    return ["src"];
  }

  protected scope: Scope = { tags: [] };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async beforeBind() {
    return await super.beforeBind();
  }

  protected async afterBind() {
    const img = document.createElement("img");
    img.className = "lazy embed-responsive-item";
    img.setAttribute("src", this.el.getAttribute("src") || "");
    img.setAttribute("srcset", this.el.getAttribute("srcset") || "");
    img.setAttribute("sizes", this.el.getAttribute("sizes") || "");
    this.el.appendChild(img);
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
    return await super.afterBind();
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected hasOnlyTagChildren() {
    return !Array.from(this.el.childNodes).some(
      (child) => child.nodeName !== "TAG" && child.nodeName !== "#text"
    );
  }
  protected template() {
    return null;
  }
}
