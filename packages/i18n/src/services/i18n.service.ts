import { I18nModuleOptions } from "../types/index.js";

export class I18nService {
  protected static _options: I18nModuleOptions;
  public static instance?: I18nService;

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
      `Singleton of I18nService not defined, please call setSingleton first!`,
    );
  }

  public static setSingleton(options: I18nModuleOptions) {
    if (this.instance) {
      throw new Error(`Singleton of I18nService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
