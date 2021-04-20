import { ContentSliderModuleOptions } from "../types";

export class ContentSliderService {
  protected static _options: ContentSliderModuleOptions;
  public static instance?: ContentSliderService;

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
      `Singleton of ContentSliderService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: ContentSliderModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of ContentSliderService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
