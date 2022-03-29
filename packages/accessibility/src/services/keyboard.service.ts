import { AccessibilityModuleOptions, KeyboardLayout } from "../types/index.js";
import { EventDispatcher } from "@ribajs/events";
import { KEYBOARD_KEY_DESCS } from "../constants/keyboard-key-descs.js";
import * as layouts from "./layouts/index.js";
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

  protected _layouts = layouts;

  protected _releaseTime: { [keyCode: string]: number } = {};

  /** on / keydown events */
  protected _onEvents = new EventDispatcher("keyboard:keydown");
  /** before keydown events */
  protected _beforeEvents = new EventDispatcher("keyboard:before-keydown");
  /** after / keyup events */
  protected _afterEvents = new EventDispatcher("keyboard:keyup");

  public get layouts() {
    return this._layouts;
  }

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
    this._afterEvents.on(eventName, cb, thisContext);
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
      case "{printscreen}":
        output = "{prtscr}";
        break;
      case "{escape}":
        output = "{esc}";
        break;
    }

    return output as KeyboardLayoutKey;
  }

  public getKeyData(event: KeyboardEvent | KeyboardKeyDesc): KeyboardKeyData {
    return {
      eventName: this.getEventName(event),
      layoutKey: this.getLayoutKey(event),
      event,
    };
  }

  /**
   * This method can probably be deleted together with `printKeyboardTypeDesc`.
   */
  public getAllEventsNames() {
    const eventNames: KeyboardEventName[] = [];

    for (const desc of KEYBOARD_KEY_DESCS) {
      const keyData = this.getKeyData(desc);
      if (!eventNames.find((eventNames) => eventNames === keyData.eventName)) {
        eventNames.push(keyData.eventName);
      }
    }

    return eventNames;
  }

  public getLayoutKeysFromKeyDesc() {
    const layoutKeys = KEYBOARD_KEY_DESCS.map((desc) => {
      let layoutKey = this.getKeyData(desc).layoutKey;
      layoutKey = (
        layoutKey === "\\" ? "\\\\" : layoutKey
      ) as KeyboardLayoutKey;
      return layoutKey;
    });
    return layoutKeys;
  }

  public getLayoutKeys(layout: KeyboardLayout) {
    const layoutKeys: KeyboardLayoutKey[] = [];
    for (const row of [...layout.default, ...layout.shift]) {
      for (const key of row) {
        // WORKAROUND this unicode char seems to make problems
        if ((key as string) === "\u0651") {
          continue;
        }
        if (!layoutKeys.find((_key) => _key === key)) {
          layoutKeys.push(key);
        }
      }
    }
    return layoutKeys;
  }

  public getFunctionLayoutKeys() {
    const layoutKeys = this.getLayoutKeysFromKeyDesc();

    return layoutKeys.filter((key) => key.startsWith("{") && key.endsWith("}"));
  }

  /**
   * This method can probably be deleted together with `printKeyboardTypeDesc`.
   */
  public getAllLayoutKeys() {
    const layoutKeys = this.getLayoutKeysFromKeyDesc();

    for (const layoutName in this._layouts) {
      const layout = (this._layouts as any)[layoutName].layout;
      if (!layout) continue;
      const _layoutKeys = this.getLayoutKeys(layout);
      for (const key of _layoutKeys) {
        if (!layoutKeys.find((_key) => _key === key)) {
          layoutKeys.push(key);
        }
      }
    }

    return layoutKeys;
  }

  /**
   * Generates the type description for all possible layout key values.
   * This method can be deleted later when the interface is fixed.
   * @deprecated
   */
  protected printKeyboardTypeDesc() {
    const eventNames = this.getAllEventsNames();
    const layoutFnKeys = this.getFunctionLayoutKeys();

    const keyboardFnLayoutKeyDesc = `export type KeyboardLayoutFunctionKey = "${layoutFnKeys.join(
      '" | "'
    )}";`;

    const keyboardLayoutKeyDesc = `export type KeyboardLayoutKey = KeyboardLayoutFunctionKey | string;`;

    const keyboardEventNameDesc = `export type KeyboardEventName = "${eventNames.join(
      '" | "'
    )}";`;

    console.log(keyboardFnLayoutKeyDesc);
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
    this._releaseTime[event.code] = new Date().getTime();

    const keyData = this.getKeyData(event);

    this._afterEvents.trigger("any", keyData, this, event);
    this._afterEvents.trigger(keyData.eventName, keyData, this, event);

    this._onEvents.trigger("afterCycle", keyData, this, event);
  }
}
