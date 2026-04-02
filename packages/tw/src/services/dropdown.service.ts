import {
  computePosition,
  flip,
  shift,
  offset,
  autoUpdate,
  type Placement,
} from "@floating-ui/dom";

/**
 * Pure JS dropdown service — uses Floating UI for positioning.
 *
 * Dispatches `tw.dropdown.show`, `tw.dropdown.shown`,
 * `tw.dropdown.hide`, `tw.dropdown.hidden` events on the trigger element.
 */
export class DropdownService {
  protected trigger: HTMLElement;
  protected menu: HTMLElement;
  protected _isShown = false;
  protected placement: Placement;
  protected cleanup?: () => void;
  protected onDocumentClick = this._onDocumentClick.bind(this);
  protected onKeydown = this._onKeydown.bind(this);

  constructor(
    trigger: HTMLElement,
    menu: HTMLElement,
    options: { placement?: Placement } = {},
  ) {
    this.trigger = trigger;
    this.menu = menu;
    this.placement = options.placement || "bottom-start";

    // Initially hidden
    this.menu.style.display = "none";

    this.trigger.addEventListener("click", () => this.toggle());
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.trigger.dispatchEvent(new CustomEvent("tw.dropdown.show"));
    this.menu.style.display = "";

    // Position with Floating UI
    this.cleanup = autoUpdate(this.trigger, this.menu, () => {
      computePosition(this.trigger, this.menu, {
        placement: this.placement,
        middleware: [offset(4), flip(), shift({ padding: 8 })],
      }).then(({ x, y }) => {
        Object.assign(this.menu.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });

    this._isShown = true;

    // Close on outside click / keyboard
    document.addEventListener("click", this.onDocumentClick, true);
    document.addEventListener("keydown", this.onKeydown);

    this.trigger.dispatchEvent(new CustomEvent("tw.dropdown.shown"));
  }

  hide() {
    if (!this._isShown) return;

    this.trigger.dispatchEvent(new CustomEvent("tw.dropdown.hide"));

    this.menu.style.display = "none";
    this.cleanup?.();
    this.cleanup = undefined;
    this._isShown = false;

    document.removeEventListener("click", this.onDocumentClick, true);
    document.removeEventListener("keydown", this.onKeydown);

    this.trigger.dispatchEvent(new CustomEvent("tw.dropdown.hidden"));
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
    if (
      !this.trigger.contains(target) &&
      !this.menu.contains(target)
    ) {
      this.hide();
    }
  }

  protected _onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.hide();
      this.trigger.focus();
    }

    // Arrow key navigation within menu items
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const items = Array.from(
        this.menu.querySelectorAll<HTMLElement>(
          "[role='menuitem']:not([disabled]), a:not([disabled]), button:not([disabled])",
        ),
      );
      if (items.length === 0) return;

      const currentIndex = items.indexOf(
        document.activeElement as HTMLElement,
      );
      let nextIndex: number;
      if (event.key === "ArrowDown") {
        nextIndex =
          currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex =
          currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      }
      items[nextIndex].focus();
    }
  }

  dispose() {
    this.hide();
    this.cleanup?.();
  }
}
