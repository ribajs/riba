import { Component, EventDispatcher } from "@ribajs/core";
import template from "./bs4-notifications-example.component.html";
import { Toast, Modal } from "../../../../../../packages/bs4/src/interfaces";

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
      contextualClass: "default",
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

  public showToast(event: Event) {
    this.scope.fromComponent.delay = Number(this.scope.fromComponent.delay);
    const toastDispatcher = new EventDispatcher(this.scope.fromComponent.channel);
    const toast: Toast = new Toast({
      ...this.scope.fromComponent,
      $event: event as CustomEvent, //@JumpLink geht das mit dem as so?
      $context: this.scope,
    });
    toastDispatcher.trigger("show-notification", toast);
  }

  public showModal(event: Event) {
    const toastDispatcher = new EventDispatcher(this.scope.fromComponent.channel);
    const modal: Modal = new Modal({
      message: " hi",
      $event: event as CustomEvent, //@JumpLink geht das mit dem as so?
      $context: this.scope,
    });
    toastDispatcher.trigger("show-notification", modal);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
