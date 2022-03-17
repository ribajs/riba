import { Binder } from "@ribajs/core";
import { CollapseService } from "../services/collapse.service.js";

/**
 * @deprecated
 */
export class CollapseBinder extends Binder<string, HTMLElement> {
  static key = "bs4-collapse";
  bind() {
    console.warn(
      "bs4-collapse is deprecated, use bs4-toggle-collapse-on-click instead."
    );
  }

  routine(el: HTMLElement, targetSelector: string) {
    const targets = document.querySelectorAll<HTMLElement>(targetSelector);

    const collapseServices: CollapseService[] = [];

    targets.forEach((target) => {
      collapseServices.push(
        new CollapseService(target, [el], { toggle: false })
      );
    });

    el.addEventListener("click", (event) => {
      event.preventDefault();
      collapseServices.forEach((collapseService) => {
        collapseService.toggle();
      });
    });
  }
}
