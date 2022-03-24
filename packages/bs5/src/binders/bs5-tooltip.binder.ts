import { createPopper, Options } from "@popperjs/core";
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
export class TooltipBinder extends Binder<string, HTMLElement> {
  static key = "bs5-tooltip";

  private popper?: ReturnType<typeof createPopper>;

  private tip = template.cloneNode(true) as HTMLElement;

  private _show() {
    const placement: Options["placement"] = (this.el.dataset.placement ||
      "start") as Options["placement"];

    const offset = 0;
    this.popper = createPopper(this.el, this.tip, {
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
