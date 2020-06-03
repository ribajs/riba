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

  protected collapseElements: NodeListOf<HTMLElement> | HTMLElement[] = [];
  protected collapseServices: CollapseService[] = [];
  protected router?: EventDispatcher;

  static get observedAttributes() {
    return ["collapse-selector"];
  }

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected async afterBind() {
    await super.afterBind();
    this.hide();
  }

  public toggle(event?: Event) {
    for (const collapseService of this.collapseServices) {
      collapseService.toggle();
    }

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public show(event?: Event) {
    for (const collapseService of this.collapseServices) {
      collapseService.show();
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public hide(event?: Event) {
    for (const collapseService of this.collapseServices) {
      collapseService.hide();
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.router = new EventDispatcher("main");
    this.router.on("newPageReady", this.onNewPageReady.bind(this));

    this.setCollapseElement();

    this.onStateChange();

    this.init(Bs4NavbarComponent.observedAttributes);
  }

  protected setCollapseElement() {
    // Remove old event listeners
    this.removeCollapseEventListeners();

    this.collapseElements =
      this.el.querySelectorAll<HTMLElement>(this.scope.collapseSelector) || [];

    // Add new event listeners
    this.addCollapseEventListeners();

    if (this.collapseElements) {
      for (const collapseElement of Array.from(this.collapseElements)) {
        this.collapseServices.push(
          new CollapseService(collapseElement, [this.el], { toggle: false })
        );
      }
    }

    this.hide();
  }

  protected addCollapseEventListeners() {
    if (this.collapseElements) {
      this.collapseElements.forEach((collapseElement: HTMLElement) => {
        collapseElement.addEventListener(
          EVENT_SHOWN,
          this.onStateChange.bind(this)
        );
        collapseElement.addEventListener(
          EVENT_HIDDEN,
          this.onStateChange.bind(this)
        );
      });
    }
  }

  protected removeCollapseEventListeners() {
    if (this.collapseElements) {
      this.collapseElements.forEach((collapseElement: HTMLElement) => {
        collapseElement.removeEventListener(
          EVENT_SHOWN,
          this.onStateChange.bind(this)
        );
        collapseElement.removeEventListener(
          EVENT_HIDDEN,
          this.onStateChange.bind(this)
        );
      });
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeCollapseEventListeners();
    if (this.router) {
      this.router.off("newPageReady", this.onNewPageReady);
    }
  }

  protected onStateChange() {
    this.scope.isCollapsed = !!this.collapseServices[0]?.isCollapsed();

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
