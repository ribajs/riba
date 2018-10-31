import { Utils } from '../../../utils';

/**
 * BaseCache it's a simple static cache
 *
 * @namespace Barba.BaseCache
 * @type {Object}
 */
class BaseCache {

  /**
   * The Object that keeps all the key value information
   *
   * @memberOf Barba.BaseCache
   * @type {Object}
   */
  public data: {[key: string]: any};

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
  public set(key: string, val: any) {
    return this.data[key] = val;
  }

  /**
   * Retrieve the data using the key
   *
   * @memberOf Barba.BaseCache
   * @param  {String} key
   * @return {*}
   */
  public get(key: string) {
    return this.data[key];
  }

  /**
   * Flush the cache
   *
   * @memberOf Barba.BaseCache
   */
  public reset() {
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
  private extend(obj: object) {
    return Utils.extend(false, this, obj);
  }
}

export { BaseCache };
