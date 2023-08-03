import { LeafletModuleOptions } from "../types/index.js";

export class LeafletService {
  protected static _options: LeafletModuleOptions;
  public static instance?: LeafletService;

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
      `Singleton of LeafletService not defined, please call setSingleton first!`,
    );
  }

  public static setSingleton(options: LeafletModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of LeafletService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
