import { BinderDeprecated } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { ToastNotification } from "@ribajs/bs5";

export const showToastOnEventBinder: BinderDeprecated<ToastNotification> = {
  name: "show-toast-on-*",
  bind(el: HTMLUnknownElement) {
    this.customData = {
      onEvent(event: CustomEvent) {
        console.debug("[show-toast-on-*] event.detail:", event.detail);
        this.customData.toastData.$event = event;
        this.customData.toastData.$context = this.view.models;
        console.debug(this.customData.toastData);
        const toastData: ToastNotification = new ToastNotification(
          this.customData.toastData
        );
        const notificationDispatcher = new EventDispatcher(
          toastData.channel || "toast"
        );
        notificationDispatcher.trigger("show-notification", toastData);
      },
    };
    const eventName = this.args[0] as string;
    // assign onEvent to bound version so we can remove the DOM Element listener later without problems
    this.customData.onEvent = this.customData.onEvent.bind(this);
    el.addEventListener(eventName, this.customData.onEvent);
  },
  routine(el: HTMLUnknownElement, toastData: ToastNotification) {
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
