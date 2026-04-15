import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { EventDispatcher } from "@ribajs/events";
import { DispatchOnRouteBinder } from "./dispatch-on-route.binder.js";

/**
 * Minimal Binder harness: instantiate directly, call bind/routine/unbind.
 * We bypass the full view pipeline and drive the lifecycle hooks the same way
 * the view does.
 */
function makeBinder(el: HTMLElement, modifier: "match" | "unmatch") {
  const binder = new DispatchOnRouteBinder();
  binder.el = el;
  binder.args = [modifier];
  return binder;
}

describe("DispatchOnRouteBinder", () => {
  let el: HTMLElement;
  let originalPathname: string;

  beforeEach(() => {
    el = document.createElement("div");
    document.body.appendChild(el);
    originalPathname = window.location.pathname;
  });

  afterEach(() => {
    el.remove();
    // Reset history state to avoid bleed between tests
    window.history.replaceState(null, "", originalPathname);
    vi.restoreAllMocks();
  });

  it("fires `route-matched` when URL matches on initial routine", () => {
    window.history.replaceState(null, "", "/docs");
    const binder = makeBinder(el, "match");
    const handler = vi.fn();
    el.addEventListener("route-matched", handler);

    binder.routine(el, "/docs");

    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({
      url: "/docs",
    });
  });

  it("does not fire `route-matched` when URL does not match", () => {
    window.history.replaceState(null, "", "/other");
    const binder = makeBinder(el, "match");
    const handler = vi.fn();
    el.addEventListener("route-matched", handler);

    binder.routine(el, "/docs");

    expect(handler).not.toHaveBeenCalled();
  });

  it("fires `route-unmatched` in unmatch mode when URL does not match", () => {
    window.history.replaceState(null, "", "/other");
    const binder = makeBinder(el, "unmatch");
    const handler = vi.fn();
    el.addEventListener("route-unmatched", handler);

    binder.routine(el, "/docs");

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("re-evaluates on `newPageReady` dispatcher event", () => {
    window.history.replaceState(null, "", "/other");
    const binder = makeBinder(el, "match");
    const handler = vi.fn();
    el.addEventListener("route-matched", handler);

    binder.routine(el, "/docs");
    expect(handler).not.toHaveBeenCalled();

    window.history.replaceState(null, "", "/docs");
    EventDispatcher.getInstance("main").trigger("newPageReady");

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("removes dispatcher listener on unbind", () => {
    window.history.replaceState(null, "", "/other");
    const binder = makeBinder(el, "match");
    const handler = vi.fn();
    el.addEventListener("route-matched", handler);

    binder.routine(el, "/docs");
    binder.unbind();

    window.history.replaceState(null, "", "/docs");
    EventDispatcher.getInstance("main").trigger("newPageReady");

    expect(handler).not.toHaveBeenCalled();
  });
});
