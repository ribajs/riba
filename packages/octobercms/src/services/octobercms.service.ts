import { OctobercmsModuleOptions } from "../types";

export class OctobercmsService {
  protected static _options: OctobercmsModuleOptions;
  public static instance?: OctobercmsService;

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
      `Singleton of OctobercmsService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: OctobercmsModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of OctobercmsService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
