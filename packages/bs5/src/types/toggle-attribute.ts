import type { Binder } from "@ribajs/core";
import type { EventDispatcher } from "@ribajs/events";

export interface Bs5ToggleAttribute extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: "removed" | "added";
  triggerState: () => void;
  onToggle: () => void;
  toggle: (el: HTMLElement) => void;
  remove: (el: HTMLElement) => void;
  add: (el: HTMLElement) => void;
}
