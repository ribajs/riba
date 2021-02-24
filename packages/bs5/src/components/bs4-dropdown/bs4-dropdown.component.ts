import { Component } from "@ribajs/core";
import { DropdownService } from "../../services/dropdown.service";

export class Bs4DropdownComponent extends Component {
  public static tagName = "bs4-dropdown";

  protected scope: any = {
    toggle: this.toggle,
  };

  protected dropdownService?: DropdownService;

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
      throw new Error("DropdownService not ready!");
    }
    return this.dropdownService.toggle();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.dropdownService = new DropdownService(
      this.querySelector(".dropdown-toggle") as
        | HTMLButtonElement
        | HTMLAnchorElement
    );
    this.init(Bs4DropdownComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
