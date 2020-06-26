import { Binder } from "@ribajs/core";
import { ScrollEventsService } from "../services/touch-events/scroll-events.service";

export const scrollEventsBinder: Binder<string> = {
  name: "scroll-events",
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.touchEventService = new ScrollEventsService(el);
  },
  unbind() {
    if (this.customData.touchEventService) {
      (this.customData.touchEventService as ScrollEventsService).destroy();
    }
  },
  routine() {
    // nothing
  },
};
