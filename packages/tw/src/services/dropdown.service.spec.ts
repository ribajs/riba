import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("@floating-ui/dom", () => ({
  computePosition: vi
    .fn()
    .mockResolvedValue({ x: 0, y: 0, middlewareData: {}, placement: "bottom-start" }),
  flip: vi.fn(() => ({})),
  shift: vi.fn(() => ({})),
  offset: vi.fn(() => ({})),
  autoUpdate: vi.fn(() => () => {}),
}));

import { DropdownService } from "./dropdown.service.js";

describe("DropdownService", () => {
  let trigger: HTMLElement;
  let menu: HTMLElement;

  beforeEach(() => {
    trigger = document.createElement("button");
    menu = document.createElement("div");
    document.body.appendChild(trigger);
    document.body.appendChild(menu);
  });

  afterEach(() => {
    trigger.remove();
    menu.remove();
  });

  describe("constructor", () => {
    it("creates service without throwing", () => {
      expect(() => new DropdownService(trigger, menu)).not.toThrow();
    });

    it("hides the menu initially", () => {
      new DropdownService(trigger, menu);
      expect(menu.style.display).toBe("none");
    });
  });

  describe("isShown", () => {
    it("defaults to false", () => {
      const dropdown = new DropdownService(trigger, menu);
      expect(dropdown.isShown).toBe(false);
    });
  });

  describe("show()", () => {
    it("makes menu visible and sets isShown to true", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      expect(menu.style.display).not.toBe("none");
      expect(dropdown.isShown).toBe(true);
    });

    it("dispatches tw.dropdown.show event", () => {
      const dropdown = new DropdownService(trigger, menu);
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.show", handler);
      dropdown.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.dropdown.shown event", () => {
      const dropdown = new DropdownService(trigger, menu);
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.shown", handler);
      dropdown.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already shown", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.show", handler);
      dropdown.show();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("hide()", () => {
    it("hides menu and sets isShown to false", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      dropdown.hide();
      expect(menu.style.display).toBe("none");
      expect(dropdown.isShown).toBe(false);
    });

    it("dispatches tw.dropdown.hide event", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.hide", handler);
      dropdown.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.dropdown.hidden event", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.hidden", handler);
      dropdown.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already hidden", () => {
      const dropdown = new DropdownService(trigger, menu);
      const handler = vi.fn();
      trigger.addEventListener("tw.dropdown.hide", handler);
      dropdown.hide();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("toggle()", () => {
    it("shows when currently hidden", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.toggle();
      expect(dropdown.isShown).toBe(true);
    });

    it("hides when currently shown", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      dropdown.toggle();
      expect(dropdown.isShown).toBe(false);
    });

    it("round-trips correctly: hidden -> shown -> hidden", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.toggle();
      expect(dropdown.isShown).toBe(true);
      dropdown.toggle();
      expect(dropdown.isShown).toBe(false);
    });
  });

  describe("dispose()", () => {
    it("hides the menu if shown", () => {
      const dropdown = new DropdownService(trigger, menu);
      dropdown.show();
      dropdown.dispose();
      expect(dropdown.isShown).toBe(false);
      expect(menu.style.display).toBe("none");
    });

    it("does not throw when called on an already-hidden dropdown", () => {
      const dropdown = new DropdownService(trigger, menu);
      expect(() => dropdown.dispose()).not.toThrow();
    });
  });
});
