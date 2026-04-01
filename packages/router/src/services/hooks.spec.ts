import { describe, expect, it } from "vitest";
import { RouterHooks } from "./Hooks.js";
import type { TransitionData } from "../types/index.js";

const data: TransitionData = {
  current: {
    namespace: "home",
    url: { href: "https://example.test/home", path: "/home", hash: "", query: {} },
  },
  next: {
    namespace: "detail",
    url: {
      href: "https://example.test/detail",
      path: "/detail",
      hash: "",
      query: {},
    },
  },
};

describe("RouterHooks", () => {
  it("runs hooks sequentially in registration order", async () => {
    const hooks = RouterHooks.instance;
    hooks.clear();
    const order: string[] = [];
    hooks.on("before", async () => {
      order.push("first");
    });
    hooks.on("before", async () => {
      order.push("second");
    });

    await hooks.do("before", data);
    expect(order).toEqual(["first", "second"]);
    hooks.clear();
  });

  it("removes hooks by function and context", async () => {
    const hooks = RouterHooks.instance;
    hooks.clear();
    const order: string[] = [];
    const ctxA = { id: "a" };
    const fn = () => {
      order.push("called");
    };
    hooks.on("after", fn, ctxA);
    hooks.off("after", fn, ctxA);

    await hooks.do("after", data);
    expect(order).toEqual([]);
    hooks.clear();
  });
});

