// @see https://github.com/twbs/bootstrap/blob/master/js/src/util/index.js

import { MILLISECONDS_MULTIPLIER, TRANSITION_END } from "../constants/index.js";
import { toType } from "@ribajs/utils/src/type.js";

export const getSelector = (element: HTMLElement) => {
  let selector = element.getAttribute("data-target");

  if (!selector || selector === "#") {
    const hrefAttr = element.getAttribute("href");

    selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
  }

  return selector;
};

export const getSelectorFromElement = (element: HTMLElement) => {
  const selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

export const getElementFromSelector = (element: HTMLElement) => {
  const selector = getSelector(element);

  return (
    selector ? document.querySelector(selector) : null
  ) as HTMLElement | null;
};

export const getTransitionDurationFromElement = (element: HTMLElement) => {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  let { transitionDuration, transitionDelay } =
    window.getComputedStyle(element);

  const floatTransitionDuration = parseFloat(transitionDuration);
  const floatTransitionDelay = parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];

  return (
    (parseFloat(transitionDuration) + parseFloat(transitionDelay)) *
    MILLISECONDS_MULTIPLIER
  );
};

export const triggerTransitionEnd = (element: HTMLElement) => {
  const evt = document.createEvent("HTMLEvents");

  evt.initEvent(TRANSITION_END, true, true);
  element.dispatchEvent(evt);
};

export const isElement = (obj: Element | Element[]) => {
  return ((obj as Element[])[0] || (obj as Element)).nodeType;
};

export const emulateTransitionEnd = (
  element: HTMLElement,
  duration: number
) => {
  let called = false;
  const durationPadding = 5;
  const emulatedDuration = duration + durationPadding;
  function listener() {
    called = true;
    element.removeEventListener(TRANSITION_END, listener);
  }

  element.addEventListener(TRANSITION_END, listener);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(element);
    }
  }, emulatedDuration);
};

/**
 *
 * @param componentName
 * @param config
 * @param configTypes
 */
export const typeCheckConfig = (
  componentName: string,
  config: any,
  configTypes: any
) => {
  for (const property in configTypes) {
    if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? "element" : toType(value);

      if (!valueType || !new RegExp(expectedTypes).test(valueType)) {
        throw new Error(
          `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`
        );
      }
    }
  }
};

export const makeArray = (
  nodeList: NodeList | HTMLCollection
): HTMLElement[] => {
  if (!nodeList) {
    return [];
  }

  return [].slice.call(nodeList);
};

export const isVisible = (element: HTMLElement) => {
  if (!element) {
    return false;
  }

  if (
    element.style &&
    element.parentNode &&
    (element.parentNode as HTMLElement).style
  ) {
    const elementStyle = getComputedStyle(element);
    const parentNodeStyle = getComputedStyle(element.parentNode as HTMLElement);

    return (
      elementStyle.display !== "none" &&
      parentNodeStyle.display !== "none" &&
      elementStyle.visibility !== "hidden"
    );
  }

  return false;
};

export const findShadowRoot = (
  element: HTMLElement | (Node & ParentNode)
): HTMLElement | (Node & ParentNode) | null => {
  if (!document.documentElement.attachShadow) {
    return null;
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === "function") {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

export const noop = () => {
  return function () {
    /** nothing */
  };
};

export const reflow = (element: HTMLElement) => {
  return element.offsetHeight;
};

export const getjQuery = () => {
  const { jQuery } = window as any;

  if (jQuery && !document.body.hasAttribute("data-no-jquery")) {
    return jQuery;
  }

  return null;
};
