import { Binder, EventDispatcher } from "@ribajs/core";
import { ToastBinderData } from "@ribajs/bs4/src/interfaces";

export const showToastOnEventBinder: Binder<ToastBinderData> = {
  name: "show-toast-on-*",
  onEvent(event: CustomEvent) {
    console.debug("[show-toast-on-*] event.detail:", event.detail);
    const toastData: ToastBinderData = this.customData.toastData;
    const toastDispatcher = new EventDispatcher(toastData.channel || "toast");
    toastDispatcher.trigger("show-toast", toastData);
  },
  bind(el: HTMLUnknownElement) {
    this.customData = {};
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.binder.onEvent.bind(this));
  },
  routine(el: HTMLUnknownElement, toastData: ToastBinderData) {
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
