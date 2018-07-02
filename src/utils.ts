export const mergeObject = (target: any, obj: any) => {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }
  return target;
};

/**
 * Test if string is a json string
 * @param str 
 */
export const isJson = (str: string) => {
  try {
    const val = JSON.parse(str);
    return (val instanceof Array || val instanceof Object) ? true : false;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a value is an object than can be observed.
 * @param obj 
 */
export const isObject = (obj: object) => {
  return typeof obj === 'object' && obj !== null;
};

export const getString = (value: string) => {
  return value != null ? value.toString() : undefined;
};

export const times = (n: number, cb: () => void) => {
  for (let i = 0; i < n; i++) {
    cb();
  }
};

/**
 * 
 */
export const getInputValue = (el: HTMLSelectElement | HTMLInputElement) => {
  let results: string[] = [];
  if (el.type === 'checkbox') {
    return (el as HTMLInputElement).checked;
  } else if (el.type === 'select-multiple') {
    let options:HTMLOptionsCollection = (el as HTMLSelectElement).options;

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const option = options[key];
        if (option.selected) {
          results.push(option.value);
        }
      }
    }

    return results;
  } else {
    return el.value;
  }
}

import $ from 'jquery';

// TODO
export interface IDeferred {
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

  /**
   * Time in millisecond after the xhr request goes in timeout
   *
   * @memberOf Barba.Utils
   * @type {Number}
   * @default
   */
  public static xhrTimeout: 5000;

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
    return !this.isUndefined(value);
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
   * Check whether variable is number or string in JavaScript
   * @see https://stackoverflow.com/a/1421988/1465919
   */
  public static isNumber(value?: any): boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  /**
   * heck if type is Object
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isObject(value?: any) {
    return this.isDefined(value) && typeof value === 'object';
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
  public static stringHasOnlyNumber(value?: any) {
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
  public static extend(deep: boolean, target: object, object1: object, objectN?: object) {
    let result;
    if (deep) {
      result = $.extend(true, target, object1, objectN);
    } else {
      // Passing false for deep argument is not supported.
      result = $.extend(target, object1, objectN);
    }
    return result;
  }

  /**
   * Concat the contents of two objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} object1 An first object containing properties to concat.
   * @param {object} object2 The second object containing properties to concat.
   */
  public static concat(deep: boolean, object1: object, object2: object) {
    return this.extend(deep, {}, object1, object2);
  }

  /**
   * Start an XMLHttpRequest() and return a Promise
   *
   * @memberOf Barba.Utils
   * @param  {string} url
   * @return {Promise}
   */
  public static xhr(url: string) {
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
    req.timeout = this.xhrTimeout;
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
    const l = ($(`<a href="${url}"></a>`)[0] as HTMLAnchorElement as HTMLHyperlinkElementUtils as Location);
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

  /**
   * Format a monetary amount using Shopify's formatMoney if available.
   * If it's not available, just return the value.
   * @source https://github.com/discolabs/cartjs/blob/master/src/utils.coffee
   * @source https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
   */
  // public static formatMoney(value, format, formatName, currency) {
  //   var _ref, _ref1;
  //   if (currency == null) {
  //     currency = '';
  //   }
  //   if (!currency) {
  //     currency = ProductJS.settings.currency;
  //   }
  //   if ((window.Currency != null) && currency !== ProductJS.settings.currency) {
  //     value = Currency.convert(value, ProductJS.settings.currency, currency);
  //     if ((((_ref = window.Currency) != null ? _ref.moneyFormats : void 0) != null) && (currency in window.Currency.moneyFormats)) {
  //       format = window.Currency.moneyFormats[currency][formatName];
  //     }
  //   }
  //   if (((_ref1 = window.Shopify) != null ? _ref1.formatMoney : void 0) != null) {
  //     return Shopify.formatMoney(value, format);
  //   } else {
  //     return value;
  //   }
  // }

}
