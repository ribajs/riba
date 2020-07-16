const CLASS_NAME_SHOW = "show";

export class ModalService {
  protected _element: HTMLElement;

  constructor(element: HTMLElement) {
    this._element = element;
  }

  public show() {
    this._element.classList.add(CLASS_NAME_SHOW);
  }

  public hide() {
    this.dispose();
  }

  public dispose() {
    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
  }
}

export default ModalService;
