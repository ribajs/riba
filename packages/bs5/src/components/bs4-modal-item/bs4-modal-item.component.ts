import { Component } from "@ribajs/core";

import template from "./bs4-modal-item.component.html";
import { Modal } from "../../interfaces";
import { getElementFromEvent } from "@ribajs/utils/src/dom";
import { ModalService } from "../../services/modal.service";
import { Scope as Bs4NotificationContainerScope } from "../bs4-notification-container/bs4-notification-container.component";

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

  static get observedAttributes() {
    return ["modal", "index"];
  }

  protected requiredAttributes() {
    return ["modal"];
  }

  protected scope: Scope = {
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
        focus: modal.focus !== undefined ? modal.focus : true,
        keyboard: modal.keyboard !== undefined ? modal.keyboard : true,
        backdrop: modal.backdrop !== undefined ? modal.backdrop : true,
      });

      // Call onHidden on hidden event once
      modalEl.addEventListener(
        ModalService.Events.hidden,
        this.scope.onHidden,
        {
          once: true,
        }
      );

      // show modal using the modalservice
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
  protected template() {
    return template;
  }
}
