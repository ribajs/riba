import { Component, EventDispatcher } from "@ribajs/core";

import template from "./bs4-toast-container.component.html";
import { Toast, ToastBinderData } from "../../interfaces";

export interface Scope {
  iconUrl?: string;
  positionClass: string;
  toasts: Toast[];
  channelName: string;
  onToastItemHide: Bs4ToastContainerComponent["onToastItemHide"];
}

export class Bs4ToastContainerComponent extends Component {
  public static tagName = "bs4-toast-container";

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return ["icon-url", "position-class", "channel-name"];
  }

  protected scope: Scope = {
    toasts: [],
    positionClass: "absolute-bottom absolute-center",
    channelName: "toast",
    onToastItemHide: this.onToastItemHide,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastContainerComponent.observedAttributes);

    //add event dispatcher to listen for toast notifications
    this.eventDispatcher = new EventDispatcher(this.scope.channelName);
    this.eventDispatcher.on("show-toast", (toast: Toast | ToastBinderData) => {
      this.scope.toasts.push(toast);
    });
  }

  //called by child if toast item wants to be removed
  public onToastItemHide(
    this: Scope,
    event: Event,
    el: HTMLElement,
    index: number,
    toast: Toast
  ) {
    if (index > -1) {
      this.toasts.splice(index, 1);
    } else {
      console.warn("Toast not found", toast);
    }
  }

  protected async afterBind() {
    super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return template;
  }
}
