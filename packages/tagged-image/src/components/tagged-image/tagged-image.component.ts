import { Component } from "@ribajs/core";
import { PopoverOptions } from "@ribajs/bs4";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./tagged-image.component.html";

interface Options {
  popoverOptions: Partial<PopoverOptions>;
  multiPopover: boolean;
}
interface Tag {
  x: number;
  y: number;
  index?: number;
  left?: string;
  top?: string;
  popoverOptions: Partial<PopoverOptions>;
  el?: HTMLElement;
}
interface Scope {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  options: Options;
  tags: Tag[];
  fillPopoverOptions: (
    options: Partial<PopoverOptions>
  ) => Partial<PopoverOptions>;
  onPopoverBound: EventListener;
  onPopoverShown: EventListener;
}

export class TaggedImageComponent extends Component {
  public static tagName = "tagged-image";

  protected autobind = true;
  public _debug = true;

  static get observedAttributes() {
    return ["src", "sizes", "srcset", "alt", "tags", "options"];
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
      // If we allow multiPopover, we don't need to hide anything.
      if (this.scope.options.multiPopover) {
        return;
      }
      // Hide all the other popovers.
      for (const tag of this.scope.tags) {
        if (tag.el !== event.target) {
          tag.el?.dispatchEvent(new CustomEvent("trigger-hide"));
        }
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

      const tagData = {
        popoverOptions: {
          title,
          content,
          html: true,
          ...this.scope.options.popoverOptions,
        },
        x,
        y,
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
