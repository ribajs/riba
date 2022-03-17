import { Component, TemplateFunction } from "@ribajs/core";
import { Dropdown } from "../../services/dropdown.js";
import { Dropdown as BSDropdown } from "bootstrap";
import { JsxBs5DropdownProps } from "../../types/jsx/jsx-dropdown-props";

interface Scope extends Partial<BSDropdown.Options> {
  toggle: Bs5DropdownComponent['toggle'];
  show: Bs5DropdownComponent['show'];
  hide: Bs5DropdownComponent['hide'];
  update: Bs5DropdownComponent['update'];
}

export class Bs5DropdownComponent extends Component {
  public static tagName = "bs5-dropdown";

  public scope: Scope = {
    toggle: this.toggle,
    show: this.show,
    hide: this.hide,
    update: this.update
  };

  public dropdown?: Dropdown;
  protected toggler: HTMLElement | Bs5DropdownComponent | null = null;

  static get observedAttributes(): (keyof JsxBs5DropdownProps)[] {
    return ['offset', 'boundary', 'reference', 'display', 'popper-config', 'auto-close'];
  }

  constructor() {
    super();
  }

  public toggle(event: Event, ctx: Scope, el: any) {
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }

    // Only call toggle if this is not called by the dropdown service itself which is the case on the toggler element
    if (el !== this.toggler) {
      this.dropdown.toggle();
    }
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

  public update() {
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }

    this.dropdown.update();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5DropdownComponent.observedAttributes);
  }

  async afterBind() {
    this.toggler = this.classList.contains("dropdown-toggle")
      ? this
      : this.querySelector<HTMLElement>(".dropdown-toggle") || this;

    // To detect this element as an dropdown by the bootstrap logic
    this.toggler.dataset.bsToggle = "dropdown";
    this.dropdown = new Dropdown(this.toggler, this.scope);
    this.dropdown.hide();
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
