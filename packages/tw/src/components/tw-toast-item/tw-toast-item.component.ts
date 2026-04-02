import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { ToastService } from "../../services/toast.service.js";
import type { ToastNotification } from "../../types/index.js";
import template from "./tw-toast-item.component.html?raw";

interface Scope extends ScopeBase {
  iconUrl?: string;
  toast?: ToastNotification;
  onHidden: TwToastItemComponent["onHidden"];
  dismiss: TwToastItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

/**
 * Use this component to show a toast inside a tw-notification-container
 */
export class TwToastItemComponent extends Component {
  public static tagName = "tw-toast-item";

  protected autobind = true;

  protected toastService?: ToastService;

  static get observedAttributes(): string[] {
    return ["toast", "icon-url", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["toast"];
  }

  public scope: Scope = {
    iconUrl: undefined,
    toast: undefined,
    onHidden: this.onHidden.bind(this),
    dismiss: this.dismiss.bind(this),
    index: -1,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwToastItemComponent.observedAttributes);
  }

  protected async afterBind() {
    await super.afterBind();
    this.initToast();
  }

  protected initToast() {
    const toast = this.scope.toast;
    const toastEl = this.firstElementChild as HTMLElement | null;
    if (toast && toastEl) {
      this.toastService = new ToastService(toastEl, {
        autoDismiss: toast.timeout ?? 5000,
        show: true,
      });

      // Call onHidden on hidden event once
      toastEl.addEventListener("tw.toast.hidden", this.scope.onHidden, {
        once: true,
      });
    }
  }

  /** Can be called if toast should be dismissed */
  public dismiss() {
    this.toastService?.hide();
  }

  /** Remove toast from DOM once hidden */
  public onHidden() {
    // Navigate up the parent scope chain to the notification container
    const parentScope = this.scope.$parent?.$parent;
    if (
      typeof parentScope?.onItemHide === "function" &&
      this.scope.toast
    ) {
      parentScope.onItemHide(
        this.scope.$event,
        this,
        this.scope.index,
        this.scope.toast,
      );
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.toastService?.dispose();
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
