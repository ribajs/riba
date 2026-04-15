import { TOGGLE_CLASS } from "../constants/index.js";
import {
  AbstractToggleBinder,
  ToggleEventNames,
} from "./tw-abstract-toggle.binder.js";

/**
 * Adds / removes the class on click on the tw-toggle-button with the same id.
 *
 * Events:
 * - `class-removed`
 * - `class-added`
 */
export class ToggleClassBinder extends AbstractToggleBinder<HTMLButtonElement> {
  static key = "tw-toggle-class-*";

  protected readonly eventNames: ToggleEventNames = TOGGLE_CLASS.elEventNames;

  protected applyAdd(el: HTMLButtonElement, className: string) {
    el.classList.add(className);
  }

  protected applyRemove(el: HTMLButtonElement, className: string) {
    el.classList.remove(className);
  }

  protected detectState(el: HTMLButtonElement, className: string): boolean {
    return el.classList.contains(className);
  }
}
