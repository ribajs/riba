import { JQueryModuleOptions } from "../types";

export class JQueryService {
  protected static _options: JQueryModuleOptions;
  public static instance?: JQueryService;

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
      `Singleton of JQueryService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: JQueryModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of JQueryService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
