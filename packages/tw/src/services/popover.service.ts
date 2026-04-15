import {
  computePosition,
  flip,
  shift,
  offset,
  arrow as arrowMiddleware,
  autoUpdate,
  type Placement,
} from "@floating-ui/dom";

/**
 * Pure JS popover service — uses Floating UI for positioning.
 *
 * Dispatches `tw.popover.show`, `tw.popover.shown`,
 * `tw.popover.hide`, `tw.popover.hidden` events on the trigger element.
 */
export class PopoverService {
  protected trigger: HTMLElement;
  protected popoverEl: HTMLElement;
  protected arrowEl: HTMLElement | null = null;
  protected placement: Placement;
  protected _isShown = false;
  protected cleanup?: () => void;
  protected abortController = new AbortController();
  protected onDocumentClick = this._onDocumentClick.bind(this);

  constructor(
    trigger: HTMLElement,
    popoverEl: HTMLElement,
    options: {
      placement?: Placement;
      arrow?: boolean;
    } = {},
  ) {
    this.trigger = trigger;
    this.popoverEl = popoverEl;
    this.placement = options.placement || "top";

    if (options.arrow !== false) {
      this.arrowEl = this.popoverEl.querySelector("[data-tw-arrow]");
    }

    this.popoverEl.style.display = "none";
    this.popoverEl.classList.add(
      "absolute",
      "z-50",
      "opacity-0",
      "transition-opacity",
      "duration-150",
    );

    this.trigger.addEventListener("click", () => this.toggle(), {
      signal: this.abortController.signal,
    });
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.trigger.dispatchEvent(new CustomEvent("tw.popover.show"));
    this.popoverEl.style.display = "";

    const middleware = [offset(8), flip(), shift({ padding: 8 })];
    if (this.arrowEl) {
      middleware.push(arrowMiddleware({ element: this.arrowEl }));
    }

    this.cleanup = autoUpdate(this.trigger, this.popoverEl, () => {
      computePosition(this.trigger, this.popoverEl, {
        placement: this.placement,
        middleware,
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.popoverEl.style, {
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
    });

    this._isShown = true;

    requestAnimationFrame(() => {
      this.popoverEl.classList.remove("opacity-0");
      this.popoverEl.classList.add("opacity-100");
    });

    document.addEventListener("click", this.onDocumentClick, true);

    this.trigger.dispatchEvent(new CustomEvent("tw.popover.shown"));
  }

  hide() {
    if (!this._isShown) return;

    this.trigger.dispatchEvent(new CustomEvent("tw.popover.hide"));

    this.popoverEl.classList.remove("opacity-100");
    this.popoverEl.classList.add("opacity-0");

    setTimeout(() => {
      this.popoverEl.style.display = "none";
      this.cleanup?.();
      this.cleanup = undefined;
      this._isShown = false;
      document.removeEventListener("click", this.onDocumentClick, true);
      this.trigger.dispatchEvent(new CustomEvent("tw.popover.hidden"));
    }, 150);
  }

  toggle() {
    if (this._isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  protected _onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    if (!this.trigger.contains(target) && !this.popoverEl.contains(target)) {
      this.hide();
    }
  }

  dispose() {
    this.hide();
    this.cleanup?.();
    this.abortController.abort();
  }
}
