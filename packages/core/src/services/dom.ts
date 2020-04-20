import { Utils } from "./utils";

/**
 * TODO move Dom utils here
 */

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
    const jsonString = Utils.parseJsonString(value);
    value = jsonString ? jsonString : value;
  }
  return value;
};

export const getDataset = (element: HTMLElement) => {
  const dataset = Utils.clone(false, element.dataset);
  for (const attr in dataset) {
    if (dataset[attr]) {
      dataset[attr] = parseAttribute(dataset[attr]);
    }
  }
  return dataset;
};
