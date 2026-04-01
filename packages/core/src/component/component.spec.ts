import { describe, it, expect, vi, beforeEach } from "vitest";
import { Component } from "./component.js";
import { Riba } from "../riba.js";
import { DotAdapter } from "../adapters/dot.adapter.js";
import { TextBinder } from "../binders/text.binder.js";
import type { TemplateFunction, ScopeBase } from "../types/index.js";

let tagCounter = 0;
function uniqueTag() {
  return `test-comp-${++tagCounter}`;
}

function defineTestComponent(
  tag: string,
  opts: {
    observedAttrs?: string[];
    requiredAttrs?: string[];
    scopeDefaults?: Record<string, any>;
    templateHtml?: string | null;
  } = {},
) {
  const {
    observedAttrs = [],
    requiredAttrs = [],
    scopeDefaults = {},
    templateHtml = null,
  } = opts;

  class TestComp extends Component {
    static tagName = tag;
    static get observedAttributes() {
      return observedAttrs;
    }
    public scope: ScopeBase = { ...scopeDefaults };

    connectedCallback() {
      super.connectedCallback();
      this.init(TestComp.observedAttributes);
    }

    protected requiredAttributes(): string[] {
      return requiredAttrs;
    }

    protected template(): ReturnType<TemplateFunction> {
      return templateHtml;
    }
  }

  customElements.define(tag, TestComp);
  return TestComp;
}

describe("Component", () => {
  let riba: Riba;

  beforeEach(() => {
    riba = new Riba();
    riba.module.adapter.register(new DotAdapter());
    riba.module.binder.register(TextBinder);
  });

  describe("lifecycle", () => {
    it("sets connected flag after connectedCallback", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      // connectedCallback fires synchronously
      expect(el.connected).toBe(true);
      el.remove();
    });

    it("becomes bound after init completes", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        templateHtml: "<span>hello</span>",
      });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      // Wait for async init to complete
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(true);
      el.remove();
    });

    it("renders template into shadow DOM or innerHTML", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        templateHtml: "<span>content</span>",
      });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      expect(el.querySelector("span")?.textContent).toBe("content");
      el.remove();
    });

    it("returns null template without error", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, { templateHtml: null });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(true);
      el.remove();
    });
  });

  describe("bindIfReady guard", () => {
    it("does not rebind if already bound", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(true);

      // Trying to trigger bindIfReady again should be a no-op
      const boundBefore = el.bound;
      el.setAttribute("data-dummy", "trigger");
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(boundBefore);
      el.remove();
    });
  });

  describe("checkRequiredAttributes", () => {
    it("delays binding until required attribute is set", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        observedAttrs: ["name"],
        requiredAttrs: ["name"],
        scopeDefaults: { name: undefined },
      });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      // Not bound yet because "name" is not set
      expect(el.bound).toBe(false);

      el.setAttribute("name", "Alice");
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(true);
      el.remove();
    });

    it("considers empty array as not fulfilling requirement", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        observedAttrs: ["items"],
        requiredAttrs: ["items"],
        scopeDefaults: { items: [] },
      });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(false);
      el.remove();
    });

    it("considers zero as a valid value", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        observedAttrs: ["count"],
        requiredAttrs: ["count"],
        scopeDefaults: { count: undefined },
      });
      const el = document.createElement(tag);
      el.setAttribute("count", "0");
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      expect(el.bound).toBe(true);
      el.remove();
    });
  });

  describe("scope binding", () => {
    it("binds scope properties to template", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag, {
        scopeDefaults: { message: "hello" },
        templateHtml: "<span rv-text='message'></span>",
      });
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 100));
      expect(el.querySelector("span")?.textContent).toBe("hello");
      el.remove();
    });
  });

  describe("disconnectedCallback", () => {
    it("sets disconnected flag on removal", async () => {
      const tag = uniqueTag();
      defineTestComponent(tag);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      await new Promise((r) => setTimeout(r, 50));
      el.remove();
      expect(el.disconnected).toBe(true);
    });
  });
});
