import { Component, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./bs4-notifications-example.component.html";
import { Toast, Modal } from "@ribajs/bs4";

export class Bs4NotificationsExampleComponent extends Component {
  public static tagName = "bs4-notifications-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    showToast: this.showToast,
    showModal: this.showModal,
    message: "",
    title: "",
    fromComponent: {
      message: "Message example",
      title: "Title example",
      contextualClass: "warning",
      channel: "toast-right",
      delay: 10000,
    },
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs4NotificationsExampleComponent.observedAttributes);
  }

  public showToast(event: CustomEvent) {
    this.scope.fromComponent.delay = Number(this.scope.fromComponent.delay);
    const notificationDispatcher = new EventDispatcher(
      this.scope.fromComponent.channel
    );
    const toast: Toast = new Toast({
      ...this.scope.fromComponent,
      $event: event,
      $context: this.scope,
    });
    notificationDispatcher.trigger("show-notification", toast);
  }

  public showModal(event: CustomEvent) {
    const notificationDispatcher = new EventDispatcher(
      this.scope.fromComponent.channel
    );
    const modal: Modal = new Modal({
      ...this.scope.fromComponent,
      $event: event,
      $context: this.scope,
    });
    notificationDispatcher.trigger("show-notification", modal);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
