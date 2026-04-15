import { describe, it, expect, beforeEach, vi } from "vitest";
import { CollapseService } from "./collapse.service.js";

describe("CollapseService", () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement("div");
    // jsdom returns "" for getComputedStyle().transitionDuration, so
    // the constructor will fall back to the default 300ms.
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  describe("constructor", () => {
    it("initializes as shown when element has no hidden class and no show option", () => {
      const collapse = new CollapseService(el);
      expect(collapse.isShown).toBe(true);
      expect(collapse.isCollapsed).toBe(false);
    });

    it("initializes as hidden when element has the hidden class", () => {
      el.classList.add("hidden");
      const collapse = new CollapseService(el);
      expect(collapse.isShown).toBe(false);
      expect(collapse.isCollapsed).toBe(true);
    });

    it("initializes as shown when show option is true", () => {
      el.classList.add("hidden");
      const collapse = new CollapseService(el, { show: true });
      expect(collapse.isShown).toBe(true);
    });

    it("initializes as hidden when show option is false", () => {
      const collapse = new CollapseService(el, { show: false });
      expect(collapse.isShown).toBe(false);
      expect(el.classList.contains("hidden")).toBe(true);
      expect(el.style.maxHeight).toBe("0px");
      expect(el.style.overflow).toBe("hidden");
    });
  });

  describe("show()", () => {
    it("removes the hidden class", () => {
      el.classList.add("hidden");
      const collapse = new CollapseService(el, { show: false });
      collapse.show();
      expect(el.classList.contains("hidden")).toBe(false);
    });

    it("sets isShown to true", () => {
      const collapse = new CollapseService(el, { show: false });
      collapse.show();
      expect(collapse.isShown).toBe(true);
      expect(collapse.isCollapsed).toBe(false);
    });

    it("dispatches tw.collapse.show event", () => {
      const collapse = new CollapseService(el, { show: false });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.show", handler);
      collapse.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already shown", () => {
      const collapse = new CollapseService(el, { show: true });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.show", handler);
      collapse.show();
      expect(handler).not.toHaveBeenCalled();
    });

    it("dispatches tw.collapse.shown event after transition", () => {
      vi.useFakeTimers();
      const collapse = new CollapseService(el, { show: false });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.shown", handler);
      collapse.show();

      // Not fired yet
      expect(handler).not.toHaveBeenCalled();

      // After transition duration (default 300ms)
      vi.advanceTimersByTime(300);
      expect(handler).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });
  });

  describe("hide()", () => {
    it("sets maxHeight to 0", () => {
      const collapse = new CollapseService(el, { show: true });
      collapse.hide();
      expect(el.style.maxHeight).toBe("0px");
    });

    it("sets isShown to false", () => {
      const collapse = new CollapseService(el, { show: true });
      collapse.hide();
      expect(collapse.isShown).toBe(false);
      expect(collapse.isCollapsed).toBe(true);
    });

    it("dispatches tw.collapse.hide event", () => {
      const collapse = new CollapseService(el, { show: true });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.hide", handler);
      collapse.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already hidden", () => {
      const collapse = new CollapseService(el, { show: false });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.hide", handler);
      collapse.hide();
      expect(handler).not.toHaveBeenCalled();
    });

    it("adds hidden class after transition duration", () => {
      vi.useFakeTimers();
      const collapse = new CollapseService(el, { show: true });
      collapse.hide();

      // hidden class not added immediately
      expect(el.classList.contains("hidden")).toBe(false);

      vi.advanceTimersByTime(300);
      expect(el.classList.contains("hidden")).toBe(true);
      vi.useRealTimers();
    });

    it("dispatches tw.collapse.hidden event after transition", () => {
      vi.useFakeTimers();
      const collapse = new CollapseService(el, { show: true });
      const handler = vi.fn();
      el.addEventListener("tw.collapse.hidden", handler);
      collapse.hide();

      expect(handler).not.toHaveBeenCalled();
      vi.advanceTimersByTime(300);
      expect(handler).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });
  });

  describe("toggle()", () => {
    it("hides when currently shown", () => {
      const collapse = new CollapseService(el, { show: true });
      collapse.toggle();
      expect(collapse.isShown).toBe(false);
    });

    it("shows when currently hidden", () => {
      const collapse = new CollapseService(el, { show: false });
      collapse.toggle();
      expect(collapse.isShown).toBe(true);
    });

    it("round-trips correctly: shown -> hidden -> shown", () => {
      const collapse = new CollapseService(el, { show: true });
      collapse.toggle();
      expect(collapse.isCollapsed).toBe(true);
      collapse.toggle();
      expect(collapse.isShown).toBe(true);
    });
  });

  describe("isShown / isCollapsed", () => {
    it("isShown and isCollapsed are always complementary", () => {
      const collapse = new CollapseService(el, { show: true });
      expect(collapse.isShown).toBe(true);
      expect(collapse.isCollapsed).toBe(false);

      collapse.hide();
      expect(collapse.isShown).toBe(false);
      expect(collapse.isCollapsed).toBe(true);
    });
  });

  describe("dispose()", () => {
    it("clears maxHeight and overflow styles", () => {
      const collapse = new CollapseService(el, { show: false });
      // After constructor, styles are set
      expect(el.style.maxHeight).toBe("0px");
      expect(el.style.overflow).toBe("hidden");

      collapse.dispose();
      expect(el.style.maxHeight).toBe("");
      expect(el.style.overflow).toBe("");
    });
  });
});
