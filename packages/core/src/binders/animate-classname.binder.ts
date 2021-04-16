import { Binder } from "../types";

/**
 * animate-{class}
 * Add / remove animation class with start and done affix
 */
export const animateStarBinder: Binder<boolean> = {
  name: "animate-*",
  function: true,
  priority: 1000,

  bind(el) {
    const animateClassName = (this as any).args[0];
    el.classList.add(animateClassName);
  },

  unbind() {
    //
  },

  routine(el: HTMLElement, start: boolean) {
    const animateClassName = (this as any).args[0];
    if (start) {
      el.classList.add(animateClassName + "-start");
      el.classList.remove(animateClassName + "-done");
    } else {
      el.classList.remove(animateClassName + "-start");
      el.classList.add(animateClassName + "-done");
    }
  },
};
