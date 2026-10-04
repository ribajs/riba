import type { I18nModuleOptions } from "../types/index.js";
import type { LocalesService } from "./locales.service.js";

export class I18nService {
  protected static _options?: I18nModuleOptions;
  public static instance?: I18nService;

  public static get options(): I18nModuleOptions {
    if (!this._options) {
      throw new Error(
        "[i18n] The i18n module is not registered, call i18nModule.init({ localesService }) first.",
      );
    }
    return this._options;
  }

  /** The service every binder, formatter and component of the module reads from */
  public static getLocalesService(): LocalesService {
    return this.options.localesService;
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

  /** Registering the same locales service again is a no-op, a different one is an error */
  public static setSingleton(options: I18nModuleOptions) {
    if (this.instance) {
      if (this._options?.localesService === options.localesService) {
        return this.instance;
      }
      throw new Error(
        `Singleton of I18nService already defined with another locales service, call I18nService.reset() first!`,
      );
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }

  /** Forget the registered service, mainly for tests */
  public static reset() {
    this.instance = undefined;
    this._options = undefined;
  }
}
