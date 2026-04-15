import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "../../services/collapse.service.js";

interface Scope extends ScopeBase {
  toggle: TwNavbarComponent["toggle"];
  show: TwNavbarComponent["show"];
  hide: TwNavbarComponent["hide"];
  isCollapsed: boolean;
  collapseSelector: string;
}

export class TwNavbarComponent extends Component {
  public static tagName = "tw-navbar";

  protected autobind = true;

  protected collapseServices = new Map<HTMLElement, CollapseService>();
  protected routerEvents?: EventDispatcher;

  static get observedAttributes(): string[] {
    return ["collapse-selector"];
  }

  public scope: Scope = {
    toggle: this.toggle.bind(this),
    show: this.show.bind(this),
    hide: this.hide.bind(this),
    isCollapsed: true,
    collapseSelector: "[data-navbar-collapse]",
  };

  constructor() {
    super();
    this.onStateChange = this.onStateChange.bind(this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.routerEvents = new EventDispatcher("main");
    this.routerEvents.on("newPageReady", this.onNewPageReady, this);
    this.setCollapseElements();
    this.onStateChange();
    this.init(TwNavbarComponent.observedAttributes);
  }

  protected async afterBind() {
    this.hide();
    await super.afterBind();
  }

  public toggle(event?: Event) {
    for (const service of this.collapseServices.values()) {
      service.toggle();
    }
    this.onStateChange();
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public show(event?: Event) {
    for (const service of this.collapseServices.values()) {
      service.show();
    }
    this.onStateChange();
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public hide(event?: Event) {
    for (const service of this.collapseServices.values()) {
      service.hide();
    }
    this.onStateChange();
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  protected setCollapseElements() {
    const collapseElements = Array.from(
      this.querySelectorAll<HTMLElement>(this.scope.collapseSelector) || [],
    );

    // Remove stale entries
    for (const el of this.collapseServices.keys()) {
      if (!collapseElements.includes(el)) {
        this.disposeCollapseElement(el);
      }
    }

    // Add new entries
    for (const el of collapseElements) {
      if (!this.collapseServices.has(el)) {
        el.style.transition = "max-height 0.3s ease";
        const service = new CollapseService(el, { show: false });
        this.collapseServices.set(el, service);
        el.addEventListener("tw.collapse.shown", this.onStateChange);
        el.addEventListener("tw.collapse.hidden", this.onStateChange);
      }
    }

    this.hide();
  }

  protected disposeCollapseElement(el: HTMLElement) {
    const service = this.collapseServices.get(el);
    if (service) {
      service.dispose();
    }
    this.collapseServices.delete(el);
    el.removeEventListener("tw.collapse.shown", this.onStateChange);
    el.removeEventListener("tw.collapse.hidden", this.onStateChange);
  }

  protected disposeAllCollapseElements() {
    for (const el of this.collapseServices.keys()) {
      this.disposeCollapseElement(el);
    }
  }

  protected onStateChange() {
    const firstService = this.collapseServices.values().next().value;
    this.scope.isCollapsed = firstService ? firstService.isCollapsed : true;

    if (this.scope.isCollapsed) {
      this.setAttribute("aria-expanded", "false");
    } else {
      this.setAttribute("aria-expanded", "true");
    }
  }

  protected onNewPageReady() {
    this.hide();
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
    if (attributeName === "collapseSelector") {
      this.setCollapseElements();
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.disposeAllCollapseElements();
    if (this.routerEvents) {
      this.routerEvents.off("newPageReady", this.onNewPageReady, this);
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
