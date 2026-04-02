/**
 * Pure JS toast service — auto-dismiss with CSS transitions.
 *
 * Dispatches `tw.toast.show`, `tw.toast.shown`,
 * `tw.toast.hide`, `tw.toast.hidden` events on the element.
 */
export class ToastService {
  protected el: HTMLElement;
  protected _isShown = false;
  protected autoDismissTimeout?: ReturnType<typeof setTimeout>;
  protected autoDismissDelay: number;

  constructor(
    el: HTMLElement,
    options: { autoDismiss?: number; show?: boolean } = {},
  ) {
    this.el = el;
    this.autoDismissDelay = options.autoDismiss ?? 5000;

    if (options.show) {
      this.show();
    }
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.toast.show"));
    this.el.classList.remove("hidden");
    this.el.classList.add("animate-fade-in");
    this._isShown = true;

    this.el.dispatchEvent(new CustomEvent("tw.toast.shown"));

    if (this.autoDismissDelay > 0) {
      this.autoDismissTimeout = setTimeout(() => {
        this.hide();
      }, this.autoDismissDelay);
    }
  }

  hide() {
    if (!this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.toast.hide"));
    this.clearAutoDismiss();

    this.el.classList.add("animate-fade-out");

    const onEnd = () => {
      this.el.classList.add("hidden");
      this.el.classList.remove("animate-fade-in", "animate-fade-out");
      this._isShown = false;
      this.el.dispatchEvent(new CustomEvent("tw.toast.hidden"));
      this.el.removeEventListener("animationend", onEnd);
    };

    this.el.addEventListener("animationend", onEnd, { once: true });

    // Fallback if no animation is defined
    setTimeout(() => {
      if (this._isShown) {
        onEnd();
      }
    }, 500);
  }

  protected clearAutoDismiss() {
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
      this.autoDismissTimeout = undefined;
    }
  }

  dispose() {
    this.clearAutoDismiss();
    if (this._isShown) {
      this.el.classList.add("hidden");
      this._isShown = false;
    }
  }
}
