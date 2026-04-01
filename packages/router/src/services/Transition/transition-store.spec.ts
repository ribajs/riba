import { describe, expect, it } from "vitest";
import { TransitionStore } from "./TransitionStore.js";
import type { TransitionData } from "../../types/index.js";

const data = (
  fromNs: string,
  toNs?: string,
  nextPath = "/to",
): TransitionData => ({
  current: {
    namespace: fromNs,
    url: { href: "https://example.test/from", path: "/from", hash: "", query: {} },
  },
  next: {
    namespace: toNs,
    url: {
      href: `https://example.test${nextPath}`,
      path: nextPath,
      hash: "",
      query: {},
    },
  },
});

describe("TransitionStore", () => {
  it("resolves the most specific from+to transition", () => {
    const store = new TransitionStore([
      { name: "default", leave: () => undefined },
      { name: "to-detail", to: { namespace: "detail" }, leave: () => undefined },
      {
        name: "home-to-detail",
        from: { namespace: "home" },
        to: { namespace: "detail" },
        leave: () => undefined,
      },
    ]);

    const resolved = store.resolve(data("home", "detail"));
    expect(resolved?.name).toBe("home-to-detail");
  });

  it("uses custom matcher priority over namespace-only rules", () => {
    const store = new TransitionStore([
      {
        name: "namespace-only",
        to: { namespace: "detail" },
        leave: () => undefined,
      },
      {
        name: "custom",
        to: {
          namespace: "detail",
          custom: () => true,
        },
        leave: () => undefined,
      },
    ]);

    const resolved = store.resolve(data("home", "detail"));
    expect(resolved?.name).toBe("custom");
  });

  it("falls back to custom rules when next namespace is not available", () => {
    const store = new TransitionStore([
      {
        name: "requires-next-namespace",
        to: { namespace: "detail" },
        leave: () => undefined,
      },
      {
        name: "path-based-fallback",
        custom: (transitionData) => transitionData.next.url.path === "/detail",
        leave: () => undefined,
      },
    ]);

    const resolved = store.resolve(data("home", undefined, "/detail"));
    expect(resolved?.name).toBe("path-based-fallback");
  });

  it("prefers higher explicit priority over specificity", () => {
    const store = new TransitionStore([
      {
        name: "specific",
        from: { namespace: "home" },
        to: { namespace: "detail" },
        leave: () => undefined,
      },
      {
        name: "priority-wins",
        priority: 10,
        to: { namespace: "detail" },
        leave: () => undefined,
      },
    ]);

    const resolved = store.resolve(data("home", "detail"));
    expect(resolved?.name).toBe("priority-wins");
  });

  it("resolves self transition when self option is true", () => {
    const store = new TransitionStore([
      { name: "default", leave: () => undefined },
      { name: "self", leave: () => undefined },
    ]);

    const resolved = store.resolve(data("home", "home", "/home"), { self: true });
    expect(resolved?.name).toBe("self");
  });
});
