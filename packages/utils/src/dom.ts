export const MAX_UID = 1000;

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
  } else if (el.getAttribute("contenteditable")) {
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

export const getElementFromEvent = (event: Event | MouseEvent | TouchEvent) => {
  const el =
    ((event as Event).target as HTMLAnchorElement) ||
    ((event as any).currentTarget as HTMLAnchorElement) ||
    ((event as MouseEvent).relatedTarget as HTMLAnchorElement) ||
    ((event as any).fromElement as HTMLAnchorElement);
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
  return new Promise<HTMLScriptElement>((resolve, reject) => {
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
          resolve(script as HTMLScriptElement);
        }
      };
    }
    // Other browsers
    script.onload = function () {
      resolve(script as HTMLScriptElement);
    };
    script.onerror = function (...args) {
      const error = new Error("Error on load script " + script?.src);
      console.error(error);
      console.error(...args);
      reject(error);
    };
  }).then((script) => {
    script?.setAttribute("loaded", "true");
    return script;
  });
};

export const getUID = (prefix: string): string => {
  do {
    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));

  return prefix;
};
