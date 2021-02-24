import { Binder } from "@ribajs/core";
import { DropdownService } from "../services/dropdown.service";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/dropdown/
 */
export const dropdownBinder: Binder<string> = {
  name: "bs4-dropdown",
  bind(el: HTMLElement) {
    this.customData = {
      toggler:
        (el.classList.contains("dropdown-toggle")
          ? el
          : el.querySelector(".dropdown-toggle")) || el,
    };
  },
  routine(el: HTMLElement, option: any = {}) {
    if (this.customData.dropdownService) {
      this.customData.dropdownService.dispose();
      this.customData.toggler.removeEventListener(
        "click",
        this.customData.dropdownService.toggle
      );
    }
    this.customData.dropdownService = new DropdownService(
      this.customData.toggler,
      option
    );
    this.customData.dropdownService.toggle = this.customData.dropdownService.toggle.bind(
      this.customData.dropdownService
    );
    this.customData.toggler.addEventListener(
      "click",
      this.customData.dropdownService.toggle
    );
  },
};
