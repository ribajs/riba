import { ExtrasModuleOptions } from "../types/index.js";

export class ExtrasService {
  protected static _options: ExtrasModuleOptions;
  public static instance?: ExtrasService;

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
      `Singleton of ExtrasService not defined, please call setSingleton first!`,
    );
  }

  public static setSingleton(options: ExtrasModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of ExtrasService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
