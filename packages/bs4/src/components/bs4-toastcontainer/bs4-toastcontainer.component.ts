import { Component, EventDispatcher } from "@ribajs/core";

import template from "./bs4-toastcontainer.component.html";
import { ToastService } from "../../services";

interface Scope {
  iconUrl?: string;
}

interface Toast {
  title?: string;
  message: string;
  iconUrl?: string;
  delay?: number;
  autoHide?: boolean;
  animation?: boolean;
}

export class Bs4ToastContainerComponent extends Component {
  public static tagName = "bs4-toastcontainer";

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return ["icon-url"];
  }

  protected scope: Scope = {};

  constructor(element?: HTMLElement) {
    super(element);
    this.eventDispatcher = new EventDispatcher("toast");
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ToastContainerComponent.observedAttributes);
    this.eventDispatcher?.on("showToast", (toast: Toast) => {
      console.log("showing toast");
      let newTemplate = template;

      newTemplate = newTemplate.replace("%title%", toast.title);

      const toastElement = this.htmlToElement(this.el, newTemplate);

      const imageElement = toastElement.querySelector(
        "#toastImage"
      ) as HTMLImageElement;

      if (toast.iconUrl) {
        imageElement.src = toast.iconUrl;
      } else if (this.scope.iconUrl) {
        imageElement.src = this.scope.iconUrl;
      } else {
        imageElement.remove();
      }

      if (!toast.title) {
        toastElement.querySelector("#toastTitle")?.remove();
      }

      this.el.append(toastElement);
      const toastService: ToastService = new ToastService(
        toastElement,
        ToastService.Default
      );
      toastService.show();
    });
  }

  public htmlToElement(parent: HTMLElement, html: string): HTMLElement {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild as HTMLElement;
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
