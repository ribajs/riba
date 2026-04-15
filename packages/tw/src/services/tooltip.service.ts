import {
  computePosition,
  flip,
  shift,
  offset,
  arrow as arrowMiddleware,
  type Placement,
} from "@floating-ui/dom";

/**
 * Pure JS tooltip service — uses Floating UI for positioning.
 */
export class TooltipService {
  protected trigger: HTMLElement;
  protected tooltipEl: HTMLElement;
  protected arrowEl: HTMLElement | null = null;
  protected placement: Placement;
  protected _isShown = false;
  protected showDelay: number;
  protected hideDelay: number;
  protected showTimeout?: ReturnType<typeof setTimeout>;
  protected hideTimeout?: ReturnType<typeof setTimeout>;
  protected abortController = new AbortController();

  constructor(
    trigger: HTMLElement,
    options: {
      content?: string;
      placement?: Placement;
      showDelay?: number;
      hideDelay?: number;
    } = {},
  ) {
    this.trigger = trigger;
    this.placement = options.placement || "top";
    this.showDelay = options.showDelay ?? 0;
    this.hideDelay = options.hideDelay ?? 0;

    // Create tooltip element
    this.tooltipEl = document.createElement("div");
    this.tooltipEl.role = "tooltip";
    this.tooltipEl.className =
      "absolute z-50 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-gray-700 pointer-events-none opacity-0 transition-opacity duration-150";
    this.tooltipEl.textContent = options.content || "";

    // Create arrow
    this.arrowEl = document.createElement("div");
    this.arrowEl.className =
      "absolute h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700";
    this.tooltipEl.appendChild(this.arrowEl);

    this.tooltipEl.style.display = "none";
    document.body.appendChild(this.tooltipEl);

    const signal = this.abortController.signal;
    this.trigger.addEventListener("mouseenter", () => this.scheduleShow(), {
      signal,
    });
    this.trigger.addEventListener("mouseleave", () => this.scheduleHide(), {
      signal,
    });
    this.trigger.addEventListener("focus", () => this.scheduleShow(), {
      signal,
    });
    this.trigger.addEventListener("blur", () => this.scheduleHide(), {
      signal,
    });
  }

  get isShown() {
    return this._isShown;
  }

  set content(value: string) {
    // Preserve arrow element
    const textNode = this.tooltipEl.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = value;
    } else {
      this.tooltipEl.insertBefore(
        document.createTextNode(value),
        this.tooltipEl.firstChild,
      );
    }
  }

  protected scheduleShow() {
    this.clearTimeouts();
    this.showTimeout = setTimeout(() => this.show(), this.showDelay);
  }

  protected scheduleHide() {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => this.hide(), this.hideDelay);
  }

  protected clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  show() {
    if (this._isShown) return;

    this.tooltipEl.style.display = "";
    this._isShown = true;

    const middleware = [offset(8), flip(), shift({ padding: 8 })];
    if (this.arrowEl) {
      middleware.push(arrowMiddleware({ element: this.arrowEl }));
    }

    computePosition(this.trigger, this.tooltipEl, {
      placement: this.placement,
      middleware,
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(this.tooltipEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (this.arrowEl && middlewareData.arrow) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = placement.split("-")[0];
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[side] as string;

        Object.assign(this.arrowEl.style, {
          left: ax != null ? `${ax}px` : "",
          top: ay != null ? `${ay}px` : "",
          [staticSide]: "-4px",
        });
      }
    });

    // Fade in
    requestAnimationFrame(() => {
      this.tooltipEl.classList.remove("opacity-0");
      this.tooltipEl.classList.add("opacity-100");
    });
  }

  hide() {
    if (!this._isShown) return;

    this.tooltipEl.classList.remove("opacity-100");
    this.tooltipEl.classList.add("opacity-0");

    setTimeout(() => {
      this.tooltipEl.style.display = "none";
      this._isShown = false;
    }, 150);
  }

  dispose() {
    this.clearTimeouts();
    this.abortController.abort();
    this.tooltipEl.remove();
  }
}
