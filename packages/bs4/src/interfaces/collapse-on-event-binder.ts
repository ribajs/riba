import type { Binder } from "@ribajs/core";
import type { CollapseService } from "../services/collapse.service";

export interface Bs4CollapseOnEventBinder extends Binder<boolean> {
  onEvent: (event: Event) => void;
  collapseServices: CollapseService[];
  targets: NodeListOf<HTMLElement>;
}
