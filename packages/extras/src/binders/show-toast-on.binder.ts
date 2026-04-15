import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import type { ToastNotification } from "../types/notification.js";

/**
 * Shows a toast notification when a specified event fires on the element.
 *
 * Usage: `rv-show-toast-on-click="toastData"`
 */
export class ShowToastOnEventBinder extends Binder<
  ToastNotification,
  HTMLElement
> {
  static key = "show-toast-on-*";

  private toastData?: ToastNotification;

  private _onEvent() {
    if (!this.toastData) {
      throw new Error("Toast data not set!");
    }
    const toastData: ToastNotification = { ...this.toastData };
    const notificationDispatcher = new EventDispatcher("toast");
    notificationDispatcher.trigger("show-notification", toastData);
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.addEventListener(eventName as any, this.onEvent);
  }

  routine(_el: HTMLElement, toastData: ToastNotification) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.toastData = toastData;
  }

  unbind(el: HTMLElement) {
    const eventName = this.args[0] as string;
    el.removeEventListener(eventName as any, this.onEvent);
  }
}
