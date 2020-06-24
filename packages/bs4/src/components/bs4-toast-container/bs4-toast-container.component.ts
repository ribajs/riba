import { Component, EventDispatcher } from "@ribajs/core";

import template from "./bs4-toast-container.component.html";
import { Toast } from "../../interfaces";

interface Scope {
  iconUrl?: string;
  positionStyle: string;
  toasts: Toast[];
  channelName: string;
}

export class Bs4ToastContainerComponent extends Component {
  public static tagName = "bs4-toast-container";

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return ["icon-url", "position-style"];
  }

  protected scope: Scope = {
    toasts: [],
    positionStyle: "bottom: 20px; right: 20px;",
    channelName: "toast",
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastContainerComponent.observedAttributes);
    this.eventDispatcher = new EventDispatcher(this.scope.channelName);
    this.eventDispatcher.on("showToast", (toast: Toast) => {
      console.log("showing toast");
      this.scope.toasts.push(toast);
    });
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
