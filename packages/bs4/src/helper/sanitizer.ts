/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/util/sanitizer.js
 * --------------------------------------------------------------------------
 */

import { URI_ATTRS, DATA_URL_PATTERN, SAFE_URL_PATTERN } from "../constants/index.js";

// TODO check type
export type AttributeList = (string | RegExp)[];
export type AllowList = { [key: string]: any };

export const allowedAttribute = (
  attr: Node,
  allowedAttributeList: AttributeList
) => {
  const attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.indexOf(attrName) !== -1) {
    if (URI_ATTRS.indexOf(attrName) !== -1) {
      return Boolean(
        attr.nodeValue?.match(SAFE_URL_PATTERN) ||
          attr.nodeValue?.match(DATA_URL_PATTERN)
      );
    }

    return true;
  }

  const regExp = allowedAttributeList.filter(
    (attrRegex) => attrRegex instanceof RegExp
  );

  // Check if a regular expression validates the attribute.
  for (let i = 0, len = regExp.length; i < len; i++) {
    if (attrName.match(regExp[i])) {
      return true;
    }
  }

  return false;
};

export function sanitizeHtml(
  unsafeHtml: string,
  allowList: AllowList,
  sanitizeFn?: (unsafeHtml: string) => string
) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === "function") {
    return sanitizeFn(unsafeHtml);
  }

  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const allowlistKeys = Object.keys(allowList);
  // const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  const elements = Array.from(createdDocument.body.querySelectorAll("*"));

  for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i];
    const elName = el.nodeName.toLowerCase();

    if (allowlistKeys.indexOf(elName) === -1) {
      el?.parentNode?.removeChild(el);

      continue;
    }

    // const attributeList = [].concat(...el.attributes);
    const attributeList = Array.from(el.attributes);
    // const allowedAttributes = [].concat(
    //   allowList["*"] || [],
    //   allowList[elName] || []
    // );
    const allowedAttributes: AttributeList =
      allowList["*"] || allowList[elName] || [];

    attributeList.forEach((attr) => {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  }

  return createdDocument.body.innerHTML;
}
