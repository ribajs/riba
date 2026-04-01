import { describe, expect, it } from "vitest";
import { TransitionStore } from "./TransitionStore.js";
import type { TransitionData } from "../../types/index.js";

const createData = (
  direction: "next" | "prev",
  currentNamespace = "home",
): TransitionData => {
  const trigger = document.createElement("a");
  trigger.dataset.direction = direction;
  return {
    current: {
      namespace: currentNamespace,
      url: {
        href: "https://example.test/home.html",
        path: "/home.html",
        hash: "",
        query: {},
      },
    },
    next: {
      namespace: undefined,
      url: {
        href: "https://example.test/page.html",
        path: "/page.html",
        hash: "",
        query: {},
      },
    },
    trigger,
  };
};

describe("Transition regressions", () => {
  it("resolves prev and next custom rules symmetrically by trigger direction", () => {
    const store = new TransitionStore([
      {
        name: "slide-next",
        custom: (data) =>
          !!data.trigger &&
          typeof data.trigger !== "string" &&
          data.trigger.dataset.direction === "next",
        leave: () => undefined,
      },
      {
        name: "slide-prev",
        custom: (data) =>
          !!data.trigger &&
          typeof data.trigger !== "string" &&
          data.trigger.dataset.direction === "prev",
        leave: () => undefined,
      },
    ]);

    expect(store.resolve(createData("next"))?.name).toBe("slide-next");
    expect(store.resolve(createData("prev"))?.name).toBe("slide-prev");
  });

  it("supports svg-like fallback matching when next namespace is unavailable", () => {
    const store = new TransitionStore([
      {
        name: "svg-from-home",
        from: { namespace: "home" },
        to: { namespace: "detail" },
        leave: () => undefined,
      },
      {
        name: "svg-fallback-custom",
        custom: (data) =>
          data.current.namespace === "home" && data.next.url.path === "/page.html",
        leave: () => undefined,
      },
    ]);

    expect(store.resolve(createData("next", "home"))?.name).toBe("svg-fallback-custom");
  });
});

