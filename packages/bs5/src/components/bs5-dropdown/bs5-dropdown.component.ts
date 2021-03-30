import { Component, TemplateFunction } from "@ribajs/core";
import { Dropdown } from "../../services/dropdown";

export class Bs5DropdownComponent extends Component {
  public static tagName = "bs5-dropdown";

  protected scope: any = {
    toggle: this.toggle,
  };

  public dropdown?: Dropdown;
  protected dropdownEl: HTMLElement | Bs5DropdownComponent | null = null;

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
    this.dropdownEl = this.querySelector(".dropdown-toggle") || this;
    this.dropdown = new Dropdown(this.dropdownEl);
    // To detect this element as an dropdown by the bootstrap logic
    this.dropdownEl.dataset.bsToggle = "dropdown";
    this.init(Bs5DropdownComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
