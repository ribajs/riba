"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
/**
 * BaseCache it's a simple static cache
 *
 * @namespace Barba.BaseCache
 * @type {Object}
 */
class BaseCache {
    constructor() {
        this.data = {};
    }
    /**
     * Set a key and value data, mainly Barba is going to save promises
     *
     * @memberOf Barba.BaseCache
     * @param {String} key
     * @param {*} value
     */
    set(key, val) {
        return this.data[key] = val;
    }
    /**
     * Retrieve the data using the key
     *
     * @memberOf Barba.BaseCache
     * @param  {String} key
     * @return {*}
     */
    get(key) {
        return this.data[key];
    }
    /**
     * Flush the cache
     *
     * @memberOf Barba.BaseCache
     */
    reset() {
        this.data = {};
    }
    /**
     * Helper to extend this object
     *
     * @memberOf Barba.BaseCache
     * @private
     * @param  {object} newObject
     * @return {object} newInheritObject
     */
    extend(obj) {
        return core_1.Utils.extend(false, this, obj);
    }
}
exports.BaseCache = BaseCache;
