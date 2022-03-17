import { extend } from "@ribajs/utils/src/index.js";

import { Component, TemplateFunction } from "@ribajs/core";
import { PopoverOptions } from "@ribajs/bs4";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { TaggedImageTag as Tag } from "../../interfaces/index.js";
import template from "./bs4-tagged-image.component.html";
import { debounce } from "@ribajs/utils/src/control.js";

interface Options {
  popoverOptions: Partial<PopoverOptions>;
  tagOptions: Partial<Tag>;
  multiPopover?: boolean;
}

interface Scope {
  debug: boolean;
  options: Options;
  tags: Tag[];
  fillPopoverOptions: (
    options: Partial<PopoverOptions>,
  ) => Partial<PopoverOptions>;
  triggerOnFocus: (options: Partial<PopoverOptions>) => any;
  onPopoverBound: EventListener;
  onPopoverShown: EventListener;
  onPopoverHidden: EventListener;
  onClick: EventListener;
  updateTagPositions: EventListener;
}

export class Bs4TaggedImageComponent extends Component {
  /**
   * ATTRIBUTES AND SCOPE
   */
  public static tagName = "bs4-tagged-image";

  protected autobind = true;
  public _debug = true;

  static get observedAttributes(): string[] {
    return ["tags", "options", "debug"];
  }

  image?: HTMLImageElement;

  public scope: Scope = {
    debug: false,
    tags: [],
    options: {
      popoverOptions: {}, // set container = this in constructor
      multiPopover: false,
      tagOptions: {}
    },
    fillPopoverOptions: (options: Partial<PopoverOptions>) => {
      return {
        ...this.scope.options.popoverOptions,
        ...this.scope.options.tagOptions.popoverOptions,
        ...options
      };
    },
    triggerOnFocus: (options: Partial<PopoverOptions>) => {
      return this.scope.fillPopoverOptions(options).trigger ? 0 : null;
    },
    onClick: this.onClick.bind(this),
    onPopoverBound: this.onPopoverBound.bind(this),
    onPopoverShown: this.onPopoverShown.bind(this),
    onPopoverHidden: this.onPopoverHidden.bind(this),
    updateTagPositions: debounce(this.updateTagPositions.bind(this))
  };

  /**
   * CONSTRUCTOR AND LIFECYCLE HANDLERS
   */

  constructor() {
    super();
    this.scope.options.popoverOptions.container = this;
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any
  ) {
    if (attributeName === "options") {
      // before the component is bound, we just want to extend the default options
      if (this.bound) {
        this.scope.options = newValue;
      } else {
        this.scope.options = extend({ deep: true }, oldValue, newValue);
      }
      const po = this.scope.options.popoverOptions;
      if (po && typeof po.container === "string") {
        po.container = document.querySelector(po.container) || undefined;
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      this.parseChildTags();
    }
    return template;
  }

  protected async beforeBind() {
    await super.beforeBind();
    // Template has been loaded. So the <img> tag should be there now.
    this.image = this.querySelector("img") as HTMLImageElement;
    this.addEventListeners();
    this.initTags();
  }

  protected addEventListeners() {
    const img = this.image as HTMLImageElement;
    img.addEventListener("load", this.scope.updateTagPositions);
    img.addEventListener("click", this.scope.onClick);
    window.addEventListener("resize", this.scope.updateTagPositions, {
      passive: true
    });
  }

  protected removeEventListeners() {
    const img = this.image as HTMLImageElement;
    img.removeEventListener("load", this.scope.updateTagPositions);
    img.removeEventListener("click", this.scope.onClick);
    window.removeEventListener("resize", this.scope.updateTagPositions);
  }

  protected async afterBind() {
    this.passImageAttributes();
    await super.afterBind();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4TaggedImageComponent.observedAttributes);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.scope.onClick);
    window.removeEventListener("resize", this.scope.updateTagPositions);
  }

  /**
   * LIFECYCLE HELPERS
   */

  protected parseChildTags() {
    this.debug(`parseChildTags()`);
    for (const tagEl of Array.from(
      this.querySelectorAll("tag") as NodeListOf<HTMLElement>
    )) {
      const title = tagEl.getAttribute("title") || "";
      const content = tagEl.innerHTML;

      const x = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tagEl.getAttribute("x") || "")
      );
      const y = ((v) => (isNaN(v) ? Math.random() : v))(
        parseFloat(tagEl.getAttribute("y") || "")
      );

      const shape = tagEl.getAttribute("shape") || undefined;
      const color = tagEl.getAttribute("color") || undefined;
      const borderRadius = tagEl.getAttribute("border-radius") || undefined;
      const fullSize = tagEl.getAttribute("full-size") || undefined;
      const smallSize = tagEl.getAttribute("small-size") || undefined;
      const tagData = {
        ...this.scope.options.tagOptions,
        popoverOptions: this.scope.fillPopoverOptions({
          title,
          content,
          html: true
        }),
        x,
        y,
        shape,
        color,
        borderRadius,
        fullSize,
        smallSize
      };
      this.scope.tags.push(tagData);
    }
  }

  protected initTags() {
    const scopeTagOptions = this.scope.options.tagOptions;
    for (const [index, tag] of this.scope.tags.entries()) {
      tag.index = index;
      tag.shape = tag.shape || scopeTagOptions.shape;
      tag.borderRadius = tag.borderRadius || scopeTagOptions.borderRadius;
      tag.smallSize = tag.smallSize || scopeTagOptions.smallSize;
      tag.fullSize = tag.fullSize || scopeTagOptions.fullSize;
      tag.color = tag.color || scopeTagOptions.color;
    }
  }

  /**
   * Pass all attributes starting with "img-" down to the <img> Tag, without the prefix.
   */
  protected passImageAttributes() {
    const img = this.image as HTMLImageElement;
    const attrs = this.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      if (attrs[i].name.startsWith("img-")) {
        img.setAttribute(attrs[i].name.substr(4), attrs[i].value);
      }
    }
  }

  /**
   * EVENT LISTENERS
   */
  onClick(e: Event) {
    if (this.scope.debug) {
      // adapted from here: https://stackoverflow.com/a/42111623/7048200
      // TODO: avoid using "as any"
      const img = this.image as HTMLImageElement;
      const {
        clientTop,
        clientLeft,
        width,
        height,
        naturalWidth,
        naturalHeight
      } = img;
      const { clientX, clientY } = e as any;
      let x = clientX - clientLeft;
      let y = clientY - clientTop;
      const wRatio = width / naturalWidth;
      const hRatio = height / naturalHeight;
      let actualWidth = width;
      let actualHeight = height;
      if (wRatio < hRatio) {
        // left, right cut off
        actualWidth = (width * hRatio) / wRatio;
        x += (actualWidth - width) / 2;
      } else if (hRatio < wRatio) {
        // left, right cut off
        actualHeight = (height * wRatio) / hRatio;
        y += (actualHeight - height) / 2;
      }
      x *= 100 / actualWidth;
      y *= 100 / actualHeight;
      console.log({ x, y });
    }
  }
  onPopoverBound(event: Event) {
    /*
     *  We get the anchor `el` for each tag here, after they have been bound in the rv-each,
     *  so we can trigger events on them later.
     */
    const boundIndexAttr = (event.target as HTMLElement).getAttribute("index");
    if (boundIndexAttr === null) {
      throw new Error("popup bound on no index");
    }
    const boundIndex = parseInt(boundIndexAttr);
    if (isNaN(boundIndex)) {
      throw new Error(`boundIndex "${boundIndexAttr}" is not a number!`);
    }
    const foundTag = this.scope.tags.find((tag) => tag.index === boundIndex);
    if (foundTag) {
      foundTag.el = event.target as HTMLElement;
    } else {
      throw new Error(
        `Tag with index (${boundIndex}, "${boundIndexAttr}") not found`
      );
    }
  }
  onPopoverShown(event: Event) {
    for (const tag of this.scope.tags) {
      if (tag.el === event.target) {
        // Set shown popover's anchor as active.
        tag.el.classList.add("active");
      } else {
        // Hide all other popovers and remove active class from other tags if multiPopover option is false.
        if (!this.scope.options.multiPopover) {
          tag.el?.classList.remove("active");
          tag.el?.dispatchEvent(new CustomEvent("trigger-hide"));
        }
      }
    }
  }
  onPopoverHidden(event: Event) {
    const found = this.scope.tags.find((tag) => tag.el === event.target);
    if (found) {
      found.el?.classList.remove("active");
    }
  }

  protected updateTagPositions() {
    /*
     * Currently working for object-fit: cover, contain or fill, and object-position: 50% 50% (default)
     * TODO: make this work for all CSS values of "object-position" and "object-fit"!
     */
    const img = this.image as HTMLImageElement;
    const { width, height, naturalWidth, naturalHeight } = img;
    const wRatio = naturalWidth / width;
    const hRatio = naturalHeight / height;
    const fit = window.getComputedStyle(img).getPropertyValue("object-fit");
    if (
      (fit === "cover" && wRatio > hRatio) ||
      (fit === "contain" && hRatio > wRatio)
    ) {
      for (const tag of this.scope.tags) {
        tag.top = tag.y * 100 + "%";
        tag.left = ((wRatio / hRatio) * (tag.x - 0.5) + 0.5) * 100 + "%";
      }
    } else if (fit === "cover" || fit === "contain") {
      for (const tag of this.scope.tags) {
        tag.left = tag.x * 100 + "%";
        tag.top = ((hRatio / wRatio) * (tag.y - 0.5) + 0.5) * 100 + "%";
      }
    } else {
      for (const tag of this.scope.tags) {
        tag.left = tag.x * 100 + "%";
        tag.top = tag.y * 100 + "%";
      }
    }
  }
}
