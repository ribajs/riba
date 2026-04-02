/**
 * Pure JS modal service — no Bootstrap dependency.
 *
 * Uses the native `<dialog>` element with focus trap and scroll lock.
 * Dispatches `tw.modal.show`, `tw.modal.shown`,
 * `tw.modal.hide`, `tw.modal.hidden` events on the element.
 */
export class ModalService {
  protected el: HTMLDialogElement;
  protected backdrop: HTMLElement | null = null;
  protected _isShown = false;
  protected onKeydown = this._onKeydown.bind(this);
  protected onBackdropClick = this._onBackdropClick.bind(this);

  constructor(
    el: HTMLDialogElement,
    options: { backdrop?: boolean; keyboard?: boolean } = {},
  ) {
    this.el = el;
    this.el.addEventListener("keydown", this.onKeydown);

    if (options.backdrop !== false) {
      this.el.addEventListener("click", this.onBackdropClick);
    }
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.modal.show"));

    // Lock scroll
    document.body.style.overflow = "hidden";

    this.el.showModal();
    this._isShown = true;

    this.el.dispatchEvent(new CustomEvent("tw.modal.shown"));
  }

  hide() {
    if (!this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("tw.modal.hide"));

    this.el.close();
    document.body.style.overflow = "";
    this._isShown = false;

    this.el.dispatchEvent(new CustomEvent("tw.modal.hidden"));
  }

  toggle() {
    if (this._isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  protected _onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && this._isShown) {
      event.preventDefault();
      this.hide();
    }
  }

  /**
   * Close when clicking the dialog backdrop (the ::backdrop pseudo-element).
   * A click on the dialog itself (not its children) means the backdrop was clicked.
   */
  protected _onBackdropClick(event: MouseEvent) {
    if (event.target === this.el) {
      this.hide();
    }
  }

  dispose() {
    this.el.removeEventListener("keydown", this.onKeydown);
    this.el.removeEventListener("click", this.onBackdropClick);
    if (this._isShown) {
      this.hide();
    }
  }
}
