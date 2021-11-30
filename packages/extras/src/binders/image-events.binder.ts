import { BinderDeprecated } from "@ribajs/core";
import imagesLoaded from "imagesloaded";

/**
 * rv-image-events
 * Additional image events:
 * * load-always - Triggered after all images have been either loaded or confirmed broken.
 * * load-done - Triggered after all images have successfully loaded without any broken images.
 * * load-fail - Triggered after all images have been loaded with at least one broken image.
 * * load-progress - Triggered after each image has been loaded.
 */
export const imageEventsBinder: BinderDeprecated<string> = {
  name: "image-events",
  bind(el) {
    if (!this.customData) {
      this.customData = {};
    }
    const events = imagesLoaded(el);

    // Forward the events as native events
    events.on("always", (load, image) => {
      el.dispatchEvent(
        new CustomEvent("load-always", {
          detail: { load, image },
        })
      );
    });

    events.on("done", (load, image) => {
      el.dispatchEvent(
        new CustomEvent("load-done", {
          detail: { load, image },
        })
      );
    });

    events.on("fail", (load, image) => {
      el.dispatchEvent(
        new CustomEvent("load-fail", {
          detail: { load, image },
        })
      );
    });

    events.on("progress", (load, image) => {
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
