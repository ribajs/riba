import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import template from "./tw-alert.component.html?raw";

type AlertType = "info" | "success" | "warning" | "error";

interface Scope extends ScopeBase {
  type: AlertType;
  title: string;
  message: string;
  dismissible: boolean;
  visible: boolean;
  icon: string;
  dismiss: TwAlertComponent["dismiss"];
}

export class TwAlertComponent extends Component {
  public static tagName = "tw-alert";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return ["type", "title", "message", "dismissible", "icon"];
  }

  public scope: Scope = {
    type: "info",
    title: "",
    message: "",
    dismissible: false,
    visible: true,
    icon: "",
    dismiss: this.dismiss.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwAlertComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public dismiss() {
    this.scope.visible = false;
    this.dispatchEvent(
      new CustomEvent("dismissed", {
        detail: { type: this.scope.type },
      }),
    );
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
