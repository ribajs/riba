import { Binder } from "../binder.js";

/**
 * animate-{class}
 * Add / remove animation class with start and done affix
 */
export class AnimateStarBinder extends Binder<boolean, HTMLUnknownElement> {
  static key = "animate-*";
  function = true;
  priority = 1000;

  bind(el: HTMLUnknownElement) {
    const animateClassName = (this as any).args[0];
    el.classList.add(animateClassName);
  }

  routine(el: HTMLUnknownElement, start: boolean) {
    const animateClassName = (this as any).args[0];
    if (start) {
      el.classList.add(animateClassName + "-start");
      el.classList.remove(animateClassName + "-done");
    } else {
      el.classList.remove(animateClassName + "-start");
      el.classList.add(animateClassName + "-done");
    }
  }
}
