/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * see https://github.com/twbs/bootstrap/blob/master/js/src/dom/selector-engine.js
 * --------------------------------------------------------------------------
 */

import { makeArray } from "../utils";

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

export const NODE_TEXT = 3;

export const matches = (
  element: HTMLElement | (Node & ParentNode),
  selector: string
) => {
  return Element.prototype.matches.call(element, selector);
};

export const find = (selector: string, element = document.documentElement) => {
  return Element.prototype.querySelectorAll.call(
    element,
    selector
  ) as NodeListOf<HTMLElement>;
};

export const findOne = (
  selector: string,
  element = document.documentElement
) => {
  return Element.prototype.querySelector.call(
    element,
    selector
  ) as HTMLElement | null;
};

export const children = (element: HTMLElement, selector: string) => {
  const children = makeArray(element.children);
  return children.filter((child) => matches(child, selector));
};

export const parents = (element: HTMLElement, selector: string) => {
  const parents = [];

  let ancestor = element.parentNode;

  while (
    ancestor &&
    ancestor.nodeType === Node.ELEMENT_NODE &&
    ancestor.nodeType !== NODE_TEXT
  ) {
    if (matches(ancestor, selector)) {
      parents.push(ancestor);
    }

    ancestor = ancestor.parentNode;
  }

  return parents;
};

export const closest = (element: HTMLElement, selector: string) => {
  return Element.prototype.closest.call(element, selector);
};

export const prev = (element: HTMLElement, selector: string) => {
  const siblings = [];

  let previous = element.previousSibling;

  while (
    previous &&
    previous.nodeType === Node.ELEMENT_NODE &&
    previous.nodeType !== NODE_TEXT
  ) {
    if (matches(previous as HTMLElement, selector)) {
      siblings.push(previous);
    }

    previous = previous.previousSibling;
  }

  return siblings;
};

/**
 * @deprecated Import the methods directly instead of this class
 */
export class SelectorEngine {
  public static matches = matches;

  public static find = find;

  public static findOne = findOne;

  public static children = children;

  public static parents = parents;

  public static closest = closest;

  public static prev = prev;
}

export default SelectorEngine;
