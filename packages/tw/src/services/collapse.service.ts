/**
 * Pure JS collapse service — no Bootstrap dependency.
 *
 * Uses CSS `max-height` + `overflow: hidden` transitions.
 * Dispatches `tw.collapse.show`, `tw.collapse.shown`,
 * `tw.collapse.hide`, `tw.collapse.hidden` events on the element.
 */
export class CollapseService {
  protected el: HTMLElement;
  protected _isShown: boolean;
  protected transitionDuration: number;

  constructor(el: HTMLElement, options: { show?: boolean } = {}) {
    this.el = el;
    this.transitionDuration =
      parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 300;
    this._isShown = options.show ?? !el.classList.contains("hidden");

    // Initialize state
    if (!this._isShown) {
      el.style.maxHeight = "0";
      el.style.overflow = "hidden";
      el.classList.add("hidden");
    }
  }

  get isShown() {
    return this._isShown;
  }

  get isCollapsed() {
    return !this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.collapse.show"));
    this.el.classList.remove("hidden");
    this.el.style.overflow = "hidden";

    // Measure full height
    this.el.style.maxHeight = "none";
    const fullHeight = this.el.scrollHeight;
    this.el.style.maxHeight = "0";

    // Force reflow
    void this.el.offsetHeight;

    this.el.style.maxHeight = `${fullHeight}px`;
    this._isShown = true;

    setTimeout(() => {
      this.el.style.maxHeight = "none";
      this.el.style.overflow = "";
      this.el.dispatchEvent(new CustomEvent("tw.collapse.shown"));
    }, this.transitionDuration);
  }

  hide() {
    if (!this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.collapse.hide"));

    // Set explicit height so transition works
    this.el.style.maxHeight = `${this.el.scrollHeight}px`;
    this.el.style.overflow = "hidden";

    // Force reflow
    void this.el.offsetHeight;

    this.el.style.maxHeight = "0";
    this._isShown = false;

    setTimeout(() => {
      this.el.classList.add("hidden");
      this.el.dispatchEvent(new CustomEvent("tw.collapse.hidden"));
    }, this.transitionDuration);
  }

  toggle() {
    if (this._isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  dispose() {
    this.el.style.maxHeight = "";
    this.el.style.overflow = "";
  }
}
