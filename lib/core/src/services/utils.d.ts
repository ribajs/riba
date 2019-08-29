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
export declare class Utils {
    /**
     * Promise version of JQuery.getJSON()
     * Load JSON-encoded data from the server using a GET HTTP request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @see https://api.jquery.com/jquery.getjson/
     */
    static getJSON(url: string, data?: any): Promise<any>;
    /**
     * Promise version of JQuery.post()
     * Load data from the server using a HTTP POST request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.post/
     */
    static post(url: string, data?: any, dataType?: string): Promise<any>;
    static delete(url: string, data?: any, dataType?: string): Promise<any>;
    static put(url: string, data?: any, dataType?: string): Promise<any>;
    /**
     * Promise version of JQuery.get()
     * Load data from the server using a HTTP GET request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.get/
     */
    static get(url: string, data?: any, dataType?: string): Promise<any>;
    /**
     * Test if string is a json string
     * @param str
     */
    static isJson(str?: string | null): boolean;
    /**
     * Check if value is undefined
     */
    static isUndefined(value?: any): boolean;
    /**
     * Check if value is undefined
     */
    static isDefined(value?: any): boolean;
    /**
     * Check if type is Object
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isObject(obj: object): boolean;
    /**
     * Parse value to string or return undefined if value is null
     * @param value
     */
    static getString(value: string): string | undefined;
    /**
     * Parse value to number or return 0 if value is null or undefined
     * @param value
     */
    static getNumber(value: string): number | undefined;
    static times(n: number, cb: () => void): void;
    /**
     *
     */
    static getInputValue(el: HTMLElement): string | boolean | string[];
    /**
     * Returns a camel-cased version of the string. Used when translating an
     * element's attribute name into a property name for the component's scope.
     * @param string
     */
    static camelCase: (str: string) => string;
    /**
     * Check if value is a function
     */
    static isFunction(value: any): boolean;
    /**
     * Check if variable is an Array
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isArray(value: any): boolean;
    /**
     * Check whether variable is number or a string with numbers in JavaScript
     * @see https://stackoverflow.com/a/1421988/1465919
     */
    static isNumber(value?: any): boolean;
    /**
     * Check if type is Boolean
     * @see https://stackoverflow.com/a/28814615/1465919
     */
    static isBoolean(value?: any): boolean;
    /**
     * Check if value is a string
     */
    static isString(value?: any): boolean;
    /**
     * Check if string contains a number
     */
    static stringHasNumber(value: string): boolean;
    /**
     * Check if string contains only numbers
     */
    static stringHasOnlyNumbers(value?: any): boolean;
    /**
     * Check if string contains only numbers, +, - and ()
     */
    static stringIsPhoneNumber(value: string): boolean;
    /**
     * Just get the digits of a string, useful to remove px pixel from css value
     *
     * @see http://stackoverflow.com/a/1100653/1465919
     */
    static justDigits(str: string): number;
    /**
     * Merge the contents of two or more objects together into the first object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} target An object that will receive the new properties if additional objects are passed in or that will extend the JQuery namespace if it is the sole argument.
     * @param {object} object1 An object containing additional properties to merge in.
     * @param {object} [objectN] Additional objects containing properties to merge in.
     * @returns
     * @memberof Utils
     */
    static extend(deep: boolean, target?: object, object1?: object, objectN?: object): object;
    /**
     * Concat the contents of two objects together into the first object and return the concatenated object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} object1 An first object containing properties to concat.
     * @param {object} object2 The second object containing properties to concat.
     */
    static concat(deep: boolean, object1?: object, object2?: object): any;
    /**
     * Clone an object or array
     * @param deep If true, the merge becomes recursive (aka. deep copy).
     * @param val The value(s) to clone
     */
    static clone(deep: boolean, val: any): any;
    /**
     * Set header for each xhr and jquery request
     * @param name Header name
     * @param value Hander value
     */
    static setRequestHeaderEachRequest(name: string, value: string): void;
    /**
     * Start an XMLHttpRequest() and return a Promise
     *
     * @memberOf Barba.Utils
     * @param url
     * @param xhrTimeout Time in millisecond after the xhr request goes in timeout
     */
    static xhr(url: string, xhrTimeout?: number): any;
    /**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @memberOf Barba.Utils
     * @return {IDeferred}
     */
    static deferred(): any;
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
    static getLocation(url?: string): Location;
    /**
     * Return the current url
     *
     * @memberOf Barba.Utils
     * @return {string} currentUrl
     */
    static getUrl(url?: string): string;
    /**
     * Check if we are on the route
     */
    static onRoute: (checkUrl?: string | undefined) => boolean;
    /**
     * Check if the current location url stats with a url or is equal
     */
    static onParentRoute: (checkUrl?: string | undefined) => boolean;
    /**
     * Given an url, return it without the hash
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {string} url
     * @return {string} newCleanUrl
     */
    static cleanLink(url: string): string;
    /**
     * Return the port number normalized, eventually you can pass a string to be normalized.
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {String} p
     * @return {Int} port
     */
    static getPort(p?: string, url?: string): number | undefined;
    /**
     * Test if url is absolute or relative
     * @see https://stackoverflow.com/a/19709846/1465919
     */
    static isAbsoluteUrl(url: string): boolean;
    static isExternalUrl: (absoluteUrl: string) => boolean;
    static isInternalUrl: (url: string) => boolean;
    /**
     * get param from hash
     */
    static getUrlParameter(name: string, url: string): string | null;
    /**
     * Get hash from address bar or url if set
     */
    static getHash(url?: string): string;
    /**
     * Change hash from address bar
     */
    static updateHash(hash: string): string;
    /**
     * Remove hash from address bar
     */
    static removeHash(): void;
    static getViewportDimensions(): {
        h: number;
        w: number;
    };
    /**
     * Header name value pair to send on each request
     */
    protected static _requestHeadersEachRequest: {
        name: string;
        value: string;
    }[];
}
