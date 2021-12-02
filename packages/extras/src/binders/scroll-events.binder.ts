import { Binder } from "@ribajs/core";
import { ScrollEventsService } from "../services/touch-events/scroll-events.service";

export class ScrollEventsBinder extends Binder<string, HTMLElement> {
  static key = "scroll-events";

  private touchEventService?: ScrollEventsService;

  bind(el: HTMLElement) {
    this.touchEventService = new ScrollEventsService(el);
  }

  unbind() {
    if (this.touchEventService) {
      (this.touchEventService as ScrollEventsService).destroy();
    }
  }

  routine() {
    // nothing
  }
}
