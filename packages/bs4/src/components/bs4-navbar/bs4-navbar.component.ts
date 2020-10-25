import { Component, EventDispatcher } from "@ribajs/core";
import {
  CollapseService,
  EVENT_SHOWN,
  EVENT_HIDDEN,
  CLASS_NAME_COLLAPSED,
} from "../../services/collapse.service";

export class Bs4NavbarComponent extends Component {
  public static tagName = "bs4-navbar";

  protected scope: any = {
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
    isCollapsed: true,
    collapseSelector: ".navbar-collapse",
  };

  protected collapseTargets: Map<HTMLElement, CollapseService> = new Map();
  protected routerEvents?: EventDispatcher;

  static get observedAttributes() {
    return ["collapse-selector"];
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.onStateChange = this.onStateChange.bind(this);
  }

  protected async afterBind() {
    await super.afterBind();
    this.hide();
  }

  public toggle(event?: Event) {
    for (const collapseService of this.collapseTargets.values()) {
      collapseService.toggle();
    }

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public show(event?: Event) {
    for (const collapseService of this.collapseTargets.values()) {
      collapseService.show();
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public hide(event?: Event) {
    for (const collapseService of this.collapseTargets.values()) {
      collapseService.hide();
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.routerEvents = new EventDispatcher("main");
    this.routerEvents.on("newPageReady", this.onNewPageReady, this);

    this.setCollapseElement();

    this.onStateChange();

    this.init(Bs4NavbarComponent.observedAttributes);
  }

  protected setCollapseElement() {
    const collapseElements = Array.from(
      this.el.querySelectorAll<HTMLElement>(this.scope.collapseSelector) || []
    );

    // remove old collapse targets
    for (const collapseElement of this.collapseTargets.keys()) {
      if (!collapseElements.find((ce) => ce === collapseElement)) {
        this.disposeCollapseTarget(collapseElement);
      }
    }

    // add new collapse targets
    for (const collapseElement of collapseElements) {
      if (!this.collapseTargets.has(collapseElement)) {
        this.collapseTargets.set(
          collapseElement,
          new CollapseService(collapseElement, [this.el], { toggle: false })
        );
        collapseElement.addEventListener(EVENT_SHOWN, this.onStateChange);
        collapseElement.addEventListener(EVENT_HIDDEN, this.onStateChange);
      }
    }

    this.hide();
  }

  protected disposeCollapseTargets() {
    for (const collapseElement of this.collapseTargets.keys()) {
      this.disposeCollapseTarget(collapseElement);
    }
  }

  protected disposeCollapseTarget(collapseElement: HTMLElement) {
    const collapseService = this.collapseTargets.get(collapseElement);
    if (collapseService) {
      collapseService.dispose();
    }
    this.collapseTargets.delete(collapseElement);
    collapseElement.removeEventListener(EVENT_SHOWN, this.onStateChange);
    collapseElement.removeEventListener(EVENT_HIDDEN, this.onStateChange);
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.disposeCollapseTargets();
    if (this.routerEvents) {
      this.routerEvents.off("newPageReady", this.onNewPageReady, this);
    }
  }

  protected onStateChange() {
    this.scope.isCollapsed = this.collapseTargets
      .values()
      .next()
      .value?.isCollapsed();

    if (this.scope.isCollapsed) {
      this.el.classList.add(CLASS_NAME_COLLAPSED);
      this.el.setAttribute("aria-expanded", "false");
    } else {
      this.el.classList.remove(CLASS_NAME_COLLAPSED);
      this.el.setAttribute("aria-expanded", "true");
    }
  }

  protected onNewPageReady() {
    this.hide();
  }

  protected parsedAttributeChangedCallback(
    attributeName: string | string[],
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
    if (attributeName === "collapseSelector") {
      this.setCollapseElement();
    }
  }

  protected template() {
    return null;
  }
}
