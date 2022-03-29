import { Component, TemplateFunction } from "@ribajs/core";
import { KeyboardService } from "../../services/keyboard.service.js";
import {
  KeyboardKeysComponentScope,
  KeyboardLayoutKey,
  KeyboardKeyData,
} from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";
import { KEYBOARD_LAYOUT_LABELS_DEFAULT } from "../../constants/index.js";

export class KeyboardKeysComponent extends Component {
  public static tagName = "a11y-keyboard-keys";
  protected keyboard = KeyboardService.getSingleton();

  static get observedAttributes() {
    return ["layout-name", "layout"];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );

    if (attributeName === "layoutName") {
      this.onLayoutNameChanged();
    }
  }

  protected onLayoutChanged() {
    // console.debug("onLayoutChanged", this.scope.layout);
  }

  protected onLayoutNameChanged() {
    if (!(this.keyboard.layouts as any)[this.scope.layoutName]) {
      console.error(`No layout with name "${this.scope.layoutName}" found"`);
      return false;
    }
    this.scope.layout = (this.keyboard.layouts as any)[
      this.scope.layoutName
    ].layout;

    this.onLayoutChanged();
  }

  public scope: KeyboardKeysComponentScope = {
    layoutName: "english",
    layout: this.keyboard.layouts.english.layout,
    controls: {},
    shift: false,
    getButtonType: this.getButtonType,
    getButtonClass: this.getButtonClass,
    getKeyLabel: this.getKeyLabel,
    onScreenKeyDown: this.onScreenKeyDown,
    onScreenKeyUp: this.onScreenKeyUp,
    setLayout: this.setLayout,
  };

  constructor() {
    super();
    this.initScope();
  }

  protected initScope() {
    const layoutKeys = this.keyboard.getAllLayoutKeys();

    for (const key of layoutKeys) {
      this.scope.controls[key] = {
        active: false,
      };
    }

    this.onLayoutChanged();
  }

  /**
   * Retrieve button type
   *
   * @param  {string} layoutKey The button's layout name
   * @return {string} The button type
   */
  public getButtonType(layoutKey: KeyboardLayoutKey): string {
    return layoutKey.startsWith("{") && layoutKey.endsWith("}")
      ? // layoutKey !== "{//}"
        "functionBtn"
      : "standardBtn";
  }

  /**
   * Adds default classes to a given button
   *
   * @param  {string} layoutKey The button's layout name
   * @return {string} The classes to be added to the button
   */
  public getButtonClass(layoutKey: KeyboardLayoutKey): string {
    const buttonTypeClass = this.getButtonType(layoutKey);
    const buttonWithoutBraces = layoutKey.replace("{", "").replace("}", "");
    let buttonNormalized = "";

    if (buttonTypeClass !== "standardBtn")
      buttonNormalized = ` hg-button-${buttonWithoutBraces}`;

    return `hg-${buttonTypeClass}${buttonNormalized}`;
  }

  /**
   * Returns the display (label) name for a given button
   *
   * @param  {string} layoutKey The button's layout name
   */
  public getKeyLabel(layoutKey: KeyboardLayoutKey) {
    return KEYBOARD_LAYOUT_LABELS_DEFAULT[layoutKey] || layoutKey;
  }

  public onScreenKeyDown(
    layoutKey: KeyboardLayoutKey
    // event: Event,
    // scope: KeyboardKeysComponentScope,
    // el: HTMLElement
  ) {
    console.debug("onScreenKeyDown: " + layoutKey);
    if (!this.scope.controls[layoutKey]) {
      this.scope.controls[layoutKey] = {
        active: false,
      };
    }
    this.scope.controls[layoutKey].active = true;
    this.onKeyboardChange();
  }

  public onScreenKeyUp(
    layoutKey: KeyboardLayoutKey
    // event: Event,
    // scope: KeyboardKeysComponentScope,
    // el: HTMLElement
  ) {
    console.debug("onScreenKeyUp: " + layoutKey);
    this.scope.controls[layoutKey].active = false;
    this.onKeyboardChange();
  }

  public setLayout(layoutName: string) {
    console.debug("setLayout: " + layoutName);
    this.scope.layoutName = layoutName;
    this.onLayoutNameChanged();
  }

  protected onKeyboardChange() {
    this.setShift();
  }

  protected setShift() {
    this.scope.shift =
      this.scope.controls["{sftl}"]?.active ||
      this.scope.controls["{sftr}"]?.active ||
      this.scope.controls["{capl}"]?.active;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(KeyboardKeysComponent.observedAttributes);
  }

  protected onAnyKey(keyData: KeyboardKeyData) {
    if (!this.scope.controls[keyData.layoutKey]) {
      this.scope.controls[keyData.layoutKey] = {
        active: false,
      };
      console.warn("Unknown key: ", keyData);
    }
    this.scope.controls[keyData.layoutKey].active = true;
    this.onKeyboardChange();
    console.debug(
      `On press "${keyData.layoutKey}"...`,
      keyData,
      this.scope.controls[keyData.layoutKey]
    );
  }

  protected afterAnyKey(keyData: KeyboardKeyData) {
    if (!this.scope.controls[keyData.layoutKey]) {
      this.scope.controls[keyData.layoutKey] = {
        active: false,
      };
      console.warn("Unknown key: ", keyData);
    }

    this.scope.controls[keyData.layoutKey].active = false;
    this.onKeyboardChange();
    console.debug(
      `After press "${keyData.layoutKey}"`,
      keyData,
      this.scope.controls[keyData.layoutKey]
    );
  }

  protected async afterBind() {
    this.keyboard
      .on("any", this.onAnyKey, this)
      .after("any", this.afterAnyKey, this);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return (
        <div class="simple-keyboard hg-theme-default hg-layout-default">
          <div class="hg-rows">
            <div rv-hide="shift" rv-each-row="layout.default" class="hg-row">
              <div
                rv-each-key="row"
                rv-assign-control="controls | get key"
                class="hg-button"
                rv-add-class="getButtonClass | call key"
                rv-class-active="control.active"
                rv-data-key="key"
                rv-text="getKeyLabel | call key"
                rv-on-mousedown="onScreenKeyDown | args key"
                rv-on-touchstart="onScreenKeyDown | args key"
                rv-on-mouseup="onScreenKeyUp | args key"
                rv-on-touchend="onScreenKeyUp | args key"
              ></div>
            </div>
            <div rv-show="shift" rv-each-row="layout.shift" class="hg-row">
              <div
                rv-each-key="row"
                rv-assign-control="controls | get key"
                class="hg-button"
                rv-add-class="getButtonClass | call key"
                rv-class-active="control.active"
                rv-data-key="key"
                rv-text="getKeyLabel | call key"
                rv-on-mousedown="onScreenKeyDown | args key"
                rv-on-touchstart="onScreenKeyDown | args key"
                rv-on-mouseup="onScreenKeyUp | args key"
                rv-on-touchend="onScreenKeyUp | args key"
              ></div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
