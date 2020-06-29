import { Component } from "@ribajs/core";

import template from "./bs4-toast-item.component.html";
import { Toast, ToastBinderData } from "../../interfaces";
import { ToastService } from "../../services";
import { Scope as Bs4ToastContainerScope } from "../bs4-toast-container/bs4-toast-container.component";

interface Scope {
  iconUrl?: string;
  toast?: Toast | ToastBinderData;
  onHide: Bs4ToastItemComponent["onHide"];
  onDismiss: Bs4ToastItemComponent["onDismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs4ToastItemComponent extends Component {
  public static tagName = "bs4-toast-item";

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
    onHide: this.onHide,
    index: -1,
    onDismiss: this.onDismiss,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastItemComponent.observedAttributes);
  }

  protected async afterBind() {
    super.afterBind();
    // construct toast service
    const toast = this.scope.toast;
    const toastEl = this.el.firstElementChild as HTMLElement | null;
    if (toast && toastEl) {
      this.toastService = new ToastService(toastEl, {
        delay: toast.delay ? toast.delay : ToastService.Default.delay,
        autohide: toast.autoHide
          ? toast.autoHide
          : ToastService.Default.autohide,
        animation: toast.animation
          ? toast.animation
          : ToastService.Default.animation,
      });

      // show toast using the toastservice
      this.toastService.show();
    }
  }

  // can be called if toast should be removed
  public onDismiss() {
    this.toastService?.hide();
  }

  // remove toast from dom once shown
  public onHide(event: Event, el: HTMLElement) {
    const toastContainer: Bs4ToastContainerScope | null =
      this.scope.$parent?.$parent || null;
    if (
      typeof toastContainer?.onToastItemHide === "function" &&
      this.scope.toast
    ) {
      toastContainer.onToastItemHide(
        event,
        el,
        this.scope.index,
        this.scope.toast
      );
    }
  }
  protected template() {
    return template;
  }
}
