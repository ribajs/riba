import { Binder } from "@ribajs/core";
import { TouchEventsService } from "../services/touch-events/touch-events.service";

export const touchEventsBinder: Binder<string> = {
  name: "touch-events",
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    this.customData.touchEventService = new TouchEventsService(el);
  },
  unbind() {
    if (this.customData.touchEventService) {
      (this.customData.touchEventService as TouchEventsService).destroy();
    }
  },
  routine() {
    // nothing
  },
};
