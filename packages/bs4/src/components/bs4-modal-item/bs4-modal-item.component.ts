import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

import template from "./bs4-modal-item.component.html";
import { Modal } from "../../interfaces";
import { getElementFromEvent } from "@ribajs/utils/src/dom.js";
import { ModalService, EVENT_HIDDEN } from "../../services/modal.service.js";
import { Scope as Bs4NotificationContainerScope } from "../bs4-notification-container/bs4-notification-container.component.js";

interface Scope {
  iconUrl?: string;
  modal?: Modal;
  onHidden: Bs4ModalItemComponent["onHidden"];
  dismiss: Bs4ModalItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs4ModalItemComponent extends Component {
  public static tagName = "bs4-modal-item";

  public _debug = false;
  protected autobind = true;

  protected modalService?: ModalService;

  static get observedAttributes(): string[] {
    return ["modal", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["modal"];
  }

  public scope: Scope = {
    onHidden: this.onHidden.bind(this),
    index: -1,
    dismiss: this.dismiss.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ModalItemComponent.observedAttributes);
  }

  protected async afterBind() {
    this.initModalService();
    await super.afterBind();
  }

  protected initModalService() {
    const modal = this.scope.modal;
    const modalEl = this.firstElementChild as HTMLElement | null;
    if (modal && modalEl) {
      this.modalService = new ModalService(modalEl, {
        focus:
          modal.focus !== undefined ? modal.focus : ModalService.Default.focus,
        keyboard:
          modal.keyboard !== undefined
            ? modal.keyboard
            : ModalService.Default.keyboard,
        backdrop:
          modal.backdrop !== undefined
            ? modal.backdrop
            : ModalService.Default.backdrop,
        show: modal.show !== undefined ? modal.show : ModalService.Default.show,
      });

      // Call onHidden on hidden event once
      modalEl.addEventListener(EVENT_HIDDEN, this.scope.onHidden, {
        once: true,
      });

      // show modal using the modalservice
      this.modalService.show(this);
    }
  }

  // Can be called if modal should be removed
  public dismiss(event?: Event) {
    this.modalService?.hide(event);
  }

  // Remove modal from dom once shown
  public onHidden(event: Event, el?: HTMLElement) {
    if (!el) {
      el = getElementFromEvent(event);
    }
    const notificationContainer: Bs4NotificationContainerScope | null =
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
