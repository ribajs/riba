import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { ModalService } from "../../services/modal.service.js";
import type { ModalNotification } from "../../types/index.js";
import template from "./tw-modal-item.component.html?raw";

interface Scope extends ScopeBase {
  iconUrl?: string;
  modal?: ModalNotification;
  onHidden: TwModalItemComponent["onHidden"];
  dismiss: TwModalItemComponent["dismiss"];
  index: number;
  $parent?: any;
  $event?: CustomEvent;
}

/**
 * Use this component to show a modal inside a tw-notification-container
 */
export class TwModalItemComponent extends Component {
  public static tagName = "tw-modal-item";

  protected autobind = true;

  protected modalService?: ModalService;

  static get observedAttributes(): string[] {
    return ["modal", "index"];
  }

  protected requiredAttributes(): string[] {
    return ["modal"];
  }

  public scope: Scope = {
    iconUrl: undefined,
    modal: undefined,
    onHidden: this.onHidden.bind(this),
    dismiss: this.dismiss.bind(this),
    index: -1,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwModalItemComponent.observedAttributes);
  }

  protected async afterBind() {
    await super.afterBind();
    this.initModal();
  }

  protected initModal() {
    const modal = this.scope.modal;
    const dialogEl = this.querySelector<HTMLDialogElement>("dialog");
    if (modal && dialogEl) {
      this.modalService = new ModalService(dialogEl, {
        backdrop: true,
        keyboard: true,
      });

      dialogEl.addEventListener("tw.modal.hidden", this.scope.onHidden, {
        once: true,
      });

      this.modalService.show();
    }
  }

  /** Can be called to dismiss the modal */
  public dismiss() {
    this.modalService?.hide();
  }

  /** Remove modal from DOM once hidden */
  public onHidden() {
    const parentScope = this.scope.$parent?.$parent;
    if (
      typeof parentScope?.onItemHide === "function" &&
      this.scope.modal
    ) {
      parentScope.onItemHide(
        this.scope.$event,
        this,
        this.scope.index,
        this.scope.modal,
      );
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.modalService?.dispose();
  }

  protected template(): ReturnType<TemplateFunction> {
    return template;
  }
}
