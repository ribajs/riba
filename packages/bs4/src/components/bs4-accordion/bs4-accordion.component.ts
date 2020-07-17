import { handleizeFormatter } from "@ribajs/core";
import {
  CollapseService,
  EVENT_HIDE,
  EVENT_SHOW,
} from "../../services/collapse.service";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import { TemplatesComponent } from "../templates/templates.component";

import template from "./bs4-accordion.component.html";

interface AccordionItem {
  title: string;
  content: string;
  show: boolean;
  iconDirection:
    | "left"
    | "left-up"
    | "up"
    | "up-right"
    | "right"
    | "right-down"
    | "down"
    | "down-left";
}

interface Scope {
  items: AccordionItem[];
  toggle: Bs4AccordionComponent["toggle"];
  show: Bs4AccordionComponent["show"];
  hide: Bs4AccordionComponent["hide"];
  collapseIconSrc?: string;
  collapseIconSize: number;
  showOnlyOne: boolean;
}

export class Bs4AccordionComponent extends TemplatesComponent {
  public static tagName = "bs4-accordion";

  protected autobind = true;

  protected templateAttributes = [
    {
      name: "title",
      required: true,
    },
    {
      name: "show",
      required: false,
    },
    {
      name: "icon-direction",
      required: false,
    },
  ];

  // protected collapseServices: CollapseService[] = [];

  static get observedAttributes() {
    return ["collapse-icon-src", "collapse-icon-size", "show-only-one"];
  }

  protected scope: Scope = {
    items: [],
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
    collapseIconSize: 16,
    showOnlyOne: true,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  public hide(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    );
    if (target) {
      this.initItemEventListeners(item, target);
      new CollapseService(target, [this.el], { toggle: false }).hide();
    }
  }

  public show(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    );
    const others = Array.from(
      this.el.querySelectorAll<HTMLElement>(
        `[data-index]:not([data-index="${index}"])`
      )
    );
    if (others && this.scope.showOnlyOne) {
      for (const other of others) {
        new CollapseService(other, [], { toggle: false }).hide();
      }
    }
    if (target) {
      this.initItemEventListeners(item, target);
      new CollapseService(target, [], { toggle: false }).show();
    }
  }

  public toggle(item: AccordionItem, index: number) {
    const target = this.el.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    );
    const others = Array.from(
      this.el.querySelectorAll<HTMLElement>(
        `[data-index]:not([data-index="${index}"])`
      )
    );
    if (others && this.scope.showOnlyOne) {
      for (const other of others) {
        new CollapseService(other, [], { toggle: false }).hide();
      }
    }
    if (target) {
      this.initItemEventListeners(item, target);
      new CollapseService(target, [], { toggle: false }).toggle();
    }
  }

  protected initItemEventListeners(item: AccordionItem, element: HTMLElement) {
    element.removeEventListener(
      EVENT_HIDE,
      this.onHide.bind(this, element, item)
    );
    element.removeEventListener(
      EVENT_SHOW,
      this.onShow.bind(this, element, item)
    );
    element.addEventListener(
      EVENT_HIDE,
      this.onHide.bind(this, element, item),
      { once: true }
    );
    element.addEventListener(
      EVENT_SHOW,
      this.onShow.bind(this, element, item),
      { once: true }
    );
  }

  protected getContentChildByIndex() {
    return this.el.querySelector(`.card-body > *`) || undefined;
  }

  protected onShow(element: HTMLElement, item: AccordionItem) {
    item.show = true;
    item.iconDirection = "up";
    const firstContentChild = this.getContentChildByIndex();
    if (firstContentChild) {
      this.triggerVisibilityChangedForElement(firstContentChild, item.show);
    }
  }

  protected onHide(element: HTMLElement, item: AccordionItem) {
    item.show = false;
    item.iconDirection = "down";
    const firstContentChild = this.getContentChildByIndex();
    if (firstContentChild) {
      this.triggerVisibilityChangedForElement(firstContentChild, item.show);
    }
  }

  protected transformTemplateAttributes(attributes: any) {
    attributes.handle =
      attributes.handle || handleizeFormatter.read(attributes.title);
    attributes.show = !!attributes.show;
    attributes.iconDirection =
      attributes.iconDirection || attributes.show ? "up" : "down";

    return attributes;
  }

  /**
   * Trigger `visibility-changed` for components that need to update if visibility changes.
   * Se also bsf-tabs
   * @param element
   * @param visibile
   */
  protected triggerVisibilityChangedForElement(
    element: Element,
    visibile: boolean
  ) {
    setTimeout(() => {
      // Use this event to update any custom element when it becomes visibile
      element.dispatchEvent(
        new CustomEvent("visibility-changed", { detail: { visibile } })
      );
    }, 200);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4AccordionComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    return await super.beforeBind();
  }

  protected async afterBind() {
    return await super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this.el) || this.hasOnlyTemplateChilds()) {
      return template;
    } else {
      return null;
    }
  }
}
