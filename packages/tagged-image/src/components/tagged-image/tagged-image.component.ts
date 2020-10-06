import { extend } from "@ribajs/utils";

import { Component } from "@ribajs/core";
import { PopoverOptions } from "@ribajs/bs4";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./tagged-image.component.html";

interface Options {
  popoverOptions: Partial<PopoverOptions>;
  multiPopover: boolean;
}

/*
 * TODO: make tag an own component to encapsulate attributes?
 */
interface Tag {
  x: number;
  y: number;
  index?: number;
  left?: string;
  top?: string;
  popoverOptions: Partial<PopoverOptions>;
  el?: HTMLElement;
  /*
   * TODO: Currently using this "hack" here to style the tag::before pseudo-selector:
   * https://stackoverflow.com/a/40179718/7048200
   * Maybe there are better solutions?
   * Also think about scoped styles in case of custom elements support? Could be nice for the future.
   */
  shape?: string; // "circle" | "square"; // for border radius 100% or 0
  color?: string; // names for bootstrap theme colors or any CSS color expression
  borderRadius?: string; // CSS string
  smallSize?: string; // CSS string
  fullSize?: string; // CSS string
}
interface Scope {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  lazyload: string;
  options: Options;
  tags: Tag[];
  fillPopoverOptions: (
    options: Partial<PopoverOptions>
  ) => Partial<PopoverOptions>;
  onPopoverBound: EventListener;
  onPopoverShown: EventListener;
  onPopoverHidden: EventListener;
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;
  public _debug = true;

  static get observedAttributes() {
    return ["src", "sizes", "srcset", "alt", "lazyload", "tags", "options"];
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.scope.options.popoverOptions.container = this.el;
  }

  protected scope: Scope = {
    src: "",
    srcset: "",
    sizes: "",
    alt: "",
    lazyload: "",
    tags: [],
    options: {
      popoverOptions: {}, // set container = this.el in constructor
      multiPopover: false,
    },
    fillPopoverOptions: (options: Partial<PopoverOptions>) => {
      return { ...this.scope.options.popoverOptions, ...options };
    },
    onPopoverBound: (event: Event) => {
      /*
       *  We get the anchor `el` for each tag here, after they have been bound in the rv-each,
       *  so we can trigger events on them later.
       */
      const boundIndexAttr = (event.target as HTMLElement).getAttribute(
        "index"
      );
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
    },
    onPopoverShown: (event: Event) => {
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
    },
    onPopoverHidden: (event: Event) => {
      const found = this.scope.tags.find((tag) => tag.el === event.target);
      if (found) {
        found.el?.classList.remove("active");
      }
    },
  };

  protected parseChildTags() {
    this.debug(`parseChildTags()`);
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

      const shape = tagEl.getAttribute("shape") || undefined;
      const color = tagEl.getAttribute("color") || undefined;
      const borderRadius = tagEl.getAttribute("border-radius") || undefined;
      const fullSize = tagEl.getAttribute("full-size") || undefined;
      const smallSize = tagEl.getAttribute("small-size") || undefined;
      const tagData = {
        popoverOptions: {
          title,
          content,
          html: true,
          ...this.scope.options.popoverOptions,
        },
        x,
        y,
        shape,
        color,
        borderRadius,
        fullSize,
        smallSize,
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
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TaggedImageComponent.observedAttributes);
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
        this.scope.options = extend(true, oldValue, newValue);
      }
    }
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
