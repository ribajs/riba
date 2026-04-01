import { describe, it, expect } from "vitest";
import {
  setAttribute,
  getDataset,
  getInputValue,
  elementIsHidden,
  elementIsVisible,
  getUID,
  isCustomElement,
  htmlToElement,
  htmlToElements,
  toArray,
  getElementIndex,
  hasChildNodesTrim,
  getElementFromEvent,
} from "./dom.js";

describe("DOM utilities", () => {
  describe("setAttribute", () => {
    it("sets a string attribute", () => {
      const el = document.createElement("div");
      const result = setAttribute(el, "data-name", "Alice");
      expect(el.getAttribute("data-name")).toBe("Alice");
      expect(result.changed).toBe(true);
    });

    it("converts numbers to strings", () => {
      const el = document.createElement("div");
      setAttribute(el, "data-count", 42);
      expect(el.getAttribute("data-count")).toBe("42");
    });

    it("serializes objects to JSON", () => {
      const el = document.createElement("div");
      setAttribute(el, "data-config", { a: 1 });
      const val = el.getAttribute("data-config");
      expect(val).toContain('"a":1');
    });

    it("removes attribute when value is null", () => {
      const el = document.createElement("div");
      el.setAttribute("data-test", "value");
      setAttribute(el, "data-test", null);
      expect(el.hasAttribute("data-test")).toBe(false);
    });

    it("reports no change when value is identical", () => {
      const el = document.createElement("div");
      el.setAttribute("data-name", "same");
      const result = setAttribute(el, "data-name", "same");
      expect(result.changed).toBe(false);
    });
  });

  describe("getDataset", () => {
    it("returns data attributes as an object", () => {
      const el = document.createElement("div");
      el.setAttribute("data-name", "Alice");
      el.setAttribute("data-age", "30");
      const dataset = getDataset(el);
      expect(dataset.name).toBe("Alice");
    });
  });

  describe("getInputValue", () => {
    it("returns value from text input", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = "hello";
      expect(getInputValue(input)).toBe("hello");
    });

    it("returns checked state from checkbox", () => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      expect(getInputValue(checkbox)).toBe(true);
    });

    it("returns unchecked state from checkbox", () => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;
      expect(getInputValue(checkbox)).toBe(false);
    });
  });

  describe("elementIsHidden / elementIsVisible", () => {
    it("detects hidden element (display: none)", () => {
      const el = document.createElement("div");
      el.style.display = "none";
      document.body.appendChild(el);
      expect(elementIsHidden(el)).toBe(true);
      expect(elementIsVisible(el)).toBe(false);
      el.remove();
    });
  });

  describe("getUID", () => {
    it("returns a string starting with the prefix", () => {
      const uid = getUID("test");
      expect(uid.startsWith("test")).toBe(true);
    });

    it("returns unique values on consecutive calls", () => {
      const uid1 = getUID("x");
      const uid2 = getUID("x");
      expect(uid1).not.toBe(uid2);
    });
  });

  describe("isCustomElement", () => {
    it("returns true for elements with a dash in the tag name", () => {
      const el = document.createElement("my-component");
      expect(isCustomElement(el)).toBe(true);
    });

    it("returns false for standard HTML elements", () => {
      const el = document.createElement("div");
      expect(isCustomElement(el)).toBe(false);
    });
  });

  describe("htmlToElement", () => {
    it("creates a single element from HTML string", () => {
      const el = htmlToElement("<p>Hello</p>") as HTMLElement;
      expect(el).not.toBeNull();
      expect(el.tagName).toBe("P");
      expect(el.textContent).toBe("Hello");
    });
  });

  describe("htmlToElements", () => {
    it("creates multiple elements from HTML string", () => {
      const els = htmlToElements("<p>A</p><p>B</p>");
      expect(els.length).toBe(2);
    });
  });

  describe("toArray", () => {
    it("converts NodeList to array", () => {
      const container = document.createElement("div");
      container.append(
        document.createElement("span"),
        document.createElement("span"),
      );
      const arr = toArray(container.childNodes);
      expect(Array.isArray(arr)).toBe(true);
      expect(arr).toHaveLength(2);
    });
  });

  describe("getElementIndex", () => {
    it("returns the index of an element among siblings", () => {
      const parent = document.createElement("div");
      const c0 = document.createElement("span");
      const c1 = document.createElement("span");
      const c2 = document.createElement("span");
      parent.append(c0, c1, c2);
      expect(getElementIndex(c0)).toBe(0);
      expect(getElementIndex(c1)).toBe(1);
      expect(getElementIndex(c2)).toBe(2);
    });

    it("returns -1 for null", () => {
      expect(getElementIndex(null)).toBe(-1);
    });
  });

  describe("hasChildNodesTrim", () => {
    it("returns false for empty element", () => {
      const el = document.createElement("div") as HTMLUnknownElement;
      expect(hasChildNodesTrim(el)).toBe(false);
    });

    it("returns true for element with child element", () => {
      const el = document.createElement("div") as HTMLUnknownElement;
      el.appendChild(document.createElement("span"));
      expect(hasChildNodesTrim(el)).toBe(true);
    });
  });

  describe("getElementFromEvent", () => {
    it("extracts target element from event", () => {
      const el = document.createElement("a");
      const event = new MouseEvent("click");
      Object.defineProperty(event, "target", { value: el });
      expect(getElementFromEvent(event)).toBe(el);
    });
  });
});
