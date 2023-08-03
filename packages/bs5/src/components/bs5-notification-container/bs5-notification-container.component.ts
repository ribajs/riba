import { Component, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { Notification } from "../../types/index.js";

import template from "./bs5-notification-container.component.html?raw";

export interface Scope extends ScopeBase {
  iconUrl?: string;
  positionClass: string;
  notifications: Notification[];
  channelName: string;
  onItemHide: Bs5NotificationContainerComponent["onItemHide"];
}

export class Bs5NotificationContainerComponent extends Component {
  public static tagName = "bs5-notification-container";

  protected autobind = true;
  public _debug = false;

  protected notificationDispatcher?: EventDispatcher;

  static get observedAttributes(): string[] {
    return ["icon-url", "position-class", "channel-name"];
  }

  public scope: Scope = {
    notifications: [],
    positionClass: "absolute-bottom absolute-center",
    channelName: "toast",
    onItemHide: this.onItemHide,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5NotificationContainerComponent.observedAttributes);
  }

  // Called by child if notification item wants to be removed
  public onItemHide(
    this: Scope,
    event: Event,
    el: HTMLElement,
    index: number,
    notification: Notification,
  ) {
    if (index > -1) {
      this.notifications.splice(index, 1);
    } else {
      console.warn("Notification not found", notification);
    }
  }

  protected onShowNotification(notification: Notification) {
    this.debug(
      "Received notification container on " + this.scope.channelName,
      this.scope,
      notification,
    );
    this.scope.notifications.push(notification);
  }

  protected async afterBind() {
    // Add event dispatcher to listen for toast notifications
    this.notificationDispatcher = new EventDispatcher(this.scope.channelName);
    this.notificationDispatcher.on(
      "show-notification",
      this.onShowNotification,
      this,
    );
    await super.afterBind();
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    (this.notificationDispatcher as EventDispatcher).off(
      "show-notification",
      this.onShowNotification,
      this,
    );
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this)) {
      // TODO this is not working if multiple components are used on the same page
      // const { default: template } = await import(
      //   "./bs5-notification-container.component.html?raw"
      // );
      return template;
    }
    return null;
  }
}
