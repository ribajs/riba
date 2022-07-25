import type { NotificationEventBinderData } from "./notification-event-binder-data.js";
export abstract class Notification implements NotificationEventBinderData {
  type: string;
  title?: string;

  channel?: string;
  $event?: CustomEvent;
  $context?: any;

  constructor(type: string, title?: string) {
    this.type = type;
    this.title = title;
  }
}
