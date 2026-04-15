import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class DemoNotificationsComponent extends Component {
  public static tagName = "demo-notifications";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  protected toastChannel = new EventDispatcher("toast");

  public scope = {
    showInfoToast: this.showInfoToast.bind(this),
    showSuccessToast: this.showSuccessToast.bind(this),
    showWarningToast: this.showWarningToast.bind(this),
    showErrorToast: this.showErrorToast.bind(this),
    showModal: this.showModal.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(DemoNotificationsComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public showInfoToast() {
    this.toastChannel.trigger("show-notification", {
      kind: "toast",
      type: "info",
      title: "Info",
      message: "This is an informational toast notification.",
      timeout: 5000,
    });
  }

  public showSuccessToast() {
    this.toastChannel.trigger("show-notification", {
      kind: "toast",
      type: "success",
      title: "Success",
      message: "The operation completed successfully!",
      timeout: 5000,
    });
  }

  public showWarningToast() {
    this.toastChannel.trigger("show-notification", {
      kind: "toast",
      type: "warning",
      title: "Warning",
      message: "Please review your input before proceeding.",
      timeout: 7000,
    });
  }

  public showErrorToast() {
    this.toastChannel.trigger("show-notification", {
      kind: "toast",
      type: "error",
      title: "Error",
      message: "Something went wrong. Please try again later.",
      timeout: 0,
    });
  }

  public showModal() {
    this.toastChannel.trigger("show-notification", {
      kind: "modal",
      title: "Confirm Action",
      message:
        "Are you sure you want to proceed? This action cannot be undone.",
      closable: true,
    });
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } =
        await import("./demo-notifications.component.html?raw");
      return template;
    }
  }
}
