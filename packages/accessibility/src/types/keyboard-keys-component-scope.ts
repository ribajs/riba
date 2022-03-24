import type { KeyboardKeysComponent } from "../components/keyboard-keys/keyboard-keys.component.js";
import type { KeyboardEventName } from "./keyboard-event-name.js";
import type { InputButton } from "./input-button";

export interface KeyboardKeysComponentScope {
  layout: {
    default: string[][];
    shift: string[][];
  };
  controls:
    | {
        [eventName in KeyboardEventName]: InputButton;
      }
    | Record<string, never>;
  getButtonType: KeyboardKeysComponent["getButtonType"];
  getButtonClass: KeyboardKeysComponent["getButtonClass"];
  getKeyLabel: KeyboardKeysComponent["getKeyLabel"];
}
