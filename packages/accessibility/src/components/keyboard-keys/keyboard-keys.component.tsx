import { Component, TemplateFunction } from "@ribajs/core";
import { KeyboardService } from "../../services/keyboard.service.js";
import {
  KeyboardKeysComponentScope,
  KeyboardLayoutKey,
} from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";
import {
  KEYBOARD_LAYOUT_DEFAULT,
  KEYBOARD_LAYOUT_SHIFT,
  KEYBOARD_LAYOUT_LABELS_DEFAULT,
} from "../../constants/index.js";

export class KeyboardKeysComponent extends Component {
  public static tagName = "a11y-keyboard-keys";
  protected keyboard = KeyboardService.getSingleton();

  static get observedAttributes() {
    return [];
  }

  public scope: KeyboardKeysComponentScope = {
    layout: {
      default: [],
      shift: [],
    },
    controls: {},
    shift: false,
    getButtonType: this.getButtonType,
    getButtonClass: this.getButtonClass,
    getKeyLabel: this.getKeyLabel,
    onKeyClick: this.onKeyClick,
  };

  constructor() {
    super();
    this.initScope();
  }

  protected initScope() {
    for (const row of KEYBOARD_LAYOUT_DEFAULT) {
      this.scope.layout.default.push(row);
    }
    for (const row of KEYBOARD_LAYOUT_SHIFT) {
      this.scope.layout.shift.push(row);
    }

    const keyData = this.keyboard.getAllKeyData();

    for (const key of keyData) {
      this.scope.controls[key.layoutKey] = {
        active: false,
      };
    }
  }

  /**
   * Retrieve button type
   *
   * @param  {string} layoutKey The button's layout name
   * @return {string} The button type
   */
  public getButtonType(layoutKey: KeyboardLayoutKey): string {
    return layoutKey.includes("{") && layoutKey.includes("}")
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

  public onKeyClick(layoutKey: KeyboardLayoutKey) {
    console.debug("TODO: " + layoutKey);
    this.scope.controls[layoutKey].active = true;
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

  protected async afterBind() {
    this.keyboard
      .on("any", (keyData) => {
        this.scope.controls[keyData.layoutKey].active = true;
        this.setShift();
        console.debug(
          `On press "${keyData.layoutKey}"...`,
          keyData,
          this.scope.controls[keyData.layoutKey]
        );
      })
      .after("any", (keyData) => {
        this.scope.controls[keyData.layoutKey].active = false;
        this.setShift();
        console.debug(
          `After press "${keyData.layoutKey}"`,
          keyData,
          this.scope.controls[keyData.layoutKey]
        );
      });
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return (
        <div class="simple-keyboard hg-theme-default hg-layout-default">
          <div class="hg-rows">
            <div rv-hide="shift" rv-each-row="layout.default" class="hg-row">
              <div
                rv-each-key="row"
                class="hg-button"
                rv-add-class="getButtonClass | call key"
                rv-data-skbtn="key"
                rv-text="getKeyLabel | call key"
                rv-on-click="onKeyClick | args key"
              ></div>
            </div>
            <div rv-show="shift" rv-each-row="layout.shift" class="hg-row">
              <div
                rv-each-key="row"
                class="hg-button"
                rv-add-class="getButtonClass | call key"
                rv-data-skbtn="key"
                rv-text="getKeyLabel | call key"
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
