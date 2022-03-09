import { Binder } from "@ribajs/core/src/index.js";
import { Dropdown } from "../services/dropdown";
import { Dropdown as BSDropdown } from "bootstrap";

/**
 *
 * @see https://getbootstrap.com/docs/5.0/components/dropdowns/#via-javascript
 */
export class DropdownBinder extends Binder<
  Partial<BSDropdown.Options>,
  HTMLInputElement
> {
  static key = "bs5-dropdown";

  private toggler?: HTMLButtonElement | HTMLAnchorElement;

  private dropdownService?: Dropdown;

  bind(el: HTMLElement) {
    this.toggler = ((el.classList.contains("dropdown-toggle")
      ? el
      : el.querySelector(".dropdown-toggle")) || el) as
      | HTMLButtonElement
      | HTMLAnchorElement;
  }

  routine(el: HTMLElement, option = {}) {
    if (!this.toggler) {
      throw new Error("No dropdown toggle element found!");
    }
    if (this.dropdownService) {
      const dropdownService: Dropdown = this.dropdownService;
      dropdownService.dispose();
      // To detect this element as an dropdown by the bootstrap logic
      this.toggler.dataset.bsToggle = "";
    }
    const dropdownService = new Dropdown(this.toggler, option);
    // To detect this element as an dropdown by the bootstrap logic
    this.toggler.dataset.bsToggle = "dropdown";
    this.dropdownService = dropdownService;
  }
}
