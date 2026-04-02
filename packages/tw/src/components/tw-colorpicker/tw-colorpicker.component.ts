import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./tw-colorpicker.component.html?raw";

interface Scope extends ScopeBase {
  /** The current color value in hex format */
  value: string;
  /** Optional label displayed above the picker */
  label: string;
  /** Callback when the color changes via the native input */
  onInput: TwColorpickerComponent["onInput"];
  /** Callback when the user confirms a color (change event) */
  onChange: TwColorpickerComponent["onChange"];
  /** Copy the current hex value to the clipboard */
  copyHex: TwColorpickerComponent["copyHex"];
  /** Whether the hex value was recently copied */
  copied: boolean;
}

/**
 * A simple color picker component using the native `<input type="color">`
 * enhanced with a visual preview swatch and a hex code display.
 */
export class TwColorpickerComponent extends Component {
  public static tagName = "tw-colorpicker";

  protected autobind = true;
  public _debug = false;

  static get observedAttributes(): string[] {
    return ["value", "label"];
  }

  public scope: Scope = {
    value: "#0088ff",
    label: "",
    onInput: this.onInput.bind(this),
    onChange: this.onChange.bind(this),
    copyHex: this.copyHex.bind(this),
    copied: false,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwColorpickerComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  /**
   * Fired continuously while the user drags the picker.
   */
  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.scope.value = input.value;
    this.dispatchEvent(
      new CustomEvent("color-input", {
        detail: { value: this.scope.value },
      }),
    );
  }

  /**
   * Fired when the user commits a color (closes the native picker).
   */
  public onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.scope.value = input.value;
    this.dispatchEvent(
      new CustomEvent("color-change", {
        detail: { value: this.scope.value },
      }),
    );
  }

  /**
   * Copy the current hex color to the clipboard.
   */
  public async copyHex() {
    try {
      await navigator.clipboard.writeText(this.scope.value);
      this.scope.copied = true;
      setTimeout(() => {
        this.scope.copied = false;
      }, 2000);
    } catch (err) {
      console.warn("Failed to copy color to clipboard", err);
    }
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    }
    return template;
  }
}
