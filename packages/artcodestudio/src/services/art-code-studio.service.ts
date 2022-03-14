import { ArtCodeStudioModuleOptions } from "../types/index.js";

export class ArtCodeStudioService {
  protected static _options: ArtCodeStudioModuleOptions;
  public static instance?: ArtCodeStudioService;

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
      `Singleton of ArtCodeStudioService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: ArtCodeStudioModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of ArtCodeStudioService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
