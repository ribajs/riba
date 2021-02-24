import { Tooltip } from "bootstrap";

/**
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/tooltip.js
 */
export class TooltipService extends Tooltip {
  // TODO this is a static getter of Tooltip
  static get Default() {
    return {
      animation: true,
      template:
        '<div class="tooltip" role="tooltip">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="tooltip-inner"></div>' +
        "</div>",
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: false,
      selector: false,
      placement: "top",
      offset: [0, 0],
      container: false,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      boundary: "clippingParents",
      customClass: "",
      sanitize: true,
      sanitizeFn: null,
      // allowList: DefaultAllowlist,
      popperConfig: null,
    };
  }
}
