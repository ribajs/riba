import { RouterModuleOptions } from "../types";

export class RouterService {
  protected static _options: RouterModuleOptions;
  public static instance?: RouterService;

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
      `Singleton of RouterService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: RouterModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of RouterService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
