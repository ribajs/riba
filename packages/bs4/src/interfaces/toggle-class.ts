import type { Binder } from "@ribajs/core";
import type { EventDispatcher } from "@ribajs/events";

export interface Bs4ToggleClass extends Binder<boolean> {
  toggleButtonEvents: EventDispatcher | null;
  state: "removed" | "added";
  triggerState: () => void;
  onToggle: () => void;
  toggle: (el: HTMLButtonElement) => void;
  remove: (el: HTMLButtonElement) => void;
  add: (el: HTMLButtonElement) => void;
}
