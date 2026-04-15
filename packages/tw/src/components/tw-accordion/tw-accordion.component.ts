import { TemplatesComponent } from "@ribajs/core";
import { CollapseService } from "../../services/collapse.service.js";
import template from "./tw-accordion.component.html?raw";

interface AccordionItem {
  title: string;
  content: string;
  show?: boolean;
  iconDirection?: string;
  handle?: string;
}

export class TwAccordionComponent extends TemplatesComponent {
  public static tagName = "tw-accordion";

  static get observedAttributes(): string[] {
    return [
      "items",
      "collapse-icon-src",
      "collapse-icon-size",
      "show-only-one",
    ];
  }

  protected autobind = true;

  protected templateAttributes = [
    { name: "title", required: true },
    { name: "show", required: false, type: "boolean" as const },
    { name: "icon-direction", required: false },
  ];

  protected collapseServices = new Map<number, CollapseService>();

  public scope = {
    items: [] as AccordionItem[],
    toggle: this.toggle.bind(this),
    show: this.showItem.bind(this),
    hide: this.hideItem.bind(this),
    collapseIconSrc: undefined as string | undefined,
    collapseIconSize: 16,
    showOnlyOne: true,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwAccordionComponent.observedAttributes);
  }

  protected async afterBind() {
    await super.afterBind();
    // Initialize CollapseService for each item so the initial state is correct
    this.scope.items.forEach((item, index) => {
      const el = this.getCollapseEl(index);
      if (el) {
        el.style.transition = "max-height 0.3s ease";
        const service = new CollapseService(el, { show: !!item.show });
        this.collapseServices.set(index, service);
      }
    });
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected transformTemplateAttributes(
    attributes: Record<string, any>,
    index: number,
  ): AccordionItem {
    const result = super.transformTemplateAttributes(attributes, index);
    result.handle =
      result.handle || (result.title || "").toLowerCase().replace(/\s+/g, "-");
    result.show = !!result.show;
    result.iconDirection =
      result.iconDirection || (result.show ? "up" : "down");
    return result;
  }

  public toggle(item: AccordionItem, index: number) {
    const el = this.getCollapseEl(index);
    if (!el) return;

    const service = this.getOrCreateService(el, index, !item.show);

    if (item.show) {
      this.onHide(item, index);
      service.hide();
    } else {
      if (this.scope.showOnlyOne) {
        this.hideAll(index);
      }
      this.onShow(item, index);
      service.show();
    }
  }

  public showItem(item: AccordionItem, index: number) {
    const el = this.getCollapseEl(index);
    if (!el) return;

    if (this.scope.showOnlyOne) {
      this.hideAll(index);
    }

    const service = this.getOrCreateService(el, index, false);
    service.show();
    this.onShow(item, index);
  }

  public hideItem(item: AccordionItem, index: number) {
    const el = this.getCollapseEl(index);
    if (!el) return;

    const service = this.getOrCreateService(el, index, true);
    service.hide();
    this.onHide(item, index);
  }

  protected hideAll(exceptIndex?: number) {
    this.scope.items.forEach((item, i) => {
      if (i !== exceptIndex && item.show) {
        this.hideItem(item, i);
      }
    });
  }

  protected getCollapseEl(index: number): HTMLElement | null {
    return this.querySelector<HTMLElement>(`[data-index="${index}"]`);
  }

  protected getOrCreateService(
    el: HTMLElement,
    index: number,
    startHidden: boolean,
  ): CollapseService {
    let service = this.collapseServices.get(index);
    if (!service) {
      el.style.transition = "max-height 0.3s ease";
      service = new CollapseService(el, { show: !startHidden });
      this.collapseServices.set(index, service);
    }
    return service;
  }

  protected onShow(item: AccordionItem, _index: number) {
    item.show = true;
    item.iconDirection = "up";
    this.dispatchEvent(
      new CustomEvent("visibility-changed", {
        detail: { item, show: true },
      }),
    );
  }

  protected onHide(item: AccordionItem, _index: number) {
    item.show = false;
    item.iconDirection = "down";
    this.dispatchEvent(
      new CustomEvent("visibility-changed", {
        detail: { item, show: false },
      }),
    );
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.collapseServices.forEach((service) => service.dispose());
    this.collapseServices.clear();
  }

  protected template() {
    if (this.hasChildNodes()) {
      const children = Array.from(this.children);
      const hasNonTemplate = children.some((c) => c.tagName !== "TEMPLATE");
      if (hasNonTemplate) return null;
    }
    return template;
  }
}
