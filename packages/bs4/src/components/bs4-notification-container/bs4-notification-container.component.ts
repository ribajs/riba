import { Component, EventDispatcher } from "@ribajs/core";

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

  protected eventDispatcher?: EventDispatcher;

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

    //add event dispatcher to listen for toast notifications
    this.eventDispatcher = new EventDispatcher(this.scope.channelName);
    this.eventDispatcher.on(
      "show-notification",
      (notification: Notification) => {
        this.scope.notifications.push(notification);
      }
    );
  }

  //called by child if notification item wants to be removed
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
      console.warn("Toast not found", notification);
    }
  }

  protected async afterBind() {
    super.afterBind();
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return template;
  }
}
