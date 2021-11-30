import { BinderDeprecated } from "@ribajs/core";
import { Dropdown } from "../services/dropdown";
import { Dropdown as BSDropdown } from "bootstrap";

/**
 *
 * @see https://getbootstrap.com/docs/5.0/components/dropdowns/#via-javascript
 */
export const dropdownBinder: BinderDeprecated<Partial<BSDropdown.Options>> = {
  name: "bs5-dropdown",
  bind(el: HTMLElement) {
    this.customData = {
      toggler:
        (el.classList.contains("dropdown-toggle")
          ? el
          : el.querySelector(".dropdown-toggle")) || el,
    };
  },
  routine(el: HTMLElement, option = {}) {
    if (this.customData.dropdownService) {
      const dropdownService: Dropdown = this.customData.dropdownService;
      dropdownService.dispose();
      // To detect this element as an dropdown by the bootstrap logic
      this.customData.toggler.dataset.bsToggle = "";
    }
    const dropdownService = new Dropdown(this.customData.toggler, option);
    // To detect this element as an dropdown by the bootstrap logic
    this.customData.toggler.dataset.bsToggle = "dropdown";
    this.customData.dropdownService = dropdownService;
  },
};
