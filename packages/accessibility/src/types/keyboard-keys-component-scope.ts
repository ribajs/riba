import type { KeyboardKeysComponent } from "../components/keyboard-keys/keyboard-keys.component.js";
import type {
  InputButton,
  KeyboardLayoutKey,
  KeyboardLayout,
} from "./index.js";

export interface KeyboardKeysComponentScope {
  layoutName: string;
  layout: KeyboardLayout;
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
  onScreenKeyDown: KeyboardKeysComponent["onScreenKeyDown"];
  onScreenKeyUp: KeyboardKeysComponent["onScreenKeyUp"];
  setLayout: KeyboardKeysComponent["setLayout"];
}
