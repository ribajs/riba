import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ToastService } from "./toast.service.js";

describe("ToastService", () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement("div");
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  describe("constructor", () => {
    it("creates service without throwing", () => {
      expect(() => new ToastService(el)).not.toThrow();
    });
  });

  describe("isShown", () => {
    it("defaults to false", () => {
      const toast = new ToastService(el);
      expect(toast.isShown).toBe(false);
    });

    it("is true when constructed with show: true", () => {
      const toast = new ToastService(el, { show: true });
      expect(toast.isShown).toBe(true);
    });
  });

  describe("show()", () => {
    it("removes the hidden class", () => {
      el.classList.add("hidden");
      const toast = new ToastService(el);
      toast.show();
      expect(el.classList.contains("hidden")).toBe(false);
    });

    it("adds the animate-fade-in class", () => {
      const toast = new ToastService(el);
      toast.show();
      expect(el.classList.contains("animate-fade-in")).toBe(true);
    });

    it("sets isShown to true", () => {
      const toast = new ToastService(el);
      toast.show();
      expect(toast.isShown).toBe(true);
    });

    it("dispatches tw.toast.show event", () => {
      const toast = new ToastService(el);
      const handler = vi.fn();
      el.addEventListener("tw.toast.show", handler);
      toast.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.toast.shown event", () => {
      const toast = new ToastService(el);
      const handler = vi.fn();
      el.addEventListener("tw.toast.shown", handler);
      toast.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already shown", () => {
      const toast = new ToastService(el);
      toast.show();
      const handler = vi.fn();
      el.addEventListener("tw.toast.show", handler);
      toast.show();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("hide()", () => {
    it("adds animate-fade-out class", () => {
      const toast = new ToastService(el);
      toast.show();
      toast.hide();
      expect(el.classList.contains("animate-fade-out")).toBe(true);
    });

    it("eventually adds hidden class and sets isShown to false (via fallback timeout)", () => {
      vi.useFakeTimers();
      const toast = new ToastService(el, { autoDismiss: 0 });
      toast.show();
      toast.hide();

      // Not yet hidden (waiting for animationend or fallback)
      // Advance past the 500ms fallback
      vi.advanceTimersByTime(500);

      expect(el.classList.contains("hidden")).toBe(true);
      expect(toast.isShown).toBe(false);
    });

    it("dispatches tw.toast.hide event", () => {
      const toast = new ToastService(el, { autoDismiss: 0 });
      toast.show();
      const handler = vi.fn();
      el.addEventListener("tw.toast.hide", handler);
      toast.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.toast.hidden event after animation completes", () => {
      vi.useFakeTimers();
      const toast = new ToastService(el, { autoDismiss: 0 });
      toast.show();
      const handler = vi.fn();
      el.addEventListener("tw.toast.hidden", handler);
      toast.hide();

      // Not fired yet
      expect(handler).not.toHaveBeenCalled();

      // After fallback timeout
      vi.advanceTimersByTime(500);
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already hidden", () => {
      const toast = new ToastService(el);
      const handler = vi.fn();
      el.addEventListener("tw.toast.hide", handler);
      toast.hide();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("auto-dismiss", () => {
    it("triggers hide after the specified delay", () => {
      vi.useFakeTimers();
      const toast = new ToastService(el, { autoDismiss: 2000 });
      toast.show();
      expect(toast.isShown).toBe(true);

      // Advance to just before the auto-dismiss fires
      vi.advanceTimersByTime(1999);
      expect(toast.isShown).toBe(true);

      // Advance past the auto-dismiss delay
      vi.advanceTimersByTime(1);
      // hide() was called, which adds animate-fade-out; then the 500ms fallback fires
      vi.advanceTimersByTime(500);

      expect(toast.isShown).toBe(false);
    });

    it("does not auto-dismiss when autoDismiss is 0", () => {
      vi.useFakeTimers();
      const toast = new ToastService(el, { autoDismiss: 0 });
      toast.show();

      vi.advanceTimersByTime(10000);
      expect(toast.isShown).toBe(true);
    });
  });

  describe("dispose()", () => {
    it("adds hidden class and sets isShown to false if shown", () => {
      const toast = new ToastService(el, { autoDismiss: 0 });
      toast.show();
      toast.dispose();
      expect(el.classList.contains("hidden")).toBe(true);
      expect(toast.isShown).toBe(false);
    });

    it("does not throw when called on an already-hidden toast", () => {
      const toast = new ToastService(el);
      expect(() => toast.dispose()).not.toThrow();
    });

    it("clears auto-dismiss timeout", () => {
      vi.useFakeTimers();
      const toast = new ToastService(el, { autoDismiss: 1000 });
      toast.show();
      toast.dispose();

      // Advance past the auto-dismiss delay — nothing should happen
      vi.advanceTimersByTime(2000);
      // dispose already set isShown to false; no further side effects
      expect(toast.isShown).toBe(false);
    });
  });
});
