import { describe, it, expect, vi, beforeEach } from "vitest";
import { Riba } from "./riba.js";
import { dotAdapter, DotAdapter } from "./adapters/dot.adapter.js";
import { TextBinder } from "./binders/text.binder.js";
import { ValueBinder } from "./binders/value.binder.js";
import type { Formatter } from "./types/index.js";

describe("Binder core mechanics", () => {
  let riba: Riba;

  beforeEach(() => {
    riba = new Riba();
    riba.module.adapter.register(new DotAdapter());
    riba.module.binder.register(TextBinder);
    riba.module.binder.register(ValueBinder);
  });

  describe("formatter pipeline (read)", () => {
    it("applies a single formatter to the value", () => {
      const upcaseFormatter: Formatter = {
        name: "upcase",
        read: (v: string) => v.toUpperCase(),
      };
      riba.module.formatter.register(upcaseFormatter);

      const el = document.createElement("div");
      el.setAttribute("rv-text", "name | upcase");
      const model = { name: "alice" };
      riba.bind(el, model);
      expect(el.textContent).toBe("ALICE");
    });

    it("chains multiple formatters in order", () => {
      riba.module.formatter.register({
        name: "append",
        read: (v: string, suffix: string) => v + suffix,
      });
      riba.module.formatter.register({
        name: "upcase",
        read: (v: string) => v.toUpperCase(),
      });

      const el = document.createElement("div");
      el.setAttribute("rv-text", "name | append '!' | upcase");
      const model = { name: "hello" };
      riba.bind(el, model);
      expect(el.textContent).toBe("HELLO!");
    });

    it("reflects model changes through the formatter pipeline", () => {
      riba.module.formatter.register({
        name: "double",
        read: (v: number) => v * 2,
      });

      const el = document.createElement("div");
      el.setAttribute("rv-text", "count | double");
      const model = { count: 5 };
      riba.bind(el, model);
      expect(el.textContent).toBe("10");

      model.count = 7;
      expect(el.textContent).toBe("14");
    });

    it("skips missing formatters gracefully", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name | nonexistent");
      const model = { name: "test" };
      riba.bind(el, model);
      // Should still render the original value
      expect(el.textContent).toBe("test");
      warnSpy.mockRestore();
    });
  });

  describe("two-way binding (publish)", () => {
    it("publishes input value back to model", () => {
      const el = document.createElement("input");
      el.setAttribute("rv-value", "name");
      const model = { name: "original" };
      const view = riba.bind(el, model);

      el.value = "changed";
      el.dispatchEvent(new Event("input"));

      expect(model.name).toBe("changed");
      view.unbind();
    });

    it("applies publish formatters in reverse order", () => {
      riba.module.formatter.register({
        name: "trim",
        read: (v: string) => v.trim(),
        publish: (v: string) => v.trim(),
      });

      const el = document.createElement("input");
      el.setAttribute("rv-value", "name | trim");
      const model = { name: "" };
      const view = riba.bind(el, model);

      el.value = "  padded  ";
      el.dispatchEvent(new Event("input"));

      expect(model.name).toBe("padded");
      view.unbind();
    });

    it("passes through when formatter has no publish method", () => {
      riba.module.formatter.register({
        name: "upcase",
        read: (v: string) => v.toUpperCase(),
        // no publish method
      });

      const el = document.createElement("input");
      el.setAttribute("rv-value", "name | upcase");
      const model = { name: "" };
      const view = riba.bind(el, model);

      // Read direction should uppercase
      model.name = "hello";
      expect(el.value).toBe("HELLO");

      // Publish direction: no publish method, value passes through as-is
      el.value = "world";
      el.dispatchEvent(new Event("input"));
      expect(model.name).toBe("world");
      view.unbind();
    });
  });

  describe("bind/unbind lifecycle", () => {
    it("sets initial value on bind (preloadData)", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "initial" };
      riba.bind(el, model);
      expect(el.textContent).toBe("initial");
    });

    it("stops reacting to changes after unbind", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "before" };
      const view = riba.bind(el, model);
      expect(el.textContent).toBe("before");

      view.unbind();
      model.name = "after";
      expect(el.textContent).toBe("before");
    });

    it("resumes reacting after rebind", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "start" };
      const view = riba.bind(el, model);

      view.unbind();
      view.bind();

      model.name = "rebound";
      expect(el.textContent).toBe("rebound");
    });

    it("cleans up formatter observers on unbind", () => {
      riba.module.formatter.register({
        name: "add",
        read: (a: number, b: number) => a + b,
      });

      const el = document.createElement("div");
      el.setAttribute("rv-text", "a | add b");
      const model = { a: 1, b: 2 };
      const view = riba.bind(el, model);
      expect(el.textContent).toBe("3");

      view.unbind();
      model.b = 10;
      // Should not update since unbound
      expect(el.textContent).toBe("3");
    });
  });

  describe("formatter with keypath arguments", () => {
    it("resolves keypath arguments from the model", () => {
      riba.module.formatter.register({
        name: "add",
        read: (a: number, b: number) => a + b,
      });

      const el = document.createElement("div");
      el.setAttribute("rv-text", "a | add b");
      const model = { a: 10, b: 5 };
      riba.bind(el, model);
      expect(el.textContent).toBe("15");
    });

    it("reacts to keypath argument changes", () => {
      riba.module.formatter.register({
        name: "add",
        read: (a: number, b: number) => a + b,
      });

      const el = document.createElement("div");
      el.setAttribute("rv-text", "a | add b");
      const model = { a: 10, b: 5 };
      riba.bind(el, model);
      expect(el.textContent).toBe("15");

      model.b = 20;
      expect(el.textContent).toBe("30");
    });
  });
});
