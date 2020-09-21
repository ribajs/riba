export abstract class Notification implements EventBinderData {
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

export interface EventBinderData {
  channel?: string;
  $event?: CustomEvent;
  $context?: any;
}
