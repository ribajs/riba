import { clone, parseJsonString } from "./type";

export const MAX_UID = 1000;

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

/**
 * Calls el.hasChildNodes but ignores empty strings, the default hasChildNodes would return ture on `<div> </div>`.
 * Very useful to check within a component if the component has set child elements to load or overwrite the component template
 * @param el
 */
export const hasChildNodesTrim = (el: HTMLUnknownElement) => {
  if (!el.hasChildNodes()) {
    return false;
  }
  const childNodes = el.childNodes;
  if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
    if (!childNodes[0].nodeValue || childNodes[0].nodeValue?.trim() === "") {
      return false;
    }
  }
  return true;
};

/**
 *
 */
export const getInputValue = (el: HTMLElement) => {
  const results: string[] = [];
  if ((el as HTMLSelectElement).type === "checkbox") {
    return (el as HTMLInputElement).checked;
  } else if ((el as HTMLSelectElement).type === "select-multiple") {
    const options: HTMLOptionsCollection = (el as HTMLSelectElement).options;

    for (const key in options) {
      if (options[key]) {
        const option = options[key];
        if (option.selected) {
          results.push(option.value);
        }
      }
    }

    return results;
  } else if (el.hasAttribute("contenteditable")) {
    return el.innerHTML; // TODO write test for contenteditable
  } else {
    return (el as HTMLInputElement).value;
  }
};

export const elementIsHidden = (el: HTMLElement) => {
  return (
    el.hasAttribute("hidden") ||
    el.style.display === "none" ||
    el.style.visibility === "hidden" ||
    window.getComputedStyle(el).display === "none" ||
    window.getComputedStyle(el).visibility === "hidden"
  );
};

export const elementIsVisable = (el: HTMLElement) => {
  return !elementIsHidden(el);
};

/**
 * Scrolls to an element by event and selector
 *
 * Attributes:
 *  * scroll-element="query-selector"
 * @see https://stackoverflow.com/a/31987330
 * @param element
 * @param to
 * @param duration
 */
export const scrollTo = (
  to: HTMLElement,
  offset: number,
  scrollElement: Element | (Window & typeof globalThis) | null,
  angle: "horizontal" | "vertical" = "vertical",
  behavior: "auto" | "smooth" | undefined = "smooth"
) => {
  if (!scrollElement) {
    scrollElement = window;
  }

  let top = 0;
  let left = 0;

  if (typeof (scrollElement as Window).pageYOffset === "number") {
    if (angle === "vertical") {
      top =
        to.getBoundingClientRect().top +
        (scrollElement as Window).pageYOffset -
        offset;
    } else {
      left =
        to.getBoundingClientRect().left +
        (scrollElement as Window).pageXOffset -
        offset;
    }
  } else {
    if (angle === "vertical") {
      top = to.offsetTop - offset;
    } else {
      left = to.offsetLeft - offset;
    }
  }

  // if is is window to scroll
  scrollElement.scroll({
    behavior,
    left,
    top,
  });
};

export const getElementFromEvent = <T = HTMLAnchorElement | HTMLUnknownElement>(
  event: Event | MouseEvent | TouchEvent
) => {
  const el =
    (((event as Event).target as unknown) as T | null) ||
    ((event as any).currentTarget as T | null) ||
    (((event as MouseEvent).relatedTarget as unknown) as T | null) ||
    // JQuery event
    ((event as any).delegateTarget as T) ||
    ((event as any).fromElement as T);
  return el;
};

export const getViewportDimensions = () => {
  const w = Math.max(
    document.documentElement ? document.documentElement.clientWidth : 0,
    window.innerWidth || 0
  );
  const h = Math.max(
    document.documentElement ? document.documentElement.clientHeight : 0,
    window.innerHeight || 0
  );
  return {
    h,
    w,
  };
};

/**
 * Determine if an element is in the viewport
 * @param elem The element
 * @param offsetTop (Default  Distance to the top of the screen, if this is 0, the element must be scrolled until the top of the screen.
 * @param offsetBottom Distance to the bottom of the screen, if this is 0, the scroll position must be over the element
 * @return Returns true if element is in the viewport
 */
export const isInViewport = (
  elem: Element,
  offsetTop?: number,
  offsetBottom = 0
) => {
  if (!elem) {
    return false;
  }

  const distance = elem.getBoundingClientRect();

  if (!offsetTop) {
    const vp = getViewportDimensions();
    offsetTop = vp.h - distance.height;
  }

  return (
    distance.top + distance.height >= offsetBottom &&
    distance.bottom - distance.height <= offsetTop
  );
};

/**
 * Select all of an contenteditable or input element
 * @param element The element you want to select
 */
export const selectAll = (element: HTMLInputElement) => {
  // need setTimeout for safari
  setTimeout(() => {
    if (typeof element.selectionStart !== "undefined") {
      element.selectionStart = 0;
      element.selectionEnd = 999;
    }

    if (typeof element.select === "function") {
      element.select();
    }

    if (typeof element.setSelectionRange === "function") {
      element.setSelectionRange(0, 999);
    }

    if (window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        selection.selectAllChildren(element);
      }
    }

    if ((document as any).body.createTextRange) {
      const range: any = (document.body as any).createTextRange(); // Creates TextRange object
      range.moveToElementText(element); // sets Range
      range.select(); // make selection.
    }

    if (document.execCommand) {
      document.execCommand("selectAll", false, undefined);
    }
  }, 0);
};

/**
 * Cross-browser Document Ready check
 * @see https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/
 * @param callback
 */
export const ready = (callback: () => void) => {
  if (!callback || typeof callback !== "function") {
    return new Error("The callback is required!");
  }

  const checkReady = () => {
    if (document.readyState !== "loading") {
      callback();
      if ((document as any).attachEvent) {
        (document as any).detachEvent("onreadystatechange", checkReady);
      }
      document.removeEventListener("DOMContentLoaded", checkReady);
    }
  };

  if ((document as any).attachEvent) {
    (document as any).attachEvent("onreadystatechange", checkReady);
  }
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", checkReady);
  }
  checkReady();
};

export const loadScript = async (
  src: string,
  id: string,
  async = true,
  defer = true
) => {
  const script = await new Promise<HTMLScriptElement>((resolve, reject) => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (script) {
      console.warn("script already loaded, do nothing.");
      if (script.hasAttribute("loaded")) {
        return resolve(script);
      }
    } else {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.id = id;
      script.src = src;
      if (async) {
        script.async = true;
      }
      if (defer) {
        script.defer = true;
      }
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    // IE
    if ((script as any).readyState) {
      (script as any).onreadystatechange = function () {
        if (
          (script as any).readyState === "loaded" ||
          (script as any).readyState === "complete"
        ) {
          (script as any).onreadystatechange = null;
          script?.setAttribute("loaded", "true");
          resolve(script as HTMLScriptElement);
        }
      };
    }

    // Other browsers
    script.addEventListener("load", () => {
      script?.setAttribute("loaded", "true");
      resolve(script as HTMLScriptElement);
    });
    script.addEventListener("error", (...args) => {
      const error = new Error("Error on load script " + script?.src);
      console.error(error);
      console.error(...args);
      reject(error);
    });
  });

  return script;
};

export const getUID = (prefix: string): string => {
  do {
    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));

  return prefix;
};

/**
 * Detects if dom element is custom element or native / default html element
 * @see https://stackoverflow.com/a/47737765/1465919
 * @param element The element you want to test
 */
export const isCustomElement = (
  element: HTMLUnknownElement,
  mustBeRegistred = false
) => {
  // A custom element's name is required to contain a -, whereas an HTML-defined element will not. So:
  const isCustomElement = element.tagName.includes("-");
  if (isCustomElement && mustBeRegistred && customElements) {
    return !!customElements.get(element.tagName.toLocaleLowerCase());
  }
  return isCustomElement;
};

/**
 * Creating a new DOM element from an HTML string
 * @param html representing a single element
 * @example
 * ```js
 *   const td = htmlToElement("<td>foo</td>");
 *   const div = htmlToElement("<div><span>nested</span> <span>stuff</span></div>");
 * ```
 */
export const htmlToElement = (html: string) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

/**
 * Creating a new DOM elements from an HTML string
 * @param html representing any number of sibling elements
 * @example
 * ```js
 *   var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');
 * ```
 */
export const htmlToElements = (html: string) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
};

/**
 * Converts a NodeList or HTMLCollection to an Array
 * @param nodeList
 * @returns
 */
export const toArray = (nodeList: NodeList | HTMLCollection): HTMLElement[] => {
  if (!nodeList) {
    return [];
  }

  return [].slice.call(nodeList);
};

/**
 * Check if any html element is visible in the dom
 * @param element
 * @returns
 */
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
