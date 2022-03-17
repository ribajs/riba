import { Bs4ModuleOptions } from "../interfaces/index.js";

export class Bs4Service {
  protected static _options: Bs4ModuleOptions;
  public static instance?: Bs4Service;

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
      `Singleton of Bs4Service not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: Bs4ModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of Bs4Service already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
