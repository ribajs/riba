import { Component } from "@ribajs/core";
import { Dropdown } from "../../services/dropdown";

export class Bs5DropdownComponent extends Component {
  public static tagName = "bs5-dropdown";

  protected scope: any = {
    toggle: this.toggle,
  };

  protected dropdownService?: Dropdown;

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.dropdownService) {
      throw new Error("Dropdown not ready!");
    }
    return this.dropdownService.toggle();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.dropdownService = new Dropdown(
      this.querySelector(".dropdown-toggle") as
        | HTMLButtonElement
        | HTMLAnchorElement
    );
    this.init(Bs5DropdownComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
