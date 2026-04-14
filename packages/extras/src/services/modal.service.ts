/**
 * Framework-agnostic modal service.
 *
 * Uses the native `<dialog>` element with scroll lock + optional backdrop-click
 * to close. Dispatches `modal.show`, `modal.shown`, `modal.hide`, `modal.hidden`
 * events on the element.
 */
export class ModalService {
  protected el: HTMLDialogElement;
  protected backdrop: HTMLElement | null = null;
  protected _isShown = false;
  protected abortController = new AbortController();

  constructor(
    el: HTMLDialogElement,
    options: { backdrop?: boolean; keyboard?: boolean } = {},
  ) {
    this.el = el;
    const signal = this.abortController.signal;

    this.el.addEventListener("keydown", this._onKeydown, { signal });

    if (options.backdrop !== false) {
      this.el.addEventListener("click", this._onBackdropClick, { signal });
    }
  }

  get isShown() {
    return this._isShown;
  }

  show() {
    if (this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("modal.show"));

    document.body.style.overflow = "hidden";

    this.el.showModal();
    this._isShown = true;

    this.el.dispatchEvent(new CustomEvent("modal.shown"));
  }

  hide() {
    if (!this._isShown) return;

    this.el.dispatchEvent(new CustomEvent("modal.hide"));

    this.el.close();
    document.body.style.overflow = "";
    this._isShown = false;

    this.el.dispatchEvent(new CustomEvent("modal.hidden"));
  }

  toggle() {
    if (this._isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  private _onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this._isShown) {
      event.preventDefault();
      this.hide();
    }
  };

  /**
   * Close when clicking the dialog backdrop (the ::backdrop pseudo-element).
   * A click on the dialog itself (not its children) means the backdrop was clicked.
   */
  private _onBackdropClick = (event: MouseEvent) => {
    if (event.target === this.el) {
      this.hide();
    }
  };

  dispose() {
    this.abortController.abort();
    if (this._isShown) {
      this.hide();
    }
  }
}
