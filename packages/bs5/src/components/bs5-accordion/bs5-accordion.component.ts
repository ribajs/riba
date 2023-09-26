import {
  handleizeFormatter,
  FormatterFn,
  TemplatesComponent,
  ScopeBase,
} from "@ribajs/core";
import { Collapse } from "../../services/collapse.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import {
  JsxBs5AccordionProps,
  CollapseEvents,
  AccordionItem,
} from "../../types/index.js";

import template from "./bs5-accordion.component.html?raw";

const handleize = handleizeFormatter.read as FormatterFn;

interface Scope extends ScopeBase {
  items: AccordionItem[];
  toggle: Bs5AccordionComponent["toggle"];
  show: Bs5AccordionComponent["show"];
  hide: Bs5AccordionComponent["hide"];
  collapseIconSrc?: string;
  collapseIconSize: number;
  showOnlyOne: boolean;
}

export class Bs5AccordionComponent extends TemplatesComponent {
  public static tagName = "bs5-accordion";

  protected autobind = true;
  public _debug = false;

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

  // protected collapseServices: Collapse[] = [];

  static get observedAttributes(): (keyof JsxBs5AccordionProps)[] {
    return [
      "items",
      "collapse-icon-src",
      "collapse-icon-size",
      "show-only-one",
    ];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5AccordionComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    items: [],
    toggle: this.toggle.bind(this),
    show: this.show.bind(this),
    hide: this.hide.bind(this),
    collapseIconSize: 16,
    showOnlyOne: true,
  };

  public hide(item: AccordionItem, index: number) {
    const target = this.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (target) {
      this.initItemEventListeners(item, target);
      new Collapse(target, { toggle: false }).hide();
    }
  }

  public show(item: AccordionItem, index: number) {
    const target = this.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const others = Array.from(
      this.querySelectorAll<HTMLElement>(
        `[data-index]:not([data-index="${index}"])`,
      ),
    );
    if (others && this.scope.showOnlyOne) {
      for (const other of others) {
        new Collapse(other, { toggle: false }).hide();
      }
    }
    if (target) {
      this.initItemEventListeners(item, target);
      new Collapse(target, { toggle: false }).show();
    }
  }

  public toggle(item: AccordionItem, index: number) {
    const target = this.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const others = Array.from(
      this.querySelectorAll<HTMLElement>(
        `[data-index]:not([data-index="${index}"])`,
      ),
    );
    if (others && this.scope.showOnlyOne) {
      for (const other of others) {
        new Collapse(other, { toggle: false }).hide();
      }
    }
    if (target) {
      this.initItemEventListeners(item, target);
      new Collapse(target, { toggle: false }).toggle();
    }
  }

  protected initItemEventListeners(item: AccordionItem, element: HTMLElement) {
    element.removeEventListener(
      CollapseEvents.hide,
      this.onHide.bind(this, element, item),
    );
    element.removeEventListener(
      CollapseEvents.show,
      this.onShow.bind(this, element, item),
    );
    element.addEventListener(
      CollapseEvents.hide,
      this.onHide.bind(this, element, item),
      { once: true },
    );
    element.addEventListener(
      CollapseEvents.show,
      this.onShow.bind(this, element, item),
      { once: true },
    );
  }

  protected getContentChildByIndex() {
    return this.querySelector(`.card-body > *`) || undefined;
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
    attributes.handle = attributes.handle || handleize(attributes.title);
    attributes.show = !!attributes.show;
    attributes.iconDirection =
      attributes.iconDirection || attributes.show ? "up" : "down";

    return attributes;
  }

  /**
   * Trigger `visibility-changed` for components that need to update if visibility changes.
   * Se also bsf-tabs
   * @param element
   * @param visible
   */
  protected triggerVisibilityChangedForElement(
    element: Element,
    visible: boolean,
  ) {
    setTimeout(() => {
      // Use this event to update any custom element when it becomes visible
      element.dispatchEvent(
        new CustomEvent("visibility-changed", { detail: { visible } }),
      );
    }, 200);
  }

  protected async template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this) || this.hasOnlyTemplateChilds()) {
      return template;
    } else {
      return null;
    }
  }
}
