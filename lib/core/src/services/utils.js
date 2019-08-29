"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */
class Utils {
    /**
     * Promise version of JQuery.getJSON()
     * Load JSON-encoded data from the server using a GET HTTP request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @see https://api.jquery.com/jquery.getjson/
     */
    static getJSON(url, data) {
        return new Promise((resolve, reject) => {
            vendors_1.JQuery.getJSON(url, data)
                .done((resolve))
                .fail((jqxhr, textStatus, error) => {
                // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
                reject(jqxhr);
            });
        });
    }
    /**
     * Promise version of JQuery.post()
     * Load data from the server using a HTTP POST request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.post/
     */
    static post(url, data, dataType) {
        return new Promise((resolve, reject) => {
            vendors_1.JQuery.post(url, data, null, dataType)
                .done((resolve))
                .fail((jqxhr, textStatus, error) => {
                // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
                reject(jqxhr);
            });
        });
    }
    static delete(url, data, dataType) {
        return new Promise((resolve, reject) => {
            return vendors_1.JQuery.ajax({
                url,
                type: 'DELETE',
                data,
                dataType,
            })
                .done((resolve))
                .fail((jqxhr, textStatus, error) => {
                // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
                reject(jqxhr);
            });
        });
    }
    static put(url, data, dataType) {
        return new Promise((resolve, reject) => {
            return vendors_1.JQuery.ajax({
                url,
                type: 'PUT',
                data,
                dataType,
            })
                .done((resolve))
                .fail((jqxhr, textStatus, error) => {
                // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
                reject(jqxhr);
            });
        });
    }
    /**
     * Promise version of JQuery.get()
     * Load data from the server using a HTTP GET request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.get/
     */
    static get(url, data, dataType) {
        return new Promise((resolve, reject) => {
            vendors_1.JQuery.get(url, data, null, dataType)
                .done((resolve))
                .fail((jqxhr, textStatus, error) => {
                // console.warn('jqxhr', jqxhr, 'textStatus', textStatus, 'error', error);
                reject(jqxhr);
            });
        });
    }
    /**
     * Test if string is a json string
     * @param str
     */
    static isJson(str) {
        if (!str) {
            return false;
        }
        try {
            const val = JSON.parse(str);
            return (Array.isArray(val) || typeof (val) === 'object') ? true : false;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Check if value is undefined
     */
    static isUndefined(value) {
        return typeof (value) === 'undefined';
    }
    /**
     * Check if value is undefined
     */
    static isDefined(value) {
        return !Utils.isUndefined(value);
    }
    /**
     * Check if type is Object
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isObject(obj) {
        return Utils.isDefined(obj) && typeof obj === 'object' && obj !== null;
    }
    /**
     * Parse value to string or return undefined if value is null
     * @param value
     */
    static getString(value) {
        return value != null ? value.toString() : undefined;
    }
    /**
     * Parse value to number or return 0 if value is null or undefined
     * @param value
     */
    static getNumber(value) {
        return value ? parseFloat(value) : undefined;
    }
    static times(n, cb) {
        for (let i = 0; i < n; i++) {
            cb();
        }
    }
    /**
     *
     */
    static getInputValue(el) {
        const results = [];
        if (el.type === 'checkbox') {
            return el.checked;
        }
        else if (el.type === 'select-multiple') {
            const options = el.options;
            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    const option = options[key];
                    if (option.selected) {
                        results.push(option.value);
                    }
                }
            }
            return results;
        }
        else if (el.getAttribute('contenteditable')) {
            return el.innerHTML; // TODO write test for contenteditable
        }
        else {
            return el.value;
        }
    }
    /**
     * Check if value is a function
     */
    static isFunction(value) {
        return typeof (value) === 'function';
    }
    /**
     * Check if variable is an Array
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
    /**
     * Check whether variable is number or a string with numbers in JavaScript
     * @see https://stackoverflow.com/a/1421988/1465919
     */
    static isNumber(value) {
        return !isNaN(parseFloat(value)) && !isNaN(value - 0);
    }
    /**
     * Check if type is Boolean
     * @see https://stackoverflow.com/a/28814615/1465919
     */
    static isBoolean(value) {
        return typeof (value) === typeof (true);
    }
    /**
     * Check if value is a string
     */
    static isString(value) {
        return this.isDefined(value) && typeof (value) === 'string';
    }
    /**
     * Check if string contains a number
     */
    static stringHasNumber(value) {
        return this.isString(value) && /\d/.test(value);
    }
    /**
     * Check if string contains only numbers
     */
    static stringHasOnlyNumbers(value) {
        return /^\d+$/.test(value);
    }
    /**
     * Check if string contains only numbers, +, - and ()
     */
    static stringIsPhoneNumber(value) {
        return /^[0-9 ()+-]+$/.test(value);
    }
    /**
     * Just get the digits of a string, useful to remove px pixel from css value
     *
     * @see http://stackoverflow.com/a/1100653/1465919
     */
    static justDigits(str) {
        const num = str.replace(/[^-\d\.]/g, '');
        if (!Utils.isNumber(num)) {
            return 0;
        }
        else {
            return Number(num);
        }
    }
    /**
     * Merge the contents of two or more objects together into the first object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} target An object that will receive the new properties if additional objects are passed in or that will extend the JQuery namespace if it is the sole argument.
     * @param {object} object1 An object containing additional properties to merge in.
     * @param {object} [objectN] Additional objects containing properties to merge in.
     * @returns
     * @memberof Utils
     */
    static extend(deep, target, object1, objectN) {
        let result;
        if (deep) {
            result = vendors_1.JQuery.extend(true, target || {}, object1 || {}, objectN);
        }
        else {
            // Passing false for deep argument is not supported.
            result = vendors_1.JQuery.extend(target || {}, object1 || {}, objectN);
        }
        return result;
    }
    /**
     * Concat the contents of two objects together into the first object and return the concatenated object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} object1 An first object containing properties to concat.
     * @param {object} object2 The second object containing properties to concat.
     */
    static concat(deep, object1, object2) {
        object1 = this.extend(deep, object1 || {}, object1 || {}, object2 || {});
        return object1;
    }
    /**
     * Clone an object or array
     * @param deep If true, the merge becomes recursive (aka. deep copy).
     * @param val The value(s) to clone
     */
    static clone(deep, val) {
        if (Utils.isArray(val)) {
            return val.slice();
        }
        else {
            return Utils.extend(deep, {}, val);
        }
    }
    /**
     * Set header for each xhr and jquery request
     * @param name Header name
     * @param value Hander value
     */
    static setRequestHeaderEachRequest(name, value) {
        // TODO Are old values overwritten if JQuery.ajaxSetup called multiple times?
        vendors_1.JQuery.ajaxSetup({
            beforeSend: (xhr) => {
                xhr.setRequestHeader(name, value);
            },
        });
        this._requestHeadersEachRequest.push({
            name,
            value,
        });
    }
    /**
     * Start an XMLHttpRequest() and return a Promise
     *
     * @memberOf Barba.Utils
     * @param url
     * @param xhrTimeout Time in millisecond after the xhr request goes in timeout
     */
    static xhr(url, xhrTimeout = 5000) {
        const deferred = this.deferred();
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    return deferred.resolve(req.responseText);
                }
                else {
                    return deferred.reject(new Error('xhr: HTTP code is not 200'));
                }
            }
        };
        req.ontimeout = () => {
            return deferred.reject(new Error('xhr: Timeout exceeded'));
        };
        req.open('GET', url);
        req.timeout = xhrTimeout;
        for (const header of this._requestHeadersEachRequest) {
            req.setRequestHeader(header.name, header.value);
        }
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
    static deferred() {
        const obj = {};
        const prom = new Promise((resolve, reject) => {
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
    static getLocation(url) {
        if (!url) {
            return window.location;
        }
        // l.href = href;
        const l = vendors_1.JQuery(`<a href="${url}"></a>`)[0];
        return l;
    }
    /**
     * Return the current url
     *
     * @memberOf Barba.Utils
     * @return {string} currentUrl
     */
    static getUrl(url) {
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
    static cleanLink(url) {
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
    static getPort(p, url) {
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
    static isAbsoluteUrl(url) {
        const isProtokoll = new RegExp('^(?:[a-z]+:)?//', 'i');
        const isAbsolute = isProtokoll.test(url) || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('fax:');
        return isAbsolute;
    }
    /**
     * get param from hash
     */
    static getUrlParameter(name, url) {
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
    static getHash(url) {
        return Utils.getLocation(url).hash;
    }
    /**
     * Change hash from address bar
     */
    static updateHash(hash) {
        return window.location.hash = hash;
    }
    /**
     * Remove hash from address bar
     */
    static removeHash() {
        return history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    static getViewportDimensions() {
        const w = Math.max(document.documentElement ? document.documentElement.clientWidth : 0, window.innerWidth || 0);
        const h = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
        return {
            h,
            w,
        };
    }
}
exports.Utils = Utils;
/**
 * Returns a camel-cased version of the string. Used when translating an
 * element's attribute name into a property name for the component's scope.
 * @param string
 */
Utils.camelCase = (str) => {
    return str.replace(/-([a-z])/g, (grouped) => {
        return grouped[1].toUpperCase();
    });
};
/**
 * Check if we are on the route
 */
Utils.onRoute = (checkUrl) => {
    if (checkUrl) {
        const pathname = Utils.getLocation().pathname;
        return checkUrl === pathname;
    }
    return false;
};
/**
 * Check if the current location url stats with a url or is equal
 */
Utils.onParentRoute = (checkUrl) => {
    if (checkUrl) {
        const pathname = Utils.getLocation().pathname;
        return pathname.startsWith(checkUrl);
    }
    return false;
};
Utils.isExternalUrl = (absoluteUrl) => {
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
};
Utils.isInternalUrl = (url) => {
    return !Utils.isExternalUrl(url);
};
/**
 * Header name value pair to send on each request
 */
Utils._requestHeadersEachRequest = [{
        name: 'x-barba',
        value: 'yes',
    }];
