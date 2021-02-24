import { Popover } from "bootstrap";
import { TooltipService } from "./tooltip.service";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/popover.js
 */
export class PopoverService extends Popover {
  // TODO this is a static getter of Popover
  static get Default() {
    return {
      ...TooltipService.Default,
      placement: "right",
      offset: [0, 8],
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip">' +
        '<div class="popover-arrow"></div>' +
        '<h3 class="popover-header"></h3>' +
        '<div class="popover-body"></div>' +
        "</div>",
    };
  }
}
