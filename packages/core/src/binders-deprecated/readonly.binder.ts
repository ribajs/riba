import { BinderDeprecated } from "../types";

/**
 * readonly
 */
export const readonlyBinder: BinderDeprecated<boolean> = {
  name: "readonly",

  bind() {
    this.customData = {};
  },

  routine(el: HTMLElement, readOnly: boolean) {
    readOnly = !!readOnly;
    (el as HTMLInputElement).readOnly = readOnly;
    if (readOnly) {
      (el as HTMLInputElement).setAttribute("readonly", "");
    } else {
      (el as HTMLInputElement).removeAttribute("readonly");
    }
  },
};
