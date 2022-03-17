import { Component, TemplateFunction } from "@ribajs/core";
import { DropdownService } from "../../services/dropdown.service.js";

export class Bs4DropdownComponent extends Component {
  public static tagName = "bs4-dropdown";

  public scope: any = {
    toggle: this.toggle
  };

  protected dropdownService?: DropdownService;

  static get observedAttributes(): string[] {
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

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
