import { BinderDeprecated } from "../types";

/**
 * Enables the element when value is true.
 */
export const enabledBinder: BinderDeprecated<boolean> = {
  name: "enabled",
  routine(el: HTMLUnknownElement, value: boolean) {
    (el as HTMLButtonElement).disabled = !value;
  },
};
