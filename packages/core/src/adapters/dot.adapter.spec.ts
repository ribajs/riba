import { describe, it, expect, beforeEach, vi } from "vitest";
import { DotAdapter } from "./dot.adapter.js";
import type { ObserverSyncCallback } from "../types/index.js";

describe("DotAdapter", () => {
  let adapter: DotAdapter;
  let cb: ObserverSyncCallback;

  beforeEach(() => {
    adapter = new DotAdapter();
    cb = { sync: vi.fn() };
  });

  describe("get / set", () => {
    it("reads a property value", () => {
      const obj = { name: "Alice" };
      expect(adapter.get(obj, "name")).toBe("Alice");
    });

    it("writes a property value", () => {
      const obj = { name: "Alice" };
      adapter.set(obj, "name", "Bob");
      expect(obj.name).toBe("Bob");
    });
  });

  describe("observe", () => {
    it("fires callback when property changes", () => {
      const obj = { count: 0 };
      adapter.observe(obj, "count", cb);
      obj.count = 1;
      expect(cb.sync).toHaveBeenCalledOnce();
    });

    it("does not fire when set to the same value", () => {
      const obj = { count: 5 };
      adapter.observe(obj, "count", cb);
      obj.count = 5;
      expect(cb.sync).not.toHaveBeenCalled();
    });

    it("fires for multiple changes", () => {
      const obj = { count: 0 };
      adapter.observe(obj, "count", cb);
      obj.count = 1;
      obj.count = 2;
      obj.count = 3;
      expect(cb.sync).toHaveBeenCalledTimes(3);
    });

    it("supports multiple callbacks on the same property", () => {
      const obj = { name: "Alice" };
      const cb2: ObserverSyncCallback = { sync: vi.fn() };
      adapter.observe(obj, "name", cb);
      adapter.observe(obj, "name", cb2);
      obj.name = "Bob";
      expect(cb.sync).toHaveBeenCalledOnce();
      expect(cb2.sync).toHaveBeenCalledOnce();
    });

    it("observes different properties independently", () => {
      const obj = { a: 1, b: 2 };
      const cb2: ObserverSyncCallback = { sync: vi.fn() };
      adapter.observe(obj, "a", cb);
      adapter.observe(obj, "b", cb2);
      obj.a = 10;
      expect(cb.sync).toHaveBeenCalledOnce();
      expect(cb2.sync).not.toHaveBeenCalled();
    });

    it("does not overwrite existing getter/setter", () => {
      let internal = "original";
      const obj = {} as any;
      Object.defineProperty(obj, "prop", {
        get: () => internal,
        set: (v) => {
          internal = v;
        },
        configurable: true,
        enumerable: true,
      });
      adapter.observe(obj, "prop", cb);
      obj.prop = "changed";
      // Existing setter should still work
      expect(obj.prop).toBe("changed");
    });
  });

  describe("unobserve", () => {
    it("stops firing after unobserve", () => {
      const obj = { count: 0 };
      adapter.observe(obj, "count", cb);
      adapter.unobserve(obj, "count", cb);
      obj.count = 1;
      expect(cb.sync).not.toHaveBeenCalled();
    });

    it("only removes the specific callback", () => {
      const obj = { count: 0 };
      const cb2: ObserverSyncCallback = { sync: vi.fn() };
      adapter.observe(obj, "count", cb);
      adapter.observe(obj, "count", cb2);
      adapter.unobserve(obj, "count", cb);
      obj.count = 1;
      expect(cb.sync).not.toHaveBeenCalled();
      expect(cb2.sync).toHaveBeenCalledOnce();
    });
  });

  describe("array mutation detection", () => {
    it("fires callback on array push", () => {
      const obj = { items: [1, 2, 3] };
      adapter.observe(obj, "items", cb);
      obj.items.push(4);
      expect(cb.sync).toHaveBeenCalled();
    });

    it("fires callback on array splice", () => {
      const obj = { items: [1, 2, 3] };
      adapter.observe(obj, "items", cb);
      obj.items.splice(1, 1);
      expect(cb.sync).toHaveBeenCalled();
    });

    it("fires callback on array pop", () => {
      const obj = { items: [1, 2, 3] };
      adapter.observe(obj, "items", cb);
      obj.items.pop();
      expect(cb.sync).toHaveBeenCalled();
    });

    it("fires callback on array sort", () => {
      const obj = { items: [3, 1, 2] };
      adapter.observe(obj, "items", cb);
      obj.items.sort();
      expect(cb.sync).toHaveBeenCalled();
    });

    it("fires callback on array reverse", () => {
      const obj = { items: [1, 2, 3] };
      adapter.observe(obj, "items", cb);
      obj.items.reverse();
      expect(cb.sync).toHaveBeenCalled();
    });

    it("stops array mutation detection after unobserve", () => {
      const obj = { items: [1, 2] };
      adapter.observe(obj, "items", cb);
      adapter.unobserve(obj, "items", cb);
      obj.items.push(3);
      expect(cb.sync).not.toHaveBeenCalled();
    });

    it("detects mutations on a new array after reassignment", () => {
      const obj = { items: [1] };
      adapter.observe(obj, "items", cb);
      cb.sync = vi.fn(); // reset
      obj.items = [10, 20];
      cb.sync = vi.fn(); // reset after assignment notification
      obj.items.push(30);
      expect(cb.sync).toHaveBeenCalled();
    });
  });
});
