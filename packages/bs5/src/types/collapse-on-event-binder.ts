import type { Binder } from "@ribajs/core";
import type { Collapse } from "../services/collapse.js";

export interface Bs5CollapseOnEventBinder extends Binder<boolean> {
  onEvent: (event: Event) => void;
  collapseServices: Collapse[];
  targets: NodeListOf<HTMLElement>;
}
