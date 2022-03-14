import { PhotoswipeModuleOptions } from "../types/index.js";

export class PhotoswipeService {
  protected static _options: PhotoswipeModuleOptions;
  public static instance?: PhotoswipeService;

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
      `Singleton of PhotoswipeService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: PhotoswipeModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of PhotoswipeService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
