import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { DropdownService } from "../../services/dropdown.service.js";

import type { Placement } from "@floating-ui/dom";

interface Scope extends ScopeBase {
  toggle: TwDropdownComponent["toggle"];
  show: TwDropdownComponent["show"];
  hide: TwDropdownComponent["hide"];
  isShown: boolean;
  placement: Placement;
}

export class TwDropdownComponent extends Component {
  public static tagName = "tw-dropdown";

  protected autobind = true;

  protected dropdown?: DropdownService;
  protected triggerEl: HTMLElement | null = null;
  protected menuEl: HTMLElement | null = null;

  static get observedAttributes(): string[] {
    return ["placement"];
  }

  public scope: Scope = {
    toggle: this.toggle.bind(this),
    show: this.show.bind(this),
    hide: this.hide.bind(this),
    isShown: false,
    placement: "bottom-start",
  };

  constructor() {
    super();
  }

  public toggle() {
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }
    this.dropdown.toggle();
  }

  public show() {
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }
    this.dropdown.show();
  }

  public hide() {
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }
    this.dropdown.hide();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwDropdownComponent.observedAttributes);
  }

  protected async afterBind() {
    this.initDropdown();
    this.addDropdownListeners();
    await super.afterBind();
  }

  protected initDropdown() {
    // Find the trigger element: a button or element with [data-dropdown-trigger]
    this.triggerEl =
      this.querySelector<HTMLElement>("[data-dropdown-trigger]") ||
      this.querySelector<HTMLElement>("button") ||
      this;

    // Find the menu element: an element with [data-dropdown-menu] or role="menu"
    this.menuEl =
      this.querySelector<HTMLElement>("[data-dropdown-menu]") ||
      this.querySelector<HTMLElement>('[role="menu"]') ||
      this.querySelector<HTMLElement>("ul") ||
      this.querySelector<HTMLElement>("div:last-child");

    if (!this.menuEl) {
      console.warn("[tw-dropdown] No menu element found.");
      return;
    }

    // Apply Tailwind positioning classes
    this.menuEl.classList.add("absolute", "z-50");

    this.dropdown = new DropdownService(this.triggerEl, this.menuEl, {
      placement: this.scope.placement,
    });

    this.scope.isShown = this.dropdown.isShown;
  }

  protected _onShown = () => {
    this.scope.isShown = true;
  };

  protected _onHidden = () => {
    this.scope.isShown = false;
  };

  protected addDropdownListeners() {
    this.triggerEl?.addEventListener("tw.dropdown.shown", this._onShown);
    this.triggerEl?.addEventListener("tw.dropdown.hidden", this._onHidden);
  }

  protected removeDropdownListeners() {
    this.triggerEl?.removeEventListener("tw.dropdown.shown", this._onShown);
    this.triggerEl?.removeEventListener("tw.dropdown.hidden", this._onHidden);
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeDropdownListeners();
    this.dropdown?.dispose();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
