import { RouterModuleOptions } from "../types/index.js";
import { HideShowTransition } from "./Transition/HideShowTransition.js";

const DEFAULT_OPTIONS: RouterModuleOptions = {
  defaultTransition: new HideShowTransition(),
  transitions: [],
  scrollToAnchorOffset: 0,
};

export class RouterService {
  protected static _options: RouterModuleOptions;
  public static instance?: RouterService;

  public static get options(): RouterModuleOptions {
    if (!this._options) {
      return DEFAULT_OPTIONS;
    }
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
      `Singleton of RouterService not defined, please call setSingleton first!`,
    );
  }

  public static setSingleton(options: Partial<RouterModuleOptions> = {}) {
    if (this.instance) {
      console.warn(`Singleton of RouterService already defined!`);
      return this.instance;
    }
    options.defaultTransition =
      options.defaultTransition ?? new HideShowTransition();
    options.transitions = options.transitions ?? [];
    options.scrollToAnchorOffset = options.scrollToAnchorOffset ?? 0;
    this._options = options as RouterModuleOptions;
    this.instance = new this();
    return this.instance;
  }
}
