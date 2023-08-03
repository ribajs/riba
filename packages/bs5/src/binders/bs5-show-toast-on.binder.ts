import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { ToastNotification } from "@ribajs/bs5";

export class ShowToastOnEventBinder extends Binder<
  ToastNotification,
  HTMLElement
> {
  static key = "show-toast-on-*";

  private toastData?: ToastNotification;

  private _onEvent(event: CustomEvent) {
    if (!this.toastData) {
      throw new Error("Toast data not set!");
    }
    this.toastData.$event = event;
    this.toastData.$context = this.view.models;
    const toastData: ToastNotification = new ToastNotification(this.toastData);
    const notificationDispatcher = new EventDispatcher(
      toastData.channel || "toast",
    );
    notificationDispatcher.trigger("show-notification", toastData);
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLUnknownElement) {
    const eventName = this.args[0] as string;
    el.addEventListener(eventName as any, this.onEvent);
  }

  routine(el: HTMLUnknownElement, toastData: ToastNotification) {
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
