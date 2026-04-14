import { TOGGLE_ATTRIBUTE } from "../constants/index.js";
import {
  AbstractToggleBinder,
  ToggleEventNames,
} from "./tw-abstract-toggle.binder.js";

/**
 * Adds / removes the attribute on click on the tw-toggle-button with the same id.
 * E.g. with this binder you can toggle a hidden attribute to show / hide the element.
 *
 * Events:
 * - `attribute-removed`
 * - `attribute-added`
 */
export class ToggleAttributeBinder extends AbstractToggleBinder<HTMLElement> {
  static key = "tw-toggle-attribute-*";

  protected readonly eventNames: ToggleEventNames =
    TOGGLE_ATTRIBUTE.elEventNames;

  protected applyAdd(el: HTMLElement, attributeName: string) {
    el.setAttribute(attributeName, attributeName);
  }

  protected applyRemove(el: HTMLElement, attributeName: string) {
    el.removeAttribute(attributeName);
  }

  protected detectState(el: HTMLElement, attributeName: string): boolean {
    return el.hasAttribute(attributeName);
  }
}
