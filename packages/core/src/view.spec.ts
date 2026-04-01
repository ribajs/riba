import { describe, it, expect, beforeEach } from "vitest";
import { Riba } from "./riba.js";
import { DotAdapter } from "./adapters/dot.adapter.js";
import { TextBinder } from "./binders/text.binder.js";
import { ValueBinder } from "./binders/value.binder.js";
import { ShowBinder } from "./binders/show.binder.js";
import { IfBinder } from "./binders/if.binder.js";
import { OnEventBinder } from "./binders/on-event.binder.js";

describe("View", () => {
  let riba: Riba;

  beforeEach(() => {
    riba = new Riba();
    riba.module.adapter.register(new DotAdapter());
    riba.module.binder.register(TextBinder);
    riba.module.binder.register(ValueBinder);
    riba.module.binder.register(ShowBinder);
    riba.module.binder.register(IfBinder);
    riba.module.binder.register(OnEventBinder);
  });

  describe("build", () => {
    it("creates bindings for rv-text attributes", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const view = riba.bind(el, { name: "Alice" });
      expect(view.bindings.length).toBeGreaterThanOrEqual(1);
      expect(el.textContent).toBe("Alice");
    });

    it("creates bindings for multiple attributes on one element", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      el.setAttribute("rv-show", "visible");
      const view = riba.bind(el, { name: "Alice", visible: true });
      expect(view.bindings.length).toBeGreaterThanOrEqual(2);
    });

    it("creates bindings for child elements", () => {
      const parent = document.createElement("div");
      const child = document.createElement("span");
      child.setAttribute("rv-text", "name");
      parent.appendChild(child);
      riba.bind(parent, { name: "Bob" });
      expect(child.textContent).toBe("Bob");
    });

    it("creates bindings for mustache text nodes", () => {
      const el = document.createElement("div");
      el.textContent = "Hello { name }";
      riba.bind(el, { name: "World" });
      expect(el.textContent).toBe("Hello World");
    });
  });

  describe("block binders", () => {
    it("rv-if removes content when false", () => {
      const parent = document.createElement("div");
      const conditional = document.createElement("div");
      conditional.setAttribute("rv-if", "show");
      const span = document.createElement("span");
      span.setAttribute("rv-text", "name");
      conditional.appendChild(span);
      parent.appendChild(conditional);

      riba.bind(parent, { show: false, name: "hidden" });
      expect(parent.querySelector("span")).toBeNull();
    });

    it("rv-if renders children when true", () => {
      const parent = document.createElement("div");
      const conditional = document.createElement("div");
      conditional.setAttribute("rv-if", "show");
      const span = document.createElement("span");
      span.setAttribute("rv-text", "name");
      conditional.appendChild(span);
      parent.appendChild(conditional);

      riba.bind(parent, { show: true, name: "visible" });
      expect(parent.querySelector("span")?.textContent).toBe("visible");
    });
  });

  describe("star binder matching", () => {
    it("matches rv-on-* to OnEventBinder", () => {
      const el = document.createElement("button");
      el.setAttribute("rv-on-click", "handler");
      const handler = () => {};
      const view = riba.bind(el, { handler });
      expect(view.bindings.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("bind/unbind lifecycle", () => {
    it("bind activates all bindings", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "test" };
      riba.bind(el, model);

      model.name = "changed";
      expect(el.textContent).toBe("changed");
    });

    it("unbind deactivates all bindings", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "test" };
      const view = riba.bind(el, model);

      view.unbind();
      model.name = "changed";
      expect(el.textContent).toBe("test");
    });

    it("rebind restores reactivity", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "original" };
      const view = riba.bind(el, model);

      view.unbind();
      view.bind();

      model.name = "rebound";
      expect(el.textContent).toBe("rebound");
    });
  });

  describe("update", () => {
    it("updates model values and re-syncs bindings", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const model = { name: "old" };
      const view = riba.bind(el, model);

      view.update({ name: "new" });
      expect(el.textContent).toBe("new");
    });
  });

  describe("multiple elements", () => {
    it("parses all top-level children in a fragment", () => {
      const fragment = document.createDocumentFragment();
      const el1 = document.createElement("div");
      el1.setAttribute("rv-text", "a");
      const el2 = document.createElement("div");
      el2.setAttribute("rv-text", "b");
      fragment.appendChild(el1);
      fragment.appendChild(el2);

      riba.bind(fragment, { a: "first", b: "second" });
      expect(el1.textContent).toBe("first");
      expect(el2.textContent).toBe("second");
    });
  });
});
