/**
 * BaseCache it's a simple static cache
 *
 * @namespace Barba.BaseCache
 * @type {Object}
 */
declare class BaseCache {
    /**
     * The Object that keeps all the key value information
     *
     * @memberOf Barba.BaseCache
     * @type {Object}
     */
    data: {
        [key: string]: any;
    };
    constructor();
    /**
     * Set a key and value data, mainly Barba is going to save promises
     *
     * @memberOf Barba.BaseCache
     * @param {String} key
     * @param {*} value
     */
    set(key: string, val: any): any;
    /**
     * Retrieve the data using the key
     *
     * @memberOf Barba.BaseCache
     * @param  {String} key
     * @return {*}
     */
    get(key: string): any;
    /**
     * Flush the cache
     *
     * @memberOf Barba.BaseCache
     */
    reset(): void;
    /**
     * Helper to extend this object
     *
     * @memberOf Barba.BaseCache
     * @private
     * @param  {object} newObject
     * @return {object} newInheritObject
     */
    private extend;
}
export { BaseCache };
