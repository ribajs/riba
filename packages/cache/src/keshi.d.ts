declare module "keshi" {
  export interface Storage {
    get: (...args: any[]) => Promise<any>;
    set: (...args: any[]) => Promise<void>;
    del: (...args: any[]) => Promise<void>;
    clear: (...args: any[]) => Promise<void>;
    keys: (...args: any[]) => Promise<any[]>;
  }
  export default class Cache {
    constructor(options?: { customStorage?: Storage });
    resolve(
      key: string,
      fetcher: () => Promise<any>,
      maxAge?: number | string,
    ): Promise<any>;
    del(key: string): void;
    clear(): void;
  }
}
