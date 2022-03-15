import { Component, TemplateFunction } from "@ribajs/core/src/index.js";

import template from "./bs4-toast-item.component.html";
import { Toast } from "../../interfaces";
import { ToastService, EVENT_HIDDEN } from "../../services/toast.service.js";
import { Scope as Bs4NotificationContainerScope } from "../bs4-notification-container/bs4-notification-container.component.js";
import { getElementFromEvent } from "@ribajs/utils/src/dom.js";

interface Scope {
  iconUrl?: string;
  toast?: Toast;
  onHidden: Bs4ToastItemComponent["onHidden"];
  dismiss: Bs4ToastItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

export class Bs4ToastItemComponent extends Component {
  public static tagName = "bs4-toast-item";

  public _debug = false;
  protected autobind = true;

  protected toastService?: ToastService;

  static get observedAttributes(): string[] {
    return ["toast", "icon-url", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["toast"];
  }

  public scope: Scope = {
    onHidden: this.onHidden.bind(this),
    index: -1,
    dismiss: this.dismiss.bind(this),
    toast: undefined
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastItemComponent.observedAttributes);
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
        delay:
          toast.delay !== undefined ? toast.delay : ToastService.Default.delay,
        autohide:
          toast.autoHide !== undefined
            ? toast.autoHide
            : ToastService.Default.autohide,
        animation:
          toast.animation !== undefined
            ? toast.animation
            : ToastService.Default.animation
      });

      // Call onHidden on hidden event once
      toastEl.addEventListener(EVENT_HIDDEN, this.scope.onHidden, {
        once: true
      });

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
    const toastContainer: Bs4NotificationContainerScope | null =
      this.scope.$parent?.$parent || null;
    if (
      typeof toastContainer?.onItemHide === "function" &&
      this.scope.toast &&
      el
    ) {
      toastContainer.onItemHide(event, el, this.scope.index, this.scope.toast);
    }
  }
  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
