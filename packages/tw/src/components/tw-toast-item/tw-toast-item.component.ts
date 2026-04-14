import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { ToastService } from "../../services/toast.service.js";
import type { ToastNotification } from "../../types/index.js";
import template from "./tw-toast-item.component.html?raw";

type ToastType = "info" | "success" | "warning" | "error";

const TYPE_STYLES: Record<
  ToastType,
  {
    container: string;
    title: string;
    message: string;
    closeButton: string;
    icon: string;
  }
> = {
  info: {
    container:
      "bg-blue-50 ring-blue-200 dark:bg-blue-900/30 dark:ring-blue-700",
    title: "text-blue-800 dark:text-blue-200",
    message: "text-blue-700 dark:text-blue-300",
    closeButton:
      "bg-blue-50 text-blue-500 hover:text-blue-600 focus:ring-blue-500 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:text-blue-300",
    icon: '<svg class="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
  success: {
    container:
      "bg-green-50 ring-green-200 dark:bg-green-900/30 dark:ring-green-700",
    title: "text-green-800 dark:text-green-200",
    message: "text-green-700 dark:text-green-300",
    closeButton:
      "bg-green-50 text-green-500 hover:text-green-600 focus:ring-green-500 dark:bg-green-900/30 dark:text-green-400 dark:hover:text-green-300",
    icon: '<svg class="h-5 w-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
  warning: {
    container:
      "bg-yellow-50 ring-yellow-200 dark:bg-yellow-900/30 dark:ring-yellow-700",
    title: "text-yellow-800 dark:text-yellow-200",
    message: "text-yellow-700 dark:text-yellow-300",
    closeButton:
      "bg-yellow-50 text-yellow-500 hover:text-yellow-600 focus:ring-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:text-yellow-300",
    icon: '<svg class="h-5 w-5 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
  },
  error: {
    container:
      "bg-red-50 ring-red-200 dark:bg-red-900/30 dark:ring-red-700",
    title: "text-red-800 dark:text-red-200",
    message: "text-red-700 dark:text-red-300",
    closeButton:
      "bg-red-50 text-red-500 hover:text-red-600 focus:ring-red-500 dark:bg-red-900/30 dark:text-red-400 dark:hover:text-red-300",
    icon: '<svg class="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  },
};

interface Scope extends ScopeBase {
  toast?: ToastNotification;
  containerClass: string;
  titleClass: string;
  messageClass: string;
  closeButtonClass: string;
  iconSvg: string;
  dismiss: TwToastItemComponent["dismiss"];
  onHidden: TwToastItemComponent["onHidden"];
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
    return ["toast", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["toast"];
  }

  public scope: Scope = {
    toast: undefined,
    containerClass: TYPE_STYLES.info.container,
    titleClass: TYPE_STYLES.info.title,
    messageClass: TYPE_STYLES.info.message,
    closeButtonClass: TYPE_STYLES.info.closeButton,
    iconSvg: TYPE_STYLES.info.icon,
    dismiss: this.dismiss.bind(this),
    onHidden: this.onHidden.bind(this),
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
    this.updateTypeStyles();
    this.initToast();
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName === "toast") {
      this.updateTypeStyles();
    }
  }

  protected updateTypeStyles() {
    const toastType = (this.scope.toast?.type || "info") as ToastType;
    const styles = TYPE_STYLES[toastType] || TYPE_STYLES.info;
    this.scope.containerClass = styles.container;
    this.scope.titleClass = styles.title;
    this.scope.messageClass = styles.message;
    this.scope.closeButtonClass = styles.closeButton;
    this.scope.iconSvg = styles.icon;
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
