// TODO
export interface Deferred {
  resolve: any;
  reject: any;
}

/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */
export class Utils {

  public static couldBeJson(str?: string | null) {
    if (!str) {
      return false;
    }
    return str.startsWith('{') || str.startsWith('[');
  }

  /**
   * Test if string is a json string
   * @param str
   */
  public static isJson(str?: string | null) {
    if (!str) {
      return false;
    }
    try {
      const val = JSON.parse(str);
      return (Array.isArray(val) || typeof(val) === 'object') ? true : false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if value is undefined
   */
  public static isUndefined(value?: any) {
    return typeof(value) === 'undefined';
  }

  /**
   * Check if value is undefined
   */
  public static isDefined(value?: any) {
    return !Utils.isUndefined(value);
  }

  /**
   * Check if type is Object
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isObject(obj: object) {
    return Utils.isDefined(obj) && typeof obj === 'object' && obj !== null;
  }

  /**
   * Parse value to string or return undefined if value is null
   * @param value
   */
  public static getString(value: string) {
    return value != null ? value.toString() : undefined;
  }

  /**
   * Parse value to number or return 0 if value is null or undefined
   * @param value
   */
  public static getNumber(value: string) {
    return value ? parseFloat(value) : undefined;
  }

  /**
   * Parses a json string with the special feature that json strings
   * can also havesingle quotations for defining the properties and values
   */
  public static parseJsonString(value: string) {
    let object = null;
    if (Utils.couldBeJson(value)) {
      if (Utils.isJson(value)) {
        object = JSON.parse(value) || null;
      } else {
        try {
          // Transform an invalid json string with single quotation to a valid json string with double quotation
          object = JSON.parse(value.replace(/'/g, '"')) || null;
        } catch (error) {
          console.warn(error);
        }
      }
    }

    return object;
  }

  public static times(n: number, cb: () => void) {
    for (let i = 0; i < n; i++) {
      cb();
    }
  }

  /**
   *
   */
  public static getInputValue(el: HTMLElement) {
    const results: string[] = [];
    if ((el as HTMLSelectElement).type === 'checkbox') {
      return (el as HTMLInputElement).checked;
    } else if ((el as HTMLSelectElement).type === 'select-multiple') {
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
    } else if ( el.getAttribute('contenteditable')) {
      return el.innerHTML; // TODO write test for contenteditable
    } else {
      return (el as HTMLInputElement).value;
    }
  }

  /**
   * Returns a camel-cased version of the string. Used when translating an
   * element's attribute name into a property name for the component's scope.
   * @param string
   */
  public static camelCase = (str: string) => {
    return str.replace(/-([a-z0-9])/g, (grouped) => {
      return grouped[1].toUpperCase();
    });
  }

  /**
   * Check if value is a function
   */
  public static isFunction(value: any) {
    return typeof(value) === 'function';
  }

  /**
   * Check if variable is an Array
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isArray(value: any) {
    return Object.prototype.toString.call( value ) === '[object Array]';
  }

  /**
   * Check whether variable is number or a string with numbers in JavaScript
   * @see https://stackoverflow.com/a/1421988/1465919
   */
  public static isNumber(value?: any): boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  /**
   * Check if type is Boolean
   * @see https://stackoverflow.com/a/28814615/1465919
   */
  public static isBoolean(value?: any) {
    return typeof(value) === typeof(true);
  }

  /**
   * Check if value is a string
   */
  public static isString(value?: any) {
    return this.isDefined(value) && typeof(value) === 'string';
  }

  /**
   * Check if string contains a number
   */
  public static stringHasNumber(value: string) {
    return this.isString(value) && /\d/.test(value);
  }

  /**
   * Check if string contains only numbers
   */
  public static stringHasOnlyNumbers(value?: any) {
    return /^\d+$/.test(value);
  }

  /**
   * Check if string contains only numbers, +, - and ()
   */
  public static stringIsPhoneNumber(value: string) {
    return /^[0-9 ()+-]+$/.test(value);
  }

  /**
   * Just get the digits of a string, useful to remove px pixel from css value
   *
   * @see http://stackoverflow.com/a/1100653/1465919
   */
  public static justDigits(str: string) {
    const num = str.replace(/[^-\d.]/g, '');
    if (!Utils.isNumber(num)) {
      return 0;
    } else {
      return Number(num);
    }
  }

  /**
   * Merge the contents of two or more objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} target An object that will receive the new properties
   * @param {any[]} objects The objects containing additional properties to merge in.
   * @see http://www.damirscorner.com/blog/posts/20180216-VariableNumberOfArgumentsInTypescript.html
   */
  public static extend(deep: boolean, extended: any = {}, ...objects: any[]) {
    // Merge the object into the extended object
    const merge = (obj: any) => {
      for (const prop in obj) {
        if (obj[prop]) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            // If we're doing a deep merge and the property is an object
            extended[prop] = this.extend(true, extended[prop], obj[prop]);
          } else {
            // Otherwise, do a regular merge
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (let i = 0; i < objects.length; i++) {
      merge(objects[i]);
    }

    return extended;
  }

  /**
   * Concat the contents of two objects together into the first object and return the concatenated object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} object1 An first object containing properties to concat.
   * @param {object} object2 The second object containing properties to concat.
   */
  public static concat(deep: boolean, object1?: object, object2?: object): any {
    object1 = this.extend(deep, object1 || {}, object1 || {}, object2 || {});
    return object1;
  }

  /**
   * Clone an object or array
   * @param deep If true, the merge becomes recursive (aka. deep copy).
   * @param val The value(s) to clone
   */
  public static clone(deep: boolean, val: any) {
    if (Utils.isArray(val)) {
      return val.slice();
    } else {
      return Utils.extend(deep, {}, val);
    }
  }

  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @memberOf Barba.Utils
   * @return {Deferred}
   */
  public static deferred(): any {
    const obj: any = {};
    const prom = new Promise((resolve: any, reject: any) => {
      obj.resolve = resolve;
      obj.reject = reject;
    });
    obj.promise = prom;
    return obj;
  }

  /**
   * get hostname an path of address bar
   * @see http://stackoverflow.com/a/736970/1465919
   *
   * @example
   * var l = getLocation("http://example.com/path");
   * console.debug(l.hostname)
   * >> "example.com"
   * console.debug(l.pathname)
   * >> "/path"
   */
  public static getLocation(url?: string): Location {
    if (!url) {
      return window.location;
    }
    const l = document.createElement('a');
    l.href = url;
    return l as any as Location;
  }

  /**
   * Return the current url
   *
   * @memberOf Barba.Utils
   * @return {string} currentUrl
   */
  public static getUrl(url?: string): string {
    const location = Utils.getLocation(url);
    return location.protocol + '//' +
      location.host +
      location.pathname +
      location.search;
  }

  /**
   * Check if we are on the route
   */
  public static onRoute = (checkUrl?: string) => {
    if (checkUrl) {
      const pathname = Utils.getLocation().pathname;
      const checkPathname = Utils.getLocation(checkUrl).pathname;
      return pathname === checkPathname;
    }
    return false;
  }

  /**
   * Check if the current location url stats with a url or is equal
   */
  public static onParentRoute = (checkUrl?: string) => {
    if (checkUrl) {
      const pathname = Utils.getLocation().pathname;
      const checkPathname = Utils.getLocation(checkUrl).pathname;
      return pathname.startsWith(checkPathname);
    }
    return false;
  }

  /**
   * Given an url, return it without the hash
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {string} url
   * @return {string} newCleanUrl
   */
  public static cleanLink(url: string): string {
    return url.replace(/#.*/, '');
  }

  /**
   * Return the port number normalized, eventually you can pass a string to be normalized.
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} p
   * @return {Int} port
   */
  public static getPort(p?: string, url?: string) {
    const location = Utils.getLocation(url);
    const port = typeof p !== 'undefined' ? p : location.port;
    const protocol = location.protocol;

    if (port !== '') {
      return Number(port);
    }
    if (protocol === 'http:') {
      return 80;
    }

    if (protocol === 'https:') {
      return 443;
    }
  }

  /**
   * Test if url is absolute or relative
   * @see https://stackoverflow.com/a/19709846/1465919
   */
  public static isAbsoluteUrl(url: string) {
    if (!url) {
      return false;
    }
    const isProtokoll = new RegExp('^(?:[a-z]+:)?//', 'i');
    const isAbsolute = isProtokoll.test(url) || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('fax:');
    return isAbsolute;
  }

  public static isExternalUrl = (absoluteUrl: string) => {
    if (Utils.isAbsoluteUrl(absoluteUrl)) {
      const location = Utils.getLocation();
      const host = location.protocol + '//' + location.hostname;
      let isExternal = true;
      if (absoluteUrl.startsWith(host)) {
        isExternal = false;
      }
      return isExternal;
    }
    return false;
  }

  public static isInternalUrl = (url: string) => {
    return !Utils.isExternalUrl(url);
  }

  /**
   * get param from hash
   */
  public static getUrlParameter(name: string, url: string) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  /**
   * Get hash from address bar or url if set
   */
  public static getHash(url?: string) {
    return Utils.getLocation(url).hash;
  }

  /**
   * Change hash from address bar
   */
  public static updateHash(hash: string) {
    return window.location.hash = hash;
  }

  /**
   * Remove hash from address bar
   */
  public static removeHash() {
    return history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  public static getViewportDimensions()  {
    const w = Math.max(document.documentElement ? document.documentElement.clientWidth : 0, window.innerWidth || 0);
    const h = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
    return {
      h,
      w,
    };
  }

  public static escapeHtml(str: string) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
    };

    return str.replace(/[&<>]/g, (tag) => {
      return tagsToReplace[tag as '&' | '<' | '>'] || tag;
    });
  }

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
  public static scrollTo(to: HTMLElement, offset: number, scrollElement: Element | (Window & typeof globalThis) | null, angle: 'horizontal' | 'vertical' = 'vertical', behavior: 'auto' | 'smooth' | undefined = 'smooth') {
    if (!scrollElement) {
      scrollElement = window;
    }

    let top = 0;
    let left = 0;

    if (typeof((scrollElement as Window).pageYOffset) === 'number') {
      if (angle === 'vertical') {
        top = (to.getBoundingClientRect().top + (scrollElement as Window).pageYOffset) - offset;
      } else {
        left = (to.getBoundingClientRect().left + (scrollElement as Window).pageXOffset) - offset;
      }

    } else {
      if (angle === 'vertical') {
        top = (to.offsetTop ) - offset;
      } else {
        left = (to.offsetLeft ) - offset;
      }
    }

    // if is is window to scroll
    scrollElement.scroll({
      behavior,
      left,
      top,
    });
  }

  /**
   * The debounce function receives our function as a parameter
   * @see https://css-tricks.com/styling-based-on-scroll-position/
   */
  public static debounce = (fn: (...params: any) => any) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame: number;

    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params: any) => {

      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) {
        cancelAnimationFrame(frame);
      }

      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {

        // Call our function and pass any params we received
        fn(...params);
      });
    };
  }

  /**
   * Cross-browser Document Ready check
   * @see https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/
   * @param callback
   */
  public static domIsReady(callback: () => void) {
    if (!callback || typeof(callback) !== 'function') {
      return new Error('The callback is required!');
    }

    const checkReady = () => {
      if (document.readyState !== 'loading') {
        callback();
        if ((document as any).attachEvent) {
          (document as any).detachEvent('onreadystatechange', checkReady);
        }
        document.removeEventListener('DOMContentLoaded', checkReady);
      }
    };

    if ((document as any).attachEvent) {
      (document as any).attachEvent('onreadystatechange', checkReady);
    }
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', checkReady);
    }
    checkReady();
  }

}
