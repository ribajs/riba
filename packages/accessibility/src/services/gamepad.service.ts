import { AccessibilityModuleOptions } from "../types";
import { isGamepadSupported, gameControl } from "gamecontroller.js";
import test from "gamecontroller.js";
export class GamepadService {
  protected _options: AccessibilityModuleOptions;
  protected _control: typeof gameControl;
  public static instance?: GamepadService;

  public get options() {
    return this._options;
  }

  public get control() {
    return this._control;
  }

  protected constructor(options: AccessibilityModuleOptions = {}) {
    this._options = options;
    console.debug("test", test);
    if (!isGamepadSupported()) {
      console.warn("[GamepadService] Gamepad is not supported!");
    }
    this._control = gameControl;
  }

  public static getSingleton() {
    if (this.instance) {
      return this.instance;
    }

    throw new Error(
      `Singleton of GamepadService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: AccessibilityModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of GamepadService already defined!`);
    }
    this.instance = new this(options);
    return this.instance;
  }
}