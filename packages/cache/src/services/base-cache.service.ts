/**
 * BaseCache it's a simple static cache
 */
class BaseCache<T = any> {

  /**
   * The Object that keeps all the key value information
   */
  public data: {[key: string]: T};

  constructor() {
    this.data = {};
  }

  /**
   * Set a key and value data, mainly Barba is going to save promises
   *
   */
  public set(key: string, val: T) {
    this.data[key] = val;
    // console.debug('SET key: ',key);
    return this.data[key]
  }

  /**
   * Retrieve the data using the key
   */
  public get(key: string): T | undefined {
    // console.debug('GET key: ',key);
    return this.data[key];
  }

  /**
   * Flush the cache
   */
  public reset() {
    this.data = {};
  }
}

export { BaseCache };
