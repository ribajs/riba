import { MonacoEditorModuleOptions } from "../types";

export class MonacoEditorService {
  protected static _options: MonacoEditorModuleOptions;
  public static instance?: MonacoEditorService;

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
      `Singleton of MonacoEditorService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: MonacoEditorModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of MonacoEditorService already defined!`);
    }
    this._options = options;
    this.instance = new this();
    return this.instance;
  }
}
