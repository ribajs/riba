import { describe, it, expect, beforeEach, vi } from "vitest";
import { Observer } from "./observer.js";
import { dotAdapter, DotAdapter } from "./adapters/dot.adapter.js";

function setupObserver() {
  Observer.updateOptions({
    adapters: { ".": dotAdapter },
    rootInterface: ".",
  });
}

describe("Observer", () => {
  beforeEach(() => {
    // Fresh adapter instance to avoid cross-test pollution
    const freshAdapter = new DotAdapter();
    Observer.updateOptions({
      adapters: { ".": freshAdapter },
      rootInterface: ".",
    });
  });

  describe("tokenize", () => {
    it("splits a simple keypath into tokens", () => {
      const tokens = Observer.tokenize("user.name", ".");
      expect(tokens).toEqual([
        { i: ".", path: "user" },
        { i: ".", path: "name" },
      ]);
    });

    it("returns a single token for a simple key", () => {
      const tokens = Observer.tokenize("name", ".");
      expect(tokens).toEqual([{ i: ".", path: "name" }]);
    });

    it("handles deeply nested keypaths", () => {
      const tokens = Observer.tokenize("a.b.c.d", ".");
      expect(tokens).toHaveLength(4);
      expect(tokens[3]).toEqual({ i: ".", path: "d" });
    });
  });

  describe("constructor and value()", () => {
    it("reads the initial value of a simple keypath", () => {
      const model = { name: "Alice" };
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "name", cb);
      expect(obs.value()).toBe("Alice");
    });

    it("reads the initial value of a nested keypath", () => {
      const model = { user: { name: "Bob" } };
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "user.name", cb);
      expect(obs.value()).toBe("Bob");
    });

    it("returns undefined for unreachable path", () => {
      const model = { user: undefined } as any;
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "user.name", cb);
      expect(obs.value()).toBeUndefined();
    });
  });

  describe("observation and sync", () => {
    it("fires callback when observed value changes", () => {
      const model = { count: 0 };
      const cb = { sync: vi.fn() };
      new Observer(model, "count", cb);
      model.count = 1;
      expect(cb.sync).toHaveBeenCalled();
    });

    it("fires callback when nested value changes", () => {
      const model = { user: { name: "Alice" } };
      const cb = { sync: vi.fn() };
      new Observer(model, "user.name", cb);
      model.user.name = "Bob";
      expect(cb.sync).toHaveBeenCalled();
    });

    it("does not fire when set to the same value", () => {
      const model = { count: 5 };
      const cb = { sync: vi.fn() };
      new Observer(model, "count", cb);
      model.count = 5;
      expect(cb.sync).not.toHaveBeenCalled();
    });

    it("handles intermediate path replacement", () => {
      const model = { user: { name: "Alice" } };
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "user.name", cb);

      // Replace the intermediate object
      model.user = { name: "Charlie" };
      // Observer.sync is called via the adapter, then re-realizes
      obs.sync();
      expect(obs.value()).toBe("Charlie");
    });
  });

  describe("setValue", () => {
    it("sets the value at the end of the keypath", () => {
      const model = { name: "Alice" };
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "name", cb);
      obs.setValue("Bob");
      expect(model.name).toBe("Bob");
    });

    it("is a no-op when target is unreachable", () => {
      const model = { user: undefined } as any;
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "user.name", cb);
      // Should not throw
      obs.setValue("test");
    });
  });

  describe("unobserve", () => {
    it("stops firing callbacks after unobserve", () => {
      const model = { count: 0 };
      const cb = { sync: vi.fn() };
      const obs = new Observer(model, "count", cb);
      obs.unobserve();
      model.count = 99;
      expect(cb.sync).not.toHaveBeenCalled();
    });
  });

  describe("getRootObject with scope chain", () => {
    it("finds property in parent scope", () => {
      const parent = { color: "red" };
      const child = { $parent: parent } as any;
      const cb = { sync: vi.fn() };
      const obs = new Observer(child, "color", cb);
      expect(obs.value()).toBe("red");
    });

    it("uses local scope when property exists locally", () => {
      const parent = { color: "red" };
      const child = { $parent: parent, color: "blue" } as any;
      const cb = { sync: vi.fn() };
      const obs = new Observer(child, "color", cb);
      expect(obs.value()).toBe("blue");
    });

    it("returns root scope when property not found in chain", () => {
      const parent = {} as any;
      const child = { $parent: parent } as any;
      const cb = { sync: vi.fn() };
      const obs = new Observer(child, "missing", cb);
      // Falls back to root (child), value is undefined
      expect(obs.value()).toBeUndefined();
    });
  });
});
