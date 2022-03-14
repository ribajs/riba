import { SSRModuleOptions } from "../types/index.js";

export class ModuleService {
  protected static _options: SSRModuleOptions;
  public static instance?: ModuleService;

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
      `Singleton of ModuleService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: SSRModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of ModuleService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
