import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import type { Notification } from "../../types/index.js";
import template from "./tw-notification-container.component.html?raw";

export interface Scope extends ScopeBase {
  iconUrl?: string;
  positionClass: string;
  notifications: Notification[];
  channelName: string;
  onItemHide: TwNotificationContainerComponent["onItemHide"];
}

/**
 * Container for toast and modal notifications.
 * Listens on an EventDispatcher channel for "show-notification" events
 * and renders the appropriate tw-toast-item or tw-modal-item components.
 */
export class TwNotificationContainerComponent extends Component {
  public static tagName = "tw-notification-container";

  protected autobind = true;

  protected channelEvents?: EventDispatcher;

  static get observedAttributes(): string[] {
    return ["icon-url", "position-class", "channel-name"];
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    iconUrl: undefined,
    positionClass: "fixed bottom-4 right-4",
    notifications: [],
    channelName: "toast",
    onItemHide: this.onItemHide.bind(this),
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwNotificationContainerComponent.observedAttributes);
  }

  protected async afterBind() {
    await super.afterBind();
    this.channelEvents = new EventDispatcher(this.scope.channelName);
    this.channelEvents.on(
      "show-notification",
      this.onShowNotification,
      this,
    );
  }

  protected onShowNotification(notification: Notification) {
    this.scope.notifications.push(notification);
  }

  public onItemHide(
    _event: CustomEvent | Event | undefined,
    _el: HTMLElement,
    index: number,
    _notification: Notification,
  ) {
    if (index >= 0 && index < this.scope.notifications.length) {
      this.scope.notifications.splice(index, 1);
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.channelEvents?.off(
      "show-notification",
      this.onShowNotification,
      this,
    );
  }

  protected template(): ReturnType<TemplateFunction> {
    if (this.hasChildNodes()) return null;
    return template;
  }
}
