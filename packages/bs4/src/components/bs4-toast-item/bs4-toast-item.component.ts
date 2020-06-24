import { Component } from "@ribajs/core";

import template from "./bs4-toast-item.component.html";
import { Toast } from "../../interfaces";
import { ToastService } from "../../services";

interface Scope {
  iconUrl?: string;
  toast?: Toast;
}

export class Bs4ToastItemComponent extends Component {
  public static tagName = "bs4-toast-item";

  public _debug = true;
  protected autobind = true;

  static get observedAttributes() {
    return ["toast", "icon-url"];
  }

  protected scope: Scope = {};

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastItemComponent.observedAttributes);
  }

  protected async afterBind() {
    super.afterBind();
    //construct toast service
    const toast = this.scope.toast;
    const toastEl = this.el.firstElementChild as HTMLElement | null;
    if (toast && toastEl) {
      const toastService: ToastService = new ToastService(toastEl, {
        delay: toast.delay ? toast.delay : ToastService.Default.delay,
        autohide: toast.autoHide
          ? toast.autoHide
          : ToastService.Default.autohide,
        animation: toast.animation
          ? toast.animation
          : ToastService.Default.animation,
      });

      //show toast using the toastservice
      toastService.show();

      //remove toast from dom once shown
      toastEl.addEventListener("hidden.bs.toast", () => {
        //todo notify parent that I don't want to be shown anymore
        console.log("removed element");
      });
    }
  }

  protected requiredAttributes() {
    return ["toast"];
  }

  protected template() {
    return template;
  }
}
