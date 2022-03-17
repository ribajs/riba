import { Binder } from "@ribajs/core";
import { DropdownService } from "../services/dropdown.service.js";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/dropdown/
 */
export class DropdownBinder extends Binder<string, HTMLElement> {
  static key = "bs4-dropdown";

  private toggler?: HTMLButtonElement | HTMLAnchorElement;

  private dropdownService?: DropdownService;

  bind(el: HTMLElement) {
    this.toggler = ((el.classList.contains("dropdown-toggle")
      ? el
      : el.querySelector(".dropdown-toggle")) || el) as
      | HTMLButtonElement
      | HTMLAnchorElement;
  }

  routine(el: HTMLElement, option: any = {}) {
    if (!this.toggler) {
      throw new Error("No dropdown toggle element found!");
    }
    if (this.dropdownService) {
      this.dropdownService.dispose();
      this.toggler.removeEventListener("click", this.dropdownService.toggle);
    }
    this.dropdownService = new DropdownService(this.toggler, option);
    this.dropdownService.toggle = this.dropdownService.toggle.bind(
      this.dropdownService
    );
    this.toggler.addEventListener("click", this.dropdownService.toggle);
  }
}
