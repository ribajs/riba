import { Binder } from "../binder.js";

/**
 * maxlength
 */
export class MaxlengthBinder extends Binder<number, HTMLElement> {
  static key = "maxlength";

  routine(el: HTMLElement, maxLength?: number) {
    if (typeof maxLength === "number") {
      (el as HTMLInputElement).setAttribute("maxlength", maxLength.toString());
      (el as HTMLInputElement).maxLength = maxLength;
    } else {
      (el as HTMLInputElement).removeAttribute("maxlength");
    }
  }
}
