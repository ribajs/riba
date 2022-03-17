/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * see https://github.com/twbs/bootstrap/blob/master/js/src/dom/selector-engine.js
 * --------------------------------------------------------------------------
 */
import { NODE_TEXT } from "../../constants/index.js";

import { makeArray } from "../utils.js";

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
