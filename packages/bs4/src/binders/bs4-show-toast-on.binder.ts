import { Binder } from "@ribajs/core/src/index.js";
import { EventDispatcher } from "@ribajs/events";
import { Toast } from "@ribajs/bs4/src/interfaces";

export class ShowToastOnEventBinder extends Binder<Toast, HTMLInputElement> {
  static key = "show-toast-on-*";

  private toastData?: Toast;

  private _onEvent(event: CustomEvent) {
    if (!this.toastData) {
      throw new Error("Toast data not set!");
    }
    this.toastData.$event = event;
    this.toastData.$context = this.view.models;
    const toastData: Toast = new Toast(this.toastData);
    const notificationDispatcher = new EventDispatcher(
      toastData.channel || "toast"
    );
    notificationDispatcher.trigger("show-notification", toastData);
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLUnknownElement) {
    const eventName = this.args[0] as string;
    el.addEventListener(eventName as any, this.onEvent, { passive: true });
  }
  routine(el: HTMLUnknownElement, toastData: Toast) {
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
