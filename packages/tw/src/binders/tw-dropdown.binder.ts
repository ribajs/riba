import { Binder } from "@ribajs/core";
import { DropdownService } from "../services/dropdown.service.js";
import type { Placement } from "@floating-ui/dom";

/**
 * Initializes a dropdown on an element using Floating UI for positioning.
 */
export class DropdownBinder extends Binder<
  Partial<{ placement: Placement }>,
  HTMLElement
> {
  static key = "tw-dropdown";

  private toggler?: HTMLElement;
  private menu?: HTMLElement;
  private dropdownService?: DropdownService;

  bind(el: HTMLElement) {
    this.toggler = ((el.classList.contains("dropdown-toggle")
      ? el
      : el.querySelector(".dropdown-toggle")) || el) as HTMLElement;

    this.menu = (el.querySelector("[role='menu']") ||
      el.querySelector(".dropdown-menu")) as HTMLElement | undefined;
  }

  routine(el: HTMLElement, options: Partial<{ placement: Placement }> = {}) {
    if (!this.toggler) {
      throw new Error("No dropdown toggle element found!");
    }
    if (!this.menu) {
      throw new Error(
        'No dropdown menu element found! Expected [role="menu"] or .dropdown-menu',
      );
    }

    if (this.dropdownService) {
      this.dropdownService.dispose();
    }

    this.dropdownService = new DropdownService(this.toggler, this.menu, {
      placement: options.placement,
    });
    this.dropdownService.hide();
  }
}
