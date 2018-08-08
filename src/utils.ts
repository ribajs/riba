import jQuery from 'jquery';

// TODO
export interface IDeferred {
  resolve: any;
  reject: any;
}

/**
 * Promise version of jQuery.getJSON()
 * Load JSON-encoded data from the server using a GET HTTP request.
 * @param url A string containing the URL to which the request is sent.
 * @param data A plain object or string that is sent to the server with the request.
 * @see https://api.jquery.com/jquery.getjson/
 */
export const getJSON = (url: string, data?: any) => {
  return new Promise<any>((resolve, reject) => {
    jQuery.getJSON(url, data)
    .done((resolve))
    .fail(( jqxhr, textStatus, error ) => {
      // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
      reject(jqxhr);
    });
  });
};

/**
 * Promise version of jQuery.post()
 * Load data from the server using a HTTP POST request.
 * @param url A string containing the URL to which the request is sent.
 * @param data A plain object or string that is sent to the server with the request.
 * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
 * @see https://api.jquery.com/jquery.post/
 */
export const post = (url: string, data?: any, dataType?: string) => {
  return new Promise<any>((resolve, reject) => {
    jQuery.post(url, data, null, dataType)
    .done((resolve))
    .fail(( jqxhr, textStatus, error ) => {
      // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
      reject(jqxhr);
    });
  });
};

/**
 * Promise version of jQuery.get()
 * Load data from the server using a HTTP GET request.
 * @param url A string containing the URL to which the request is sent.
 * @param data A plain object or string that is sent to the server with the request.
 * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
 * @see https://api.jquery.com/jquery.get/
 */
export const get = (url: string, data?: any, dataType?: string) => {
  return new Promise<any>((resolve, reject) => {
    jQuery.get(url, data, null, dataType)
    .done((resolve))
    .fail(( jqxhr, textStatus, error ) => {
      // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
      reject(jqxhr);
    });
  });
};

/**
 * Test if string is a json string
 * @param str
 */
export const isJson = (str?: string | null) => {
  if (!str) {
    return false;
  }
  try {
    const val = JSON.parse(str);
    return (val instanceof Array || val instanceof Object) ? true : false;
  } catch (error) {
    return false;
  }
};

/**
 * Check if value is undefined
 */
export const isUndefined = (value?: any) => {
  return typeof(value) === 'undefined';
};

/**
 * Check if value is undefined
 */
export const isDefined = (value?: any) => {
  return !isUndefined(value);
};

/**
 * Check if type is Object
 * @see https://stackoverflow.com/a/4775737/1465919
 */
export const isObject = (obj: object) => {
  return isDefined(obj) && typeof obj === 'object' && obj !== null;
};

/**
 * Parse value to string or return undefined if value is null
 * @param value
 */
export const getString = (value: string) => {
  return value != null ? value.toString() : undefined;
};

/**
 * Parse value to number or return 0 if value is null or undefined
 * @param value
 */
export const getNumber = (value: string) => {
  return value ? parseFloat(value) : undefined;
};

export const times = (n: number, cb: () => void) => {
  for (let i = 0; i < n; i++) {
    cb();
  }
};

/**
 *
 */
export const getInputValue = (el: HTMLElement) => {
  const results: string[] = [];
  if ((el as HTMLSelectElement).type === 'checkbox') {
    return (el as HTMLInputElement).checked;
  } else if ((el as HTMLSelectElement).type === 'select-multiple') {
    const options: HTMLOptionsCollection = (el as HTMLSelectElement).options;

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
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
};

/**
 * Returns a camel-cased version of the string. Used when translating an
 * element's attribute name into a property name for the component's scope.
 * TODO move to utils
 * @param string
 */
export const camelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (grouped) => {
    return grouped[1].toUpperCase();
  });
};

/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */
export class Utils {

  /**
   * Promise version of jQuery.getJSON()
   * Load JSON-encoded data from the server using a GET HTTP request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @see https://api.jquery.com/jquery.getjson/
   */
  public static getJSON = getJSON;

  /**
   * Promise version of jQuery.post()
   * Load data from the server using a HTTP POST request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @see https://api.jquery.com/jquery.post/
   */
  public static post = post;

  /**
   * Promise version of jQuery.get()
   * Load data from the server using a HTTP GET request.
   * @param url A string containing the URL to which the request is sent.
   * @param data A plain object or string that is sent to the server with the request.
   * @see https://api.jquery.com/jquery.get/
   */
  public static get = get;

  /**
   * Parse value to string orreturn undefined if value is null
   * @param value
   */
  public static getString = getString;

  /**
   * Parse value to number or return 0 if value is null or undefined
   * @param value
   */
  public static getNumber = getNumber;

  public static times = times;

  /**
   * Returns a camel-cased version of the string. Used when translating an
   * element's attribute name into a property name for the component's scope.
   * TODO move to utils
   * @param string
   */
  public static camelCase = camelCase;

  public static getInputValue = getInputValue;

  /**
   * Test if string is a json string
   * @param str
   */
  public static isJson = isJson;

  /**
   * Check if type is Object
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isObject = isObject;

  /**
   * Check if value is undefined
   */
  public static isUndefined = isUndefined;

  /**
   * Check if value is undefined
   */
  public static isDefined = isDefined;

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
    const num = str.replace(/[^-\d\.]/g, '');
    if (!Utils.isNumber(num)) {
      return 0;
    } else {
      return Number(num);
    }
  }

  /**
   * Merge the contents of two or more objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} target An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.
   * @param {object} object1 An object containing additional properties to merge in.
   * @param {object} [objectN] Additional objects containing properties to merge in.
   * @returns
   * @memberof Utils
   */
  public static extend(deep: boolean, target?: object, object1?: object, objectN?: object) {
    let result;
    if (deep) {
      result = jQuery.extend(true, target || {}, object1 || {}, objectN);
    } else {
      // Passing false for deep argument is not supported.
      result = jQuery.extend(target || {}, object1 || {}, objectN);
    }
    return result;
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
   * Start an XMLHttpRequest() and return a Promise
   *
   * @memberOf Barba.Utils
   * @param  {string} url
   * @param  {number} xhrTimeout Time in millisecond after the xhr request goes in timeout
   * @return {Promise}
   */
  public static xhr(url: string, xhrTimeout = 5000) {
    const deferred = this.deferred();
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          return deferred.resolve(req.responseText);
        } else {
          return deferred.reject(new Error('xhr: HTTP code is not 200'));
        }
      }
    };

    req.ontimeout = () => {
      return deferred.reject(new Error('xhr: Timeout exceeded'));
    };

    req.open('GET', url);
    req.timeout = xhrTimeout;
    req.setRequestHeader('x-barba', 'yes');
    req.send();

    return deferred.promise;
  }

  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @memberOf Barba.Utils
   * @return {IDeferred}
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
    // l.href = href;
    const l = (jQuery(`<a href="${url}"></a>`)[0] as HTMLAnchorElement as HTMLHyperlinkElementUtils as Location);
    return l;
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
      if (checkUrl === pathname) {
        return true;
      }
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
   */
  public static isAbsoluteUrl(url: string) {
    const pat = /^https?:\/\//i;
    return pat.test(url);
  }

  /**
   * get param from hash
   */
  public static getUrlParameter(name: string, url: string) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
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
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return {
      h,
      w,
    };
  }

}
