import type { KeyboardEventName } from "./keyboard-event-name.js";
import type { KeyboardLayoutKey } from "./keyboard-layout-key.js";

export interface KeyboardKeyData {
  eventName: KeyboardEventName;
  layoutKey: KeyboardLayoutKey;
}
