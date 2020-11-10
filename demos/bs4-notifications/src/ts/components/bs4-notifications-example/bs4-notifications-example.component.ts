import { Component, EventDispatcher } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./bs4-notifications-example.component.html";
import { Toast, Modal } from "@ribajs/bs4";

export class Bs4NotificationsExampleComponent extends Component {
  public static tagName = "bs4-notifications-example";

  protected autobind = true;
  static get observedAttributes() {
    return [];
  }

  protected scope = {
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

  constructor(element?: HTMLElement) {
    super(element);
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

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
