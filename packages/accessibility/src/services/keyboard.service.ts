import { AccessibilityModuleOptions } from "../types/index.js";
import { EventDispatcher } from "@ribajs/events";
import { KEYBOARD_KEY_DESCS } from "../constants/keyboard-key-descs.js";
import type {
  KeyboardEventName,
  KeyboardLayoutKey,
  KeyboardKeyDesc,
  KeyboardKeyData,
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
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.setEventListeners();

    this.printKeyboardTypeDesc();
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

  public getEventName(
    event: KeyboardEvent | KeyboardKeyDesc
  ): KeyboardEventName {
    return (event.code || event.key) as KeyboardEventName;
  }

  /**
   * Transforms a KeyboardEvent's "key.code" string into a simple-keyboard layout format
   * @param  {object} event The KeyboardEvent
   */
  public getLayoutKey(
    event: KeyboardEvent | KeyboardKeyDesc
  ): KeyboardLayoutKey {
    let output = "";
    const keyId = event.code || event.key;

    if (
      keyId?.includes("Numpad") ||
      keyId?.includes("Shift") ||
      keyId?.includes("Space") ||
      keyId?.includes("Backspace") ||
      keyId?.includes("Control") ||
      keyId?.includes("Alt") ||
      keyId?.includes("Meta")
    ) {
      output = event.code || "";
    } else {
      output = event.key || "";
    }

    output = output.length > 1 ? `{${output?.toLowerCase()}}` : output;

    switch (output) {
      case "{backspace}":
        output = "{bksp}";
        break;
      case "{shiftleft}":
        output = "{sftl}";
        break;
      case "{shiftright}":
        output = "{sftr}";
        break;
      case "{altleft}":
        output = "{altl}";
        break;
      case "{altright}":
        output = "{altr}";
        break;
      case "{capslock}":
        output = "{capl}";
        break;
    }

    return output as KeyboardLayoutKey;
  }

  public getKeyData(event: KeyboardEvent | KeyboardKeyDesc): KeyboardKeyData {
    return {
      eventName: this.getEventName(event),
      layoutKey: this.getLayoutKey(event),
    };
  }

  /**
   * This method can probably be deleted together with `printKeyboardTypeDesc`.
   */
  public getAllKeyData() {
    const keyData: KeyboardKeyData[] = [];
    for (const desc of KEYBOARD_KEY_DESCS) {
      keyData.push(this.getKeyData(desc));
    }
    return keyData;
  }

  /**
   * Generates the type description for all possible layout key values.
   * This method can be deleted later when the interface is fixed.
   * @deprecated
   */
  protected printKeyboardTypeDesc() {
    const keyData = this.getAllKeyData();
    const keyboardLayoutKeyDesc = `export type KeyboardLayoutKey = "${keyData
      .map((data) => (data.layoutKey === "\\" ? "\\\\" : data.layoutKey))
      .join('" | "')}";`;
    const keyboardEventNameDesc = `export type KeyboardEventName = "${keyData
      .map((data) => data.eventName)
      .join('" | "')}";`;

    console.log(keyboardLayoutKeyDesc);
    console.log(keyboardEventNameDesc);
  }

  /**
   * @deprecated
   * @param eventName
   * @returns
   */
  public getKeyDesc(eventName: KeyboardEventName): KeyboardKeyDesc {
    const keyDesc = KEYBOARD_KEY_DESCS.find(
      (key) => key.code === eventName || key.key === eventName
    );
    if (!keyDesc) {
      throw new Error(`No key data found for "${eventName}"!`);
    }
    return keyDesc;
  }

  protected setEventListeners(): void {
    /**
     * Event Listeners
     */
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  protected handleKeyDown(event: KeyboardEvent) {
    const keyData = this.getKeyData(event);

    this._onEvents.trigger("beforeCycle", keyData, this, event);
    this._beforeEvents.trigger("any", keyData, this, event);
    this._beforeEvents.trigger(keyData.eventName, keyData, this, event);

    this._onEvents.trigger("any", keyData, this, event);
    this._onEvents.trigger(keyData.eventName, keyData, this, event);
  }

  protected handleKeyUp(event: KeyboardEvent) {
    const keyData = this.getKeyData(event);

    this._afterEvents.trigger("any", keyData, this, event);
    this._afterEvents.trigger(keyData.eventName, keyData, this, event);

    this._onEvents.trigger("afterCycle", keyData, this, event);
  }
}
