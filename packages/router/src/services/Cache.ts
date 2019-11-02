import { Utils } from '@ribajs/core';

/**
 * BaseCache it's a simple static cache
 */
class BaseCache {

  /**
   * The Object that keeps all the key value information
   */
  public data: {[key: string]: any};

  constructor() {
    this.data = {};
  }

  /**
   * Set a key and value data, mainly Barba is going to save promises
   *
   */
  public set(key: string, val: any) {
    return this.data[key] = val;
  }

  /**
   * Retrieve the data using the key
   */
  public get(key: string) {
    return this.data[key];
  }

  /**
   * Flush the cache
   */
  public reset() {
    this.data = {};
  }

  /**
   * Helper to extend this object
   *
   * @return {object} newInheritObject
   */
  private extend(obj: object) {
    return Utils.extend(false, this, obj);
  }
}

export { BaseCache };
