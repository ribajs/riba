import { describe, expect, it } from "vitest";
import { TransitionRunner } from "./TransitionRunner.js";
import type { TransitionData } from "../../types/index.js";

const testData: TransitionData = {
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

describe("TransitionRunner", () => {
  it("runs sequential hook order for non-sync transitions", async () => {
    const runner = new TransitionRunner();
    const order: string[] = [];

    await runner.runPage({
      data: testData,
      transition: {
        before: () => order.push("before"),
        beforeLeave: () => order.push("beforeLeave"),
        leave: () => order.push("leave"),
        afterLeave: () => order.push("afterLeave"),
        beforeEnter: () => order.push("beforeEnter"),
        enter: () => order.push("enter"),
        afterEnter: () => order.push("afterEnter"),
        after: () => order.push("after"),
      },
      finalize: async () => {
        order.push("finalize");
      },
    });

    expect(order).toEqual([
      "before",
      "beforeLeave",
      "leave",
      "afterLeave",
      "beforeEnter",
      "enter",
      "afterEnter",
      "finalize",
      "after",
    ]);
  });

  it("runs beforeEnter before enter in sync transitions", async () => {
    const runner = new TransitionRunner();
    const order: string[] = [];

    await runner.runPage({
      data: testData,
      transition: {
        sync: true,
        beforeLeave: () => order.push("beforeLeave"),
        beforeEnter: () => order.push("beforeEnter"),
        leave: async () => {
          order.push("leave");
        },
        enter: async () => {
          order.push("enter");
        },
      },
      finalize: async () => {
        order.push("finalize");
      },
    });

    expect(order.indexOf("beforeEnter")).toBeGreaterThan(-1);
    expect(order.indexOf("enter")).toBeGreaterThan(-1);
    expect(order.indexOf("beforeEnter")).toBeLessThan(order.indexOf("enter"));
    expect(order[order.length - 1]).toBe("finalize");
  });

  it("runs once transition hooks in order", async () => {
    const runner = new TransitionRunner();
    const order: string[] = [];

    await runner.runOnce({
      data: testData,
      transition: {
        beforeOnce: () => order.push("beforeOnce"),
        once: () => order.push("once"),
        afterOnce: () => order.push("afterOnce"),
      },
    });

    expect(order).toEqual(["beforeOnce", "once", "afterOnce"]);
  });
});
