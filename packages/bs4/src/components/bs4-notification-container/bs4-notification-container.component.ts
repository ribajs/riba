import { Component, EventDispatcher } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";
import template from "./bs4-notification-container.component.html";
import { Notification } from "../../interfaces";

export interface Scope {
  iconUrl?: string;
  positionClass: string;
  notifications: Notification[];
  channelName: string;
  onItemHide: Bs4NotificationContainerComponent["onItemHide"];
}

export class Bs4NotificationContainerComponent extends Component {
  public static tagName = "bs4-notification-container";

  protected autobind = true;
  public _debug = false;

  protected notificationDispatcher?: EventDispatcher;

  static get observedAttributes() {
    return ["icon-url", "position-class", "channel-name"];
  }

  protected scope: Scope = {
    notifications: [],
    positionClass: "absolute-bottom absolute-center",
    channelName: "toast",
    onItemHide: this.onItemHide,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4NotificationContainerComponent.observedAttributes);
  }

  // Called by child if notification item wants to be removed
  public onItemHide(
    this: Scope,
    event: Event,
    el: HTMLElement,
    index: number,
    notification: Notification
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
      notification
    );
    this.scope.notifications.push(notification);
  }

  protected async afterBind() {
    super.afterBind();
    // Add event dispatcher to listen for toast notifications
    this.notificationDispatcher = new EventDispatcher(this.scope.channelName);
    this.notificationDispatcher.on(
      "show-notification",
      this.onShowNotification,
      this
    );
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
    (this.notificationDispatcher as EventDispatcher).off("show-notification", this.onShowNotification, this);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this.el)) {
      return template;
    }
    return null;
  }
}
