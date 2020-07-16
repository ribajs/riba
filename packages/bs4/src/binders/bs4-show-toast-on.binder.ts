import { Binder, EventDispatcher } from "@ribajs/core";
import { Toast } from "@ribajs/bs4/src/interfaces";

export const showToastOnEventBinder: Binder<Toast> = {
  name: "show-toast-on-*",
  onEvent(event: CustomEvent) {
    console.debug("[show-toast-on-*] event.detail:", event.detail);
    this.customData.toastData.$event = event;
    this.customData.toastData.$context = this.view.models;
    console.debug(this.customData.toastData);
    const toastData: Toast = new Toast(this.customData.toastData);
    const toastDispatcher = new EventDispatcher(toastData.channel || "toast");
    toastDispatcher.trigger("show-notification", toastData);
  },
  bind(el: HTMLUnknownElement) {
    this.customData = {};
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.binder.onEvent.bind(this));
  },
  routine(el: HTMLUnknownElement, toastData: Toast) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.customData.toastData = toastData;
  },
  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.binder.onEvent.bind(this));
  },
};
