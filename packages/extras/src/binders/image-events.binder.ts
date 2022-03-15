import { Binder } from "@ribajs/core/src/index.js";
import imagesLoaded from "imagesloaded";

/**
 * rv-image-events
 * Additional image events:
 * * load-always - Triggered after all images have been either loaded or confirmed broken.
 * * load-done - Triggered after all images have successfully loaded without any broken images.
 * * load-fail - Triggered after all images have been loaded with at least one broken image.
 * * load-progress - Triggered after each image has been loaded.
 */
export class ImageEventsBinder extends Binder<string, HTMLImageElement> {
  static key = "image-events";

  private events?: ImagesLoaded.ImagesLoaded;

  private _onEvent(
    customEventName: string,
    load: ImagesLoaded.ImagesLoaded,
    image?: ImagesLoaded.LoadingImage
  ) {
    this.el.dispatchEvent(
      new CustomEvent(customEventName, {
        detail: { load, image }
      })
    );
  }

  private onAlways = this._onEvent.bind(this, "load-always");
  private onDone = this._onEvent.bind(this, "load-done");
  private onFail = this._onEvent.bind(this, "load-fail");
  private onProgress = this._onEvent.bind(this, "load-progress");

  bind(el: HTMLImageElement) {
    this.events = imagesLoaded(el);

    // Forward the events as native events
    this.events?.on("always", this.onAlways);
    this.events?.on("done", this.onDone);
    this.events?.on("fail", this.onFail);
    this.events?.on("progress", this.onProgress);
  }

  unbind() {
    if (this.events) {
      this.events?.off("always", this.onAlways);
      this.events?.off("done", this.onDone);
      this.events?.off("fail", this.onFail);
      this.events?.off("progress", this.onProgress);
    }
  }

  routine() {
    // nothing yet
  }
}
