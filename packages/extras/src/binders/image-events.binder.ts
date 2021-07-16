import { Binder } from "@ribajs/core";
import imagesLoaded from "imagesloaded";

/**
 * rv-image-events
 * Additional image events:
 * * load-always - Triggered after all images have been either loaded or confirmed broken.
 * * load-done - Triggered after all images have successfully loaded without any broken images.
 * * load-fail - Triggered after all images have been loaded with at least one broken image.
 * * load-progress - Triggered after each image has been loaded.
 */
export const imageEventsBinder: Binder<string> = {
  name: "image-events",
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    const events = imagesLoaded(el);

    console.debug("[imageEventsBinder] bind");

    // Forward the events as native events
    events.on("always", (load, image) => {
      console.debug("[imageEventsBinder] always");
      el.dispatchEvent(
        new CustomEvent("load-always", {
          detail: { load, image },
        })
      );
    });

    events.on("done", (load, image) => {
      console.debug("[imageEventsBinder] done");
      el.dispatchEvent(
        new CustomEvent("load-done", {
          detail: { load, image },
        })
      );
    });

    events.on("fail", (load, image) => {
      console.debug("[imageEventsBinder] fail");
      el.dispatchEvent(
        new CustomEvent("load-fail", {
          detail: { load, image },
        })
      );
    });

    events.on("progress", (load, image) => {
      console.debug("[imageEventsBinder] progress");
      el.dispatchEvent(
        new CustomEvent("load-progress", {
          detail: { load, image },
        })
      );
    });
  },
  unbind() {
    // nothing yet
  },
  routine() {
    // nothing yet
  },
};
