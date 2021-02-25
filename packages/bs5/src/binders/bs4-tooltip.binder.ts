import { createPopper, Options } from "@popperjs/core";

/**
 *
 * @see https://github.com/twbs/bootstrap/blob/main/js/src/tooltip.js
 */
import { Binder } from "@ribajs/core";

const template = document.createElement("div");
template.classList.add("tooltip");
template.setAttribute("role", "tooltip");

const arrow = document.createElement("div");
arrow.classList.add("arrow");
template.appendChild(arrow);

const inner = document.createElement("div");
inner.classList.add("tooltip-inner");
template.appendChild(inner);

/**
 *
 */
export const tooltipBinder: Binder<string> = {
  name: "bs5-tooltip",
  block: false,
  bind(el: HTMLUnknownElement) {
    // this.customData.$tip = $(template);
    this.customData.tip = template.cloneNode(true);
    this.customData.show = () => {
      const placement: Options["placement"] = (this.el.dataset.placement ||
        "top") as Options["placement"];

      const offset = 0;
      this.customData.popper = createPopper(el, this.customData.tip, {
        placement,
        modifiers: [
          {
            name: "flip",
            options: {
              altBoundary: true,
              // fallbackPlacements: this.config.fallbackPlacements
              behavior: "flip",
            },
          },
          {
            name: "offset",
            options: {
              offset: offset,
            },
          },
          {
            name: "arrow",
            options: {
              element: `.arrow`,
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundariesElement: "scrollParent",
            },
          },
        ],
        strategy: undefined,
      });
      document.body.appendChild(this.customData.tip);
      this.customData.tip.classList.add("show");
      this.customData.tip.classList.add("bs-tooltip-" + placement);
    };
    this.customData.hide = () => {
      this.customData.tip.classList.remove("show");
      if (this.customData.popper) {
        this.customData.popper.destroy();
      }
    };
    el.addEventListener("mouseenter", this.customData.show);
    el.addEventListener("mouseleave", this.customData.hide);
  },

  routine(el: HTMLElement, text: string) {
    const innerEl = this.customData.tip.querySelector(
      ".tooltip-inner"
    ) as HTMLDivElement;
    innerEl.innerHTML = text;
  },

  unbind() {
    this.customData.hide();
    this.el.removeEventListener("mouseenter", this.customData.show);
    this.el.removeEventListener("mouseleave", this.customData.hide);
  },
};
