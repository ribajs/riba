import { Placement } from "./placement";
import { TooltipOptions } from "./tooltip-options";

export interface PopoverOptions extends TooltipOptions {
  placement: Placement;
  trigger: "click" | "mouseover" | string;
  content: string;
  template: string;
}
