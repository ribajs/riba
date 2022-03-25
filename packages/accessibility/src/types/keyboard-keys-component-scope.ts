import type { KeyboardKeysComponent } from "../components/keyboard-keys/keyboard-keys.component.js";
import type { InputButton, KeyboardLayoutKey } from "./index.js";

export interface KeyboardKeysComponentScope {
  layout: {
    default: string[][];
    shift: string[][];
  };
  controls:
    | {
        [eventName in KeyboardLayoutKey]: InputButton;
      }
    | Record<string, never>;
  /** Shorthand for all shift keys */
  shift: boolean;
  getButtonType: KeyboardKeysComponent["getButtonType"];
  getButtonClass: KeyboardKeysComponent["getButtonClass"];
  getKeyLabel: KeyboardKeysComponent["getKeyLabel"];
  onKeyClick: KeyboardKeysComponent["onKeyClick"];
}
