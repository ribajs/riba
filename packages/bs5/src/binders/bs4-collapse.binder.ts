import { Binder } from "@ribajs/core";
// import { CollapseService } from '../services/collapse.service';
import { CollapseService } from "../services/collapse.service";

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

    const collapseServices: CollapseService[] = [];

    targets.forEach((target) => {
      collapseServices.push(new CollapseService(target, { toggle: false }));
    });

    el.addEventListener("click", (event) => {
      event.preventDefault();
      collapseServices.forEach((collapseService) => {
        collapseService.toggle();
      });
    });
  },
};
