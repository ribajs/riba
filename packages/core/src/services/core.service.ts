import { CoreModuleOptions } from "../types/index.js";

export class CoreService {
  protected static _options: CoreModuleOptions = {};
  protected static instance?: CoreService;

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
      `Singleton of CoreService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: CoreModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of CoreService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }

  public static hasInstance() {
    return !!this.instance;
  }
}
