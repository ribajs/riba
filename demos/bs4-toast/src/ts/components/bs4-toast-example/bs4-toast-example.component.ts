import { Component, EventDispatcher } from "@ribajs/core";
import template from "./bs4-toast-example.component.html";

export class Bs4ToastExampleComponent extends Component {
  public static tagName = "bs4-toast-example";

  protected autobind = true;
  static get observedAttributes() {
    return [];
  }

  protected scope = {
    showToast: this.showToast,
    message: "",
    title: "",
    fromComponent: {
      message: "Message example",
      title: "Title example",
      contextualClass: "primary",
      channel: "toast-right",
      delay: 1000,
    },
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs4ToastExampleComponent.observedAttributes);
  }

  public showToast(event: Event) {
    this.scope.fromComponent.delay = Number(this.scope.fromComponent.delay);
    const toastDispatcher = new EventDispatcher(
      this.scope.fromComponent.channel
    );

    toastDispatcher.trigger("show-toast", {
      ...this.scope.fromComponent,
      $event: event,
      $context: this.scope,
    });
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
