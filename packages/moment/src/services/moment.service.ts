import { MomentModuleOptions } from "../types/index.js";

export class MomentService {
  protected static _options: MomentModuleOptions;
  public static instance?: MomentService;

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
      `Singleton of MomentService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: MomentModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of MomentService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
