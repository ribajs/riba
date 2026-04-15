import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

export class DemoThemeComponent extends Component {
  public static tagName = "demo-theme";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  protected notifications = new EventDispatcher("theme-demo");

  public scope = {
    showModal: this.showModal.bind(this),
    showInfoToast: this.showInfoToast.bind(this),
    showSuccessToast: this.showSuccessToast.bind(this),
    showWarningToast: this.showWarningToast.bind(this),
    showErrorToast: this.showErrorToast.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(DemoThemeComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public showModal() {
    this.notifications.trigger("show-notification", {
      kind: "modal",
      title: "Theme Backdrop Test",
      message:
        "This modal renders a second backdrop. Toggle the theme to compare the light and dark overlay.",
      closable: true,
    });
  }

  public showInfoToast() {
    this.notifications.trigger("show-notification", {
      kind: "toast",
      type: "info",
      title: "Info",
      message: "Informational toast in the active theme.",
      timeout: 5000,
    });
  }

  public showSuccessToast() {
    this.notifications.trigger("show-notification", {
      kind: "toast",
      type: "success",
      title: "Success",
      message: "Success toast in the active theme.",
      timeout: 5000,
    });
  }

  public showWarningToast() {
    this.notifications.trigger("show-notification", {
      kind: "toast",
      type: "warning",
      title: "Warning",
      message: "Warning toast in the active theme.",
      timeout: 7000,
    });
  }

  public showErrorToast() {
    this.notifications.trigger("show-notification", {
      kind: "toast",
      type: "error",
      title: "Error",
      message: "Error toast in the active theme.",
      timeout: 0,
    });
  }

  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } =
        await import("./demo-theme.component.html?raw");
      return template;
    }
  }
}
