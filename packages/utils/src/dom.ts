import { clone, justDigits, jsonStringify, parseType } from "./type.js";

export const MAX_UID = 1000;

/**
 * Sets an attribute. The peculiarity of this custom method is that when an object is passed, it is converted to a json string.
 * This is useful if, for example, an object is to be passed to a custom element via an attribute.
 * @note This method is used by the AttributeBinder.
 * @param el
 * @param attributeName
 * @param newValue
 * @returns
 */
export const setAttribute = (
  el: HTMLElement,
  attributeName: string,
  newValue: any,
) => {
  if (!attributeName) {
    throw new Error("Can't set attribute of " + attributeName);
  }

  const oldValue = el.getAttribute(attributeName);
  let newValueFormatted: any;
  let changed = false;
  switch (typeof newValue) {
    case "string":
    case "number":
    case "boolean":
      newValueFormatted = String(newValue);
      break;
    case "undefined":
      newValueFormatted = undefined;
    case "object":
      if (newValue === null) {
        newValueFormatted = null;
      } else {
        newValueFormatted = jsonStringify(newValue, 0);
      }
      break;
    default:
      newValueFormatted = String(newValue);
      break;
  }

  if (newValueFormatted === null || newValueFormatted === undefined) {
    el.removeAttribute(attributeName);
    changed = true;
  } else {
    if (oldValue !== newValueFormatted) {
      el.setAttribute(attributeName, newValueFormatted);
      changed = true;
    }
  }
  return {
    name: attributeName,
    newValue: newValueFormatted,
    oldValue,
    changed,
  };
};

export const getDataset = (element: HTMLElement) => {
  const dataset = clone(false, element.dataset);
  for (const attr in dataset) {
    if (dataset[attr]) {
      dataset[attr] = parseType(dataset[attr], true).value;
    }
  }
  return dataset;
};

/**
 * Calls el.hasChildNodes but ignores empty strings, the default hasChildNodes would return true on `<div> </div>`.
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
export const getInputValue = (
  el:
    | HTMLUnknownElement
    | HTMLElement
    | HTMLSelectElement
    | HTMLInputElement
    | HTMLOptionsCollection,
) => {
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
  } else if (
    (el as HTMLElement).hasAttribute &&
    (el as HTMLElement).hasAttribute("contenteditable")
  ) {
    return (el as HTMLElement).innerHTML; // TODO write test for contenteditable
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

export const elementIsVisible = (el: HTMLElement) => {
  return !elementIsHidden(el);
};

/**
 * Observe scroll event
 * @param scrollElement The element or window you want to observe
 * @returns Returns a promise which resolves when an element stops scrolling
 */
export const scrolling = async (
  scrollElement: HTMLElement | (Window & typeof globalThis),
) => {
  return new Promise<void>((resolve) => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
    const checkScroll = () => {
      if (scrollTimeout !== undefined) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        resolve();
      }, 100);
    };
    scrollElement.removeEventListener("scroll", checkScroll);
    scrollElement.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
  });
};

/**
 * Scrolls to an element
 *
 * @see https://stackoverflow.com/a/31987330
 * @see https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
 * @param element
 * @param to
 * @param duration
 */
export const scrollTo = async (
  to: HTMLElement,
  offset = 0,
  scrollElement: HTMLElement | (Window & typeof globalThis) | null = window,
  angle: "horizontal" | "vertical" = "vertical",
  behavior: "auto" | "smooth" | undefined = "smooth",
) => {
  if (!scrollElement) {
    scrollElement = window;
  }

  const scrollPromise = scrolling(scrollElement);

  let top = 0;
  let left = 0;

  // If element is window
  if ((scrollElement as Window).document) {
    if (angle === "vertical") {
      const scrollY =
        (scrollElement as Window).scrollY ||
        (scrollElement as Window).pageYOffset;
      top = Math.round(to.getBoundingClientRect().top + scrollY - offset);
    } else {
      const scrollX =
        (scrollElement as Window).scrollX ||
        (scrollElement as Window).pageXOffset;
      left = Math.round(to.getBoundingClientRect().left + scrollX - offset);
    }
  } else {
    if (angle === "vertical") {
      const marginTop = justDigits(
        window.getComputedStyle(scrollElement as HTMLElement).marginTop,
      );
      top = Math.round(to.offsetTop - offset - marginTop);
    } else {
      const marginLeft = justDigits(
        window.getComputedStyle(scrollElement as HTMLElement).marginLeft,
      );
      left = Math.round(to.offsetLeft - offset - marginLeft);
    }
  }

  scrollElement.scroll({
    behavior,
    left,
    top,
  });

  return scrollPromise;
};

export const getScrollHeight = (
  scrollElement: HTMLElement | (Window & typeof globalThis),
): number => {
  // if element is window
  if ((scrollElement as Window).document) {
    const win = scrollElement as Window;
    const doc = win.document;
    return (
      (win as any).scrollMaxY ||
      Math.max(
        doc.body.scrollHeight,
        doc.body.offsetHeight,
        doc.documentElement.clientHeight,
        doc.documentElement.scrollHeight,
        doc.documentElement.offsetHeight,
        0,
      )
    );
  }
  return (scrollElement as HTMLElement).scrollHeight;
};

export const getScrollWidth = (
  scrollElement: HTMLElement | (Window & typeof globalThis),
): number => {
  // if element is window
  if ((scrollElement as Window).document) {
    const win = scrollElement as Window;
    const doc = win.document;
    return (
      (win as any).scrollMaxX ||
      Math.max(
        doc.body.scrollWidth,
        doc.body.offsetWidth,
        doc.documentElement.clientWidth,
        doc.documentElement.scrollWidth,
        doc.documentElement.offsetWidth,
      )
    );
  }
  return (scrollElement as HTMLElement).scrollWidth;
};

export const scrollToPosition = async (
  scrollElement: HTMLElement | (Window & typeof globalThis) | null,
  position: number | "end" | "start" | "center",
  angle: "horizontal" | "vertical" | "both" = "vertical",
  behavior: "auto" | "smooth" | undefined = "smooth",
) => {
  let top: number | undefined;
  let left: number | undefined;

  if (!scrollElement) {
    return;
  }

  const scrollPromise = scrolling(scrollElement);

  if (angle === "vertical" || angle === "both") {
    switch (position) {
      case "start":
        top = 0;
        break;
      case "end":
        top = getScrollHeight(scrollElement);
        break;
      case "center":
        top = getScrollHeight(scrollElement);
        if (top) {
          top /= 2;
          // if element is window
          if ((scrollElement as Window).document) {
            top -= ((scrollElement as Window).visualViewport?.height || 0) / 2;
          } else {
            top -= (scrollElement as HTMLElement).clientHeight / 2;
          }
        }
        break;
      default:
        top = position;
        break;
    }
  }

  if (angle === "horizontal" || angle === "both") {
    switch (position) {
      case "start":
        left = 0;
        break;
      case "end":
        left = getScrollWidth(scrollElement);
        break;
      case "center":
        left = getScrollWidth(scrollElement);
        if (left) {
          left /= 2;
          // if element is window
          if ((scrollElement as Window).document) {
            left -= ((scrollElement as Window).visualViewport?.width || 0) / 2;
          } else {
            left -= (scrollElement as HTMLElement).clientWidth / 2;
          }
        }
        break;
      default:
        left = position;
        break;
    }
  }

  scrollElement.scroll({
    behavior,
    top,
    left,
  });

  return scrollPromise;
};

export const getElementFromEvent = <T = HTMLAnchorElement | HTMLUnknownElement>(
  event: Event | MouseEvent | TouchEvent,
) => {
  const el =
    ((event as Event).target as unknown as T | null) ||
    ((event as any).currentTarget as T | null) ||
    ((event as MouseEvent).relatedTarget as unknown as T | null) ||
    // JQuery event
    ((event as any).delegateTarget as T) ||
    ((event as any).fromElement as T);
  return el;
};

export const getViewportDimensions = () => {
  const w = Math.max(
    document.documentElement ? document.documentElement.clientWidth : 0,
    window.innerWidth || 0,
  );
  const h = Math.max(
    document.documentElement ? document.documentElement.clientHeight : 0,
    window.innerHeight || 0,
  );
  return {
    h,
    w,
  };
};

/**
 * Determine if an element is in the viewport
 * @param elem The element
 * @param offset.top Distance to the top of the screen, if this is 0, the element must be scrolled until the top of the screen
 * @param offset.bottom Distance to the bottom of the screen, if this is 0, the scroll position must be over the element
 * @return Returns true if element is in the viewport
 */
export const isInViewport = (
  elem: Element,
  offset: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } = {},
) => {
  if (!elem) {
    return false;
  }

  const distance = elem.getBoundingClientRect();

  const vp = getViewportDimensions();

  offset.top ||= 0;
  offset.left ||= 0;
  offset.bottom ||= 0;
  offset.right ||= 0;

  offset.top += vp.h - distance.height;
  offset.left += vp.w - distance.width;

  const vertical =
    distance.top + distance.height >= offset.bottom &&
    distance.bottom - distance.height <= offset.top;

  const horizontal =
    distance.left + distance.width >= offset.right &&
    distance.right - distance.width <= offset.left;

  return vertical && horizontal;
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

  /**
   * In some cases it can be useful to dispatch the "DOMContentLoaded" by hand,
   * but Riba should only react to the real event.
   *
   * For this case you can create the event in this way:
   *
   * @example
   * ```ts
   *   const event: Event & { fake?: boolean } = new Event('DOMContentLoaded', {
   *     bubbles: true,
   *     cancelable: true,
   *   })
   *   event.fake = true
   *   window.document.dispatchEvent(event)
   * ```
   */
  const checkReady = (event?: Event & { fake?: boolean }) => {
    // Do nothing if this is a fake event
    if (event?.fake) return;

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
  defer = true,
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
      const head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(script);
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
 * Detects if dom element is custom element and a registered riba component
 * @see https://stackoverflow.com/a/47737765/1465919
 * @param element The element or tag name you want to test
 * @param isRegistered If true the element must also be a registered as a custom element,
 * @param isUpgraded
 */
export const isCustomElement = (
  element: HTMLUnknownElement | string,
  isRegistered = false,
  isUpgraded = false,
) => {
  // A custom element's name is required to contain a -, whereas an HTML-defined element will not. So:
  const localName = typeof element === "string" ? element : element.localName;
  const isCustomElement = localName.includes("-");
  if (isCustomElement && isRegistered && customElements) {
    const customConstructor = customElements.get(localName);
    if (!customConstructor) {
      return false;
    }
    // If the element is not yet upgraded the constructor is still equal to HTMLElement
    if (isUpgraded) {
      return customConstructor === element.constructor;
    }
    // If we don't need to check for upgraded status
    return true;
  }
  return isCustomElement;
};

/**
 * Waits for CustomElement to be upgraded, returns the element.
 * @param element The custom Element waiting for an upgrade.
 * @returns the element after the upgrade
 */
export const waitForCustomElement = async (element: HTMLUnknownElement) => {
  await customElements.whenDefined(element.localName);
  return element;
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

/**
 * Similar to JQuery's `$(el).index();`
 * @param el
 */
export const getElementIndex = (el: Element | null) => {
  if (!el) {
    return -1;
  }
  let i = 0;
  do {
    i++;
    el = (el as HTMLElement).previousElementSibling;
  } while (el);
  return i;
};
