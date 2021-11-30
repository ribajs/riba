import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { Toast } from "@ribajs/bs4/src/interfaces";

export const showToastOnEventBinder: BinderDeprecated<Toast> = {
  name: "show-toast-on-*",
  bind(el: HTMLUnknownElement) {
    this.customData = {
      onEvent(event: CustomEvent) {
        console.debug("[show-toast-on-*] event.detail:", event.detail);
        this.customData.toastData.$event = event;
        this.customData.toastData.$context = this.view.models;
        console.debug(this.customData.toastData);
        const toastData: Toast = new Toast(this.customData.toastData);
        const notificationDispatcher = new EventDispatcher(
          toastData.channel || "toast"
        );
        notificationDispatcher.trigger("show-notification", toastData);
      },
    };
    const eventName = this.args[0] as string;
    // assign onEvent to bound version so we can remove the DOM Element listener later without problems
    this.customData.onEvent = this.customData.onEvent.bind(this);
    el.addEventListener(eventName, this.customData.onEvent, { passive: true });
  },
  routine(el: HTMLUnknownElement, toastData: Toast) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.customData.toastData = toastData;
  },
  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName, this.customData.onEvent);
  },
};
