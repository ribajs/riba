import { Component } from "@ribajs/core";

import template from "./bs5-toast-item.component.html";
import { Toast } from "../../interfaces";
import { ToastService } from "../../services/toast.service";
import { Scope as Bs5NotificationContainerScope } from "../bs5-notification-container/bs5-notification-container.component";
import { getElementFromEvent } from "@ribajs/utils/src/dom";

interface Scope {
  iconUrl?: string;
  toast?: Toast;
  onHidden: Bs5ToastItemComponent["onHidden"];
  dismiss: Bs5ToastItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs5ToastItemComponent extends Component {
  public static tagName = "bs5-toast-item";

  public _debug = false;
  protected autobind = true;

  protected toastService?: ToastService;

  static get observedAttributes() {
    return ["toast", "icon-url", "index"];
  }

  protected requiredAttributes() {
    return ["toast"];
  }

  protected scope: Scope = {
    onHidden: this.onHidden.bind(this),
    index: -1,
    dismiss: this.dismiss.bind(this),
    toast: undefined,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ToastItemComponent.observedAttributes);
  }

  protected async afterBind() {
    this.initToastService();
    await super.afterBind();
  }

  protected initToastService() {
    const toast = this.scope.toast;
    const toastEl = this.firstElementChild as HTMLElement | null;
    if (toast && toastEl) {
      this.toastService = new ToastService(toastEl, {
        delay: toast.delay !== undefined ? toast.delay : 5000,
        autohide: toast.autoHide !== undefined ? toast.autoHide : true,
        animation: toast.animation !== undefined ? toast.animation : true,
      });

      // Call onHidden on hidden event once
      toastEl.addEventListener(
        ToastService.Events.hidden,
        this.scope.onHidden,
        {
          once: true,
        }
      );

      // show toast using the toastservice
      this.toastService.show();
    }
  }

  // can be called if toast should be removed
  public dismiss() {
    this.toastService?.hide();
  }

  // remove toast from dom once shown
  public onHidden(event: Event, el?: HTMLElement) {
    if (!el) {
      el = getElementFromEvent(event);
    }
    const toastContainer: Bs5NotificationContainerScope | null =
      this.scope.$parent?.$parent || null;
    if (
      typeof toastContainer?.onItemHide === "function" &&
      this.scope.toast &&
      el
    ) {
      toastContainer.onItemHide(event, el, this.scope.index, this.scope.toast);
    }
  }
  protected template() {
    return template;
  }
}
