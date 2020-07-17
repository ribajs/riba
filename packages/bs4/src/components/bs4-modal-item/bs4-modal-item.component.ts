import { Component } from "@ribajs/core";

import template from "./bs4-modal-item.component.html";
import { Modal } from "../../interfaces";
//import { ToastService } from "../../services";
import { Scope as Bs4NotificationContainerScope } from "../bs4-notification-container/bs4-notification-container.component";

interface Scope {
  iconUrl?: string;
  modal?: Modal;
  onHide: Bs4ModalItemComponent["onHide"];
  onDismiss: Bs4ModalItemComponent["onDismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs4ModalItemComponent extends Component {
  public static tagName = "bs4-modal-item";

  public _debug = false;
  protected autobind = true;

  //protected toastService?: ToastService;

  static get observedAttributes() {
    return ["modal", "index"];
  }

  protected requiredAttributes() {
    return ["modal"];
  }

  protected scope: Scope = {
    onHide: this.onHide,
    index: -1,
    onDismiss: this.onDismiss,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ModalItemComponent.observedAttributes);
  }

  protected async afterBind() {
    super.afterBind();
    // construct toast service
    const modal = this.scope.modal;
    const modalEl = this.el.firstElementChild as HTMLElement | null;
    if (modal && modalEl) {
      /*this.modalService = new modalService(modalEl, {
        delay: modal.delay ? modal.delay : modalService.Default.delay,
        autohide: modal.autoHide
          ? modal.autoHide
          : modalService.Default.autohide,
        animation: modal.animation
          ? modal.animation
          : modalService.Default.animation,
      });

      // show modal using the modalservice
      this.modalService.show();*/
    }
  }

  // can be called if toast should be removed
  public onDismiss() {
    //TODO
    //this.modalService?.hide();
  }

  // remove toast from dom once shown
  public onHide(event: Event, el: HTMLElement) {
    const notificationContainer: Bs4NotificationContainerScope | null =
      this.scope.$parent?.$parent || null;
    if (
      typeof notificationContainer?.onItemHide === "function" &&
      this.scope.modal
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
