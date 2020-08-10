import { clone, parseJsonString } from "@ribajs/utils/src/type";

/**
 * TODO move Dom utils here
 */

// @see https://stackoverflow.com/a/384380/7048200
export function isHTMLElement(obj: any) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
}

export const parseAttribute = (attr?: string | null) => {
  let value: any = attr;
  if (attr === "true") {
    value = true;
  } else if (attr === "false") {
    value = false;
  } else if (attr === "null") {
    value = null;
  } else if (attr === "undefined") {
    value = undefined;
  } else if (attr === "") {
    value = undefined;
  } else if (!isNaN(Number(attr))) {
    value = Number(attr);
    // If number is too large store the value as string
    if (value >= Number.MAX_SAFE_INTEGER) {
      value = attr;
    }
  } else {
    const jsonString = parseJsonString(value);
    value = jsonString ? jsonString : value;
  }
  return value;
};

export const getDataset = (element: HTMLElement) => {
  const dataset = clone(false, element.dataset);
  for (const attr in dataset) {
    if (dataset[attr]) {
      dataset[attr] = parseAttribute(dataset[attr]);
    }
  }
  return dataset;
};
