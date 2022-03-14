import { MasonryModuleOptions } from "../types/index.js";

export class MasonryService {
  protected static _options: MasonryModuleOptions;
  public static instance?: MasonryService;

  public static get options() {
    return this._options;
  }

  protected constructor() {
    /**/
  }

  public static getSingleton() {
    if (this.instance) {
      return this.instance;
    }

    throw new Error(
      `Singleton of MasonryService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: MasonryModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of MasonryService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
