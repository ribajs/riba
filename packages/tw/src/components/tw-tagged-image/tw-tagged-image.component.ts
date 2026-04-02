import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./tw-tagged-image.component.html?raw";

export interface ImageTag {
  /** Horizontal position as a fraction 0..1 */
  x: number;
  /** Vertical position as a fraction 0..1 */
  y: number;
  /** Short label shown on the pin */
  label: string;
  /** Optional rich content shown in the popover */
  content?: string;
  /** Computed CSS left value */
  left?: string;
  /** Computed CSS top value */
  top?: string;
  /** Internal index */
  index?: number;
  /** Whether the popover is currently visible */
  open?: boolean;
}

interface Scope extends ScopeBase {
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Tags array: each tag has x, y, label, and optional content */
  tags: ImageTag[];
  /** Toggle a tag popover */
  toggleTag: TwTaggedImageComponent["toggleTag"];
  /** Close a tag popover */
  closeTag: TwTaggedImageComponent["closeTag"];
  /** Update tag positions (called on image load / resize) */
  updatePositions: TwTaggedImageComponent["updatePositions"];
}

export class TwTaggedImageComponent extends Component {
  public static tagName = "tw-tagged-image";

  protected autobind = true;
  public _debug = false;

  protected imageEl: HTMLImageElement | null = null;

  static get observedAttributes(): string[] {
    return ["src", "alt", "tags"];
  }

  public scope: Scope = {
    src: "",
    alt: "",
    tags: [],
    toggleTag: this.toggleTag.bind(this),
    closeTag: this.closeTag.bind(this),
    updatePositions: this.updatePositions.bind(this),
  };

  private resizeHandler = this.updatePositions.bind(this);

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwTaggedImageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return ["src"];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName === "tags") {
      this.initTags();
      this.updatePositions();
    }
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.parseChildTags();
    this.initTags();
  }

  protected async afterBind() {
    await super.afterBind();
    this.imageEl = this.querySelector<HTMLImageElement>("img");
    if (this.imageEl) {
      this.imageEl.addEventListener("load", this.resizeHandler);
    }
    window.addEventListener("resize", this.resizeHandler);
    this.updatePositions();
  }

  /**
   * Parse `<tag>` child elements the same way bs5-tagged-image does.
   */
  protected parseChildTags() {
    const tagEls = this.querySelectorAll<HTMLElement>("tag");
    for (const tagEl of Array.from(tagEls)) {
      const label = tagEl.getAttribute("title") || tagEl.getAttribute("label") || "";
      const content = tagEl.innerHTML || undefined;
      const x = parseFloat(tagEl.getAttribute("x") || "0");
      const y = parseFloat(tagEl.getAttribute("y") || "0");
      this.scope.tags.push({ x, y, label, content });
    }
  }

  protected initTags() {
    for (let i = 0; i < this.scope.tags.length; i++) {
      const tag = this.scope.tags[i];
      tag.index = i;
      tag.open = tag.open ?? false;
      tag.left = tag.x * 100 + "%";
      tag.top = tag.y * 100 + "%";
    }
  }

  /**
   * Recalculate tag positions based on image dimensions and object-fit.
   */
  public updatePositions() {
    const img = this.imageEl;
    if (!img) return;

    const { width, height, naturalWidth, naturalHeight } = img;
    if (!naturalWidth || !naturalHeight) return;

    const wRatio = naturalWidth / width;
    const hRatio = naturalHeight / height;
    const fit = window.getComputedStyle(img).getPropertyValue("object-fit");

    for (const tag of this.scope.tags) {
      if (
        (fit === "cover" && wRatio > hRatio) ||
        (fit === "contain" && hRatio > wRatio)
      ) {
        tag.top = tag.y * 100 + "%";
        tag.left = ((wRatio / hRatio) * (tag.x - 0.5) + 0.5) * 100 + "%";
      } else if (fit === "cover" || fit === "contain") {
        tag.left = tag.x * 100 + "%";
        tag.top = ((hRatio / wRatio) * (tag.y - 0.5) + 0.5) * 100 + "%";
      } else {
        tag.left = tag.x * 100 + "%";
        tag.top = tag.y * 100 + "%";
      }
    }
  }

  public toggleTag(event: Event, el: HTMLElement, tag: ImageTag) {
    // Close other tags first
    for (const t of this.scope.tags) {
      if (t !== tag) {
        t.open = false;
      }
    }
    tag.open = !tag.open;
  }

  public closeTag(event: Event, el: HTMLElement, tag: ImageTag) {
    tag.open = false;
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    if (this.imageEl) {
      this.imageEl.removeEventListener("load", this.resizeHandler);
    }
    window.removeEventListener("resize", this.resizeHandler);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      // If user provided child elements (including <tag> elements), still use the template
      // because parseChildTags already extracted the data.
    }
    return template;
  }
}
