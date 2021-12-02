import Popper from "popper.js";
import { Binder } from "@ribajs/core";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/tooltips/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/tooltip.js
 */

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
export class TooltipBinder extends Binder<string, HTMLInputElement> {
  static key = "bs4-tooltip";

  private popper?: Popper;

  private tip = template.cloneNode(true) as HTMLElement;

  private _show() {
    const placement = (this.el.dataset.placement || "top") as
      | "auto"
      | "top"
      | "right"
      | "bottom"
      | "left";
    const offset = 0;
    this.popper = new Popper(this.el, this.tip, {
      placement,
      modifiers: {
        offset: {
          offset,
        },
        flip: {
          behavior: "flip",
        },
        arrow: {
          element: ".arrow",
        },
        preventOverflow: {
          boundariesElement: "scrollParent",
        },
      },
    });
    document.body.appendChild(this.tip);
    this.tip.classList.add("show");
    this.tip.classList.add("bs-tooltip-" + placement);
  }

  private show = this._show.bind(this);

  private _hide() {
    this.tip.classList.remove("show");
    if (this.popper) {
      this.popper.destroy();
    }
  }

  private hide = this._hide.bind(this);

  bind(el: HTMLUnknownElement) {
    el.addEventListener("mouseenter", this.show);
    el.addEventListener("mouseleave", this.hide);
  }

  routine(el: HTMLElement, text: string) {
    const innerEl = this.tip.querySelector(".tooltip-inner") as HTMLDivElement;
    innerEl.innerHTML = text;
  }

  unbind() {
    this.hide();
    this.el.removeEventListener("mouseenter", this.show);
    this.el.removeEventListener("mouseleave", this.hide);
  }
}
