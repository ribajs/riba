import { Component, TemplateFunction } from "@ribajs/core";
import { KeyboardService } from "../../services/keyboard.service.js";
import {
  KeyboardKeysComponentScope,
  KeyboardEventName,
} from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";
import {
  KEYBOARD_KEYS,
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
    getButtonType: this.getButtonType,
    getButtonClass: this.getButtonClass,
    getKeyLabel: this.getKeyLabel,
  };

  constructor() {
    super();
    this.initScope();
  }

  protected initScope() {
    for (const row of KEYBOARD_LAYOUT_DEFAULT) {
      this.scope.layout.default.push(row.split(" "));
    }
    for (const row of KEYBOARD_LAYOUT_SHIFT) {
      this.scope.layout.shift.push(row.split(" "));
    }

    for (const key of KEYBOARD_KEYS) {
      const eventName = (key.code || key.key) as KeyboardEventName;
      this.scope.controls[eventName] = {
        active: false,
      };
    }
  }

  /**
   * Retrieve button type
   *
   * @param  {string} button The button's layout name
   * @return {string} The button type
   */
  public getButtonType(button: string): string {
    return button.includes("{") && button.includes("}") && button !== "{//}"
      ? "functionBtn"
      : "standardBtn";
  }

  /**
   * Adds default classes to a given button
   *
   * @param  {string} button The button's layout name
   * @return {string} The classes to be added to the button
   */
  public getButtonClass(button: string): string {
    const buttonTypeClass = this.getButtonType(button);
    const buttonWithoutBraces = button.replace("{", "").replace("}", "");
    let buttonNormalized = "";

    if (buttonTypeClass !== "standardBtn")
      buttonNormalized = ` hg-button-${buttonWithoutBraces}`;

    console.debug(
      "getButtonClass",
      button,
      `hg-${buttonTypeClass}${buttonNormalized}`
    );

    return `hg-${buttonTypeClass}${buttonNormalized}`;
  }

  /**
   * Returns the display (label) name for a given button
   *
   * @param  {string} button The button's layout name
   */
  public getKeyLabel(button: string) {
    return (KEYBOARD_LAYOUT_LABELS_DEFAULT as any)[button] || button;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(KeyboardKeysComponent.observedAttributes);
  }

  protected async afterBind() {
    this.keyboard
      .on("any", (keyData) => {
        const eventName = (keyData.code || keyData.key) as KeyboardEventName;
        this.scope.controls[eventName].active = true;
        console.debug(`pressed "${keyData.name}" still pressed...`, keyData);
      })
      .on("beforeCycle", (keyData) => {
        console.debug(`Key "${keyData.name}" pressed...`, keyData);
        const buttons: KeyboardEventName[] = Object.keys(
          this.scope.controls
        ) as Array<keyof KeyboardKeysComponentScope["controls"]>;
        for (const button of buttons) {
          this.scope.controls[button].active = false;
        }
      })
      .on("afterCycle", (keyData) => {
        console.debug(`Key "${keyData.name}" was released`, keyData);
        const buttons: KeyboardEventName[] = Object.keys(
          this.scope.controls
        ) as Array<keyof KeyboardKeysComponentScope["controls"]>;
        for (const button of buttons) {
          this.scope.controls[button].active = false;
        }
      });
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return (
        <div class="simple-keyboard hg-theme-default hg-layout-default">
          <div class="hg-rows">
            <div rv-each-row="layout.default" class="hg-row">
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
