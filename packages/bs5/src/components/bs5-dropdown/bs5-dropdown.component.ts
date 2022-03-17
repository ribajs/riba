import { Component, TemplateFunction } from "@ribajs/core";
import { Dropdown } from "../../services/dropdown.js";

export class Bs5DropdownComponent extends Component {
  public static tagName = "bs5-dropdown";

  public scope: any = {
    toggle: this.toggle
  };

  public dropdown?: Dropdown;
  protected toggler: HTMLElement | Bs5DropdownComponent | null = null;

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.dropdown) {
      throw new Error("Dropdown not ready!");
    }
    return this.dropdown.toggle();
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
    this.dropdown = new Dropdown(this.toggler, {});
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
