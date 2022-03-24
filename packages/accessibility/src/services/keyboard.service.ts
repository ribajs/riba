import { AccessibilityModuleOptions } from "../types/index.js";
import { EventDispatcher } from "@ribajs/events";
import { KEYBOARD_KEYS } from "../constants/keyboard-keys.js";
import type {
  KeyboardEventName,
  KeyboardKey,
  KeyboardEventCallback,
} from "../types/index.js";

/**
 * on, before and after event callback methods oriented on gamecontroller.js
 */
export class KeyboardService {
  protected _options: AccessibilityModuleOptions;
  public static instance?: KeyboardService;

  /** on / keydown events */
  protected _onEvents = new EventDispatcher("keyboard:keydown");
  /** before keydown events */
  protected _beforeEvents = new EventDispatcher("keyboard:before-keydown");
  /** after / keyup events */
  protected _afterEvents = new EventDispatcher("keyboard:keyup");

  public get options() {
    return this._options;
  }

  /**
   * Triggered the first cycle that a keyboard key is pressed.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public before(
    eventName: string,
    cb: KeyboardEventCallback,
    thisContext?: any
  ) {
    this._beforeEvents.on(eventName, cb, thisContext);
    return this;
  }

  /**
   * Triggered before the keyboard events are checked for pressed keys (before those events are triggered).
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public on(
    eventName: "beforeCycle",
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  /**
   * Triggered after the keyboard events are checked for pressed keys (after those events have been triggered).
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public on(
    eventName: "afterCycle",
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  /**
   * Triggered every cycle, while the keyboard key is pressed/active.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public on(
    eventName: KeyboardEventName,
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  /**
   * Triggered every cycle, while the keyboard key is pressed/active.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public on(
    eventName: "any",
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  /**
   * Triggered every cycle, while the keyboard key is pressed/active.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public on(eventName: string, cb: KeyboardEventCallback, thisContext?: any) {
    this._onEvents.on(eventName, cb, thisContext);
    return this;
  }

  /**
   * Triggered once the button/joystick is pressed/active.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public once(eventName: string, cb: KeyboardEventCallback, thisContext?: any) {
    this._onEvents.once(eventName, cb, thisContext);
    return this;
  }

  /**
   * Triggered the first cycle after a button/joystick stopped being pressed.
   * @param eventName
   * @param cb
   * @param thisContext
   * @returns
   */
  public after(
    eventName: string,
    cb: KeyboardEventCallback,
    thisContext?: any
  ) {
    this._afterEvents.once(eventName, cb, thisContext);
    return this;
  }

  public off(
    eventName: "beforeCycle",
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  public off(
    eventName: "afterCycle",
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  public off(
    eventName: KeyboardEventName,
    cb: KeyboardEventCallback,
    thisContext?: any
  ): KeyboardService;

  public off(
    eventName?: string,
    cb?: KeyboardEventCallback,
    thisContext?: any
  ) {
    this._beforeEvents.off(eventName, cb, thisContext);
    this._onEvents.off(eventName, cb, thisContext);
    this._afterEvents.off(eventName, cb, thisContext);
    return this;
  }

  protected constructor(options: AccessibilityModuleOptions = {}) {
    this._options = options;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.setEventListeners();
  }

  public static getSingleton() {
    if (this.instance) {
      return this.instance;
    }

    throw new Error(
      `Singleton of KeyboardService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(options: AccessibilityModuleOptions = {}) {
    if (this.instance) {
      throw new Error(`Singleton of KeyboardService already defined!`);
    }
    this.instance = new this(options);
    return this.instance;
  }

  protected getEventName(event: KeyboardEvent): KeyboardEventName {
    return (event.code || event.key) as KeyboardEventName;
  }

  protected getKeyData(eventName: KeyboardEventName): KeyboardKey {
    const keyData = KEYBOARD_KEYS.find(
      (key) => key.code === eventName || key.key === eventName
    );
    if (!keyData) {
      throw new Error(`No key data found for "${eventName}"!`);
    }
    return keyData;
  }

  protected setEventListeners(): void {
    /**
     * Event Listeners
     */
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keypress", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  protected handleKeyDown(event: KeyboardEvent) {
    const eventName = this.getEventName(event);
    const keyData = this.getKeyData(eventName);

    this._onEvents.trigger("beforeCycle", keyData, this, event);

    this._beforeEvents.trigger(eventName, keyData, this, event);
  }

  protected handleKeyPress(event: KeyboardEvent) {
    const eventName = this.getEventName(event);
    const keyData = this.getKeyData(eventName);
    this._onEvents.trigger("any", keyData, this, event);
    this._onEvents.trigger(eventName, keyData, this, event);
  }

  protected handleKeyUp(event: KeyboardEvent) {
    const eventName = this.getEventName(event);
    const keyData = this.getKeyData(eventName);

    this._afterEvents.trigger(eventName, keyData, this, event);

    this._onEvents.trigger("afterCycle", keyData, this, event);
  }
}
