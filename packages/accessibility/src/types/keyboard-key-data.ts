import type { KeyboardEventName } from "./keyboard-event-name.js";
import type { KeyboardLayoutKey } from "./keyboard-layout-key.js";
import type { KeyboardKeyDesc } from "./keyboard-key-desc.js";

export interface KeyboardKeyData {
  eventName: KeyboardEventName;
  layoutKey: KeyboardLayoutKey;
  event: KeyboardEvent | KeyboardKeyDesc;
}
