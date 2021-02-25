import { Binder } from "@ribajs/core";
import { Collapse } from "../services/collapse";

/**
 * @deprecated
 */
export const collapseBinder: Binder<string> = {
  name: "bs5-collapse",
  bind() {
    console.warn(
      "bs5-collapse is deprecated, use bs5-toggle-collapse-on-click instead."
    );
  },
  routine(el: HTMLElement, targetSelector: string) {
    const targets = document.querySelectorAll<HTMLElement>(targetSelector);

    const collapseServices: Collapse[] = [];

    targets.forEach((target) => {
      collapseServices.push(new Collapse(target, { toggle: false }));
    });

    el.addEventListener("click", (event) => {
      event.preventDefault();
      collapseServices.forEach((collapseService) => {
        collapseService.toggle();
      });
    });
  },
};
