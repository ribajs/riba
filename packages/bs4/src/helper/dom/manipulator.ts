/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/dom/manipulator.js
 * --------------------------------------------------------------------------
 */

function normalizeData(val: any) {
  if (val === "true") {
    return true;
  }

  if (val === "false") {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === "" || val === "null") {
    return null;
  }

  return val;
}

function normalizeDataKey(key: string) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}

export const setDataAttribute = (
  element: Element | HTMLUnknownElement | HTMLElement,
  key: string,
  value: string
) => {
  element.setAttribute(`data-${normalizeDataKey(key)}`, value);
};

export const removeDataAttribute = (
  element: Element | HTMLUnknownElement | HTMLElement,
  key: string
) => {
  element.removeAttribute(`data-${normalizeDataKey(key)}`);
};

export const getDataAttributes = (
  element: HTMLUnknownElement | HTMLElement
) => {
  if (!element) {
    return {};
  }

  const attributes = {
    ...element.dataset,
  };

  Object.keys(attributes).forEach((key) => {
    attributes[key] = normalizeData(attributes[key]);
  });

  return attributes;
};

export const getDataAttribute = (
  element: Element | HTMLUnknownElement | HTMLElement,
  key: string
) => {
  return normalizeData(element.getAttribute(`data-${normalizeDataKey(key)}`));
};

export const offset = (element: Element | HTMLUnknownElement | HTMLElement) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
};

export const position = (element: HTMLUnknownElement | HTMLElement) => {
  return {
    top: element.offsetTop,
    left: element.offsetLeft,
  };
};

export const toggleClass = (
  element: Element | HTMLUnknownElement | HTMLElement,
  className: string
) => {
  if (!element) {
    return;
  }

  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};
