import { TypedocModuleOptions } from "../types/index.js";

export class TypedocService {
  protected static _options: TypedocModuleOptions = {};
  public static instance?: TypedocService;

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
      `Singleton of TypedocService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: TypedocModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of TypedocService already defined!`);
    }

    if(!options.serverBaseUrl) {
      options.serverBaseUrl = window.remoteSearchOptions?.serverBaseUrl;
    }

    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
