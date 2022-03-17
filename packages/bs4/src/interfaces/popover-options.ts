import { Placement } from "./placement.js";
import { TooltipOptions } from "./tooltip-options.js";

export interface PopoverOptions extends TooltipOptions {
  placement: Placement;
  trigger: "click" | "mouseover" | string;
  content: string;
  template: string;
}
