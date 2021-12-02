import { Binder } from "../binder";

/**
 * readonly
 */
export class ReadonlyBinder extends Binder<boolean, HTMLInputElement> {
  static key = "readonly";

  routine(el: HTMLInputElement, readOnly: boolean) {
    readOnly = !!readOnly;
    el.readOnly = readOnly;
    if (readOnly) {
      el.setAttribute("readonly", "");
    } else {
      el.removeAttribute("readonly");
    }
  }
}
