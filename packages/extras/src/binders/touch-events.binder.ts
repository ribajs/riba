import { Binder } from "@ribajs/core/src/index.js";
import { TouchEventsService } from "../services/touch-events/touch-events.service.js";

export class TouchEventsBinder extends Binder<string, HTMLElement> {
  static key = "touch-events";

  touchEventService?: TouchEventsService;

  bind(el: HTMLElement) {
    this.touchEventService = new TouchEventsService(el);
  }

  unbind() {
    if (this.touchEventService) {
      this.touchEventService.destroy();
    }
  }

  routine() {
    // nothing
  }
}
