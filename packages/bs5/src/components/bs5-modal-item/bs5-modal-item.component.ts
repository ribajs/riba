import { Component, TemplateFunction } from "@ribajs/core";

import template from "./bs5-modal-item.component.html";
import { getElementFromEvent } from "@ribajs/utils/src/dom.js";
import { Modal, ModalNotification } from "../../services/index.js";
import { Scope as Bs5NotificationContainerScope } from "../bs5-notification-container/bs5-notification-container.component.js";

interface Scope {
  iconUrl?: string;
  modal?: ModalNotification;
  onHidden: Bs5ModalItemComponent["onHidden"];
  dismiss: Bs5ModalItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs5ModalItemComponent extends Component {
  public static tagName = "bs5-modal-item";

  public _debug = false;
  protected autobind = true;

  protected modalService?: Modal;

  static get observedAttributes(): string[] {
    return ["modal", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["modal"];
  }

  public scope: Scope = {
    onHidden: this.onHidden.bind(this),
    index: -1,
    dismiss: this.dismiss.bind(this)
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ModalItemComponent.observedAttributes);
  }

  protected async afterBind() {
    this.initModal();
    await super.afterBind();
  }

  protected initModal() {
    const modal = this.scope.modal;
    const modalEl = this.firstElementChild as HTMLElement | null;
    if (modal && modalEl) {
      this.modalService = new Modal(modalEl, {
        focus: modal.focus !== undefined ? modal.focus : true,
        keyboard: modal.keyboard !== undefined ? modal.keyboard : true,
        backdrop: modal.backdrop !== undefined ? modal.backdrop : true
      });

      // Call onHidden on hidden event once
      modalEl.addEventListener(Modal.EVENT_HIDDEN, this.scope.onHidden, {
        once: true
      });

      // show modal using the modal service
      this.modalService.show();
    }
  }

  // Can be called if modal should be removed
  public dismiss() {
    this.modalService?.hide();
  }

  // Remove modal from dom once shown
  public onHidden(event: Event, el?: HTMLElement) {
    if (!el) {
      el = getElementFromEvent(event);
    }
    const notificationContainer: Bs5NotificationContainerScope | null =
      this.scope.$parent?.$parent || null;
    if (
      typeof notificationContainer?.onItemHide === "function" &&
      this.scope.modal &&
      el
    ) {
      notificationContainer.onItemHide(
        event,
        el,
        this.scope.index,
        this.scope.modal
      );
    }
  }
  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
