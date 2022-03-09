import type { Binder } from "@ribajs/core/src/index.js";
import type { CollapseService } from "../services/collapse.service.js";

export interface Bs4CollapseOnEventBinder extends Binder<boolean> {
  onEvent: (event: Event) => void;
  collapseServices: CollapseService[];
  targets: NodeListOf<HTMLElement>;
}
