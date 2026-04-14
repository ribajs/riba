import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { onRoute } from "@ribajs/utils/src/url.js";

/**
 * Dispatches a CustomEvent on the bound element when the current URL matches
 * (or explicitly does not match) the bound route value.
 *
 * Usage:
 *   rv-dispatch-on-route-match="'/docs'"
 *     → fires `route-matched` when the URL matches `/docs`.
 *   rv-dispatch-on-route-unmatch="'/docs'"
 *     → fires `route-unmatched` when the URL does not match.
 *
 * Combine with standard event binders to react without coupling to any service:
 *   <div rv-dispatch-on-route-match="'/docs'" rv-on-route-matched="showDocs"></div>
 */
export class DispatchOnRouteBinder extends Binder<string, HTMLElement> {
  static key = "dispatch-on-route-*";

  private dispatcher = EventDispatcher.getInstance("main");
  private url?: string;
  private mode: "match" | "unmatch" = "match";

  private _onNewPage() {
    if (!this.url) return;
    const matches = onRoute(this.url);
    const shouldFire = this.mode === "match" ? matches : !matches;
    if (shouldFire) {
      const eventName =
        this.mode === "match" ? "route-matched" : "route-unmatched";
      this.el.dispatchEvent(
        new CustomEvent(eventName, { detail: { url: this.url } }),
      );
    }
  }

  private onNewPage = this._onNewPage.bind(this);

  unbind() {
    this.dispatcher.off("newPageReady", this.onNewPage);
  }

  routine(el: HTMLElement, url: string) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    this.url = url;
    this.mode = (this.args[0] as "match" | "unmatch") ?? "match";
    this.dispatcher.off("newPageReady", this.onNewPage);
    this.dispatcher.on("newPageReady", this.onNewPage);
    this.onNewPage();
  }
}
