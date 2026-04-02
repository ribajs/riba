import { describe, it, expect, beforeEach, vi } from "vitest";
import { TwService } from "./tw.service.js";
import { ThemeService } from "./theme.service.js";
import { DEFAULT_MODULE_OPTIONS } from "../constants/index.js";

describe("ThemeService", () => {
  let matchMediaDark: boolean;

  beforeEach(() => {
    // Reset singletons
    (TwService as any).instance = undefined;
    (ThemeService as any).instance = undefined;

    // Clean up DOM and storage
    document.documentElement.classList.remove("dark");
    localStorage.clear();

    // Default to light mode for matchMedia
    matchMediaDark = false;

    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches:
          query === "(prefers-color-scheme: dark)" ? matchMediaDark : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Initialize TwService first (ThemeService depends on it)
    TwService.setSingleton({ ...DEFAULT_MODULE_OPTIONS });
  });

  function createService() {
    return ThemeService.getSingleton();
  }

  describe("singleton", () => {
    it("creates a singleton via getSingleton()", () => {
      const service = createService();
      expect(service).toBeInstanceOf(ThemeService);
    });

    it("returns the same instance on subsequent calls", () => {
      const a = createService();
      const b = ThemeService.getSingleton();
      expect(a).toBe(b);
    });

    it("throws when setSingleton() is called twice", () => {
      ThemeService.setSingleton();
      expect(() => ThemeService.setSingleton()).toThrow(/already defined/);
    });
  });

  describe("set()", () => {
    it('adds "dark" class to <html> when set to "dark"', () => {
      const service = createService();
      service.set("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it('removes "dark" class from <html> when set to "light"', () => {
      const service = createService();
      // First set dark
      document.documentElement.classList.add("dark");
      service.set("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it('resolves "os" to light when system preference is light', () => {
      matchMediaDark = false;
      const service = createService();
      service.set("os");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it('resolves "os" to dark when system preference is dark', () => {
      matchMediaDark = true;
      // Recreate singletons so matchMedia mock takes effect in init
      (ThemeService as any).instance = undefined;
      const service = createService();
      service.set("os");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("updates the current property", () => {
      const service = createService();
      service.set("dark");
      expect(service.current).toBe("dark");
      service.set("light");
      expect(service.current).toBe("light");
      service.set("os");
      expect(service.current).toBe("os");
    });

    it("returns ThemeData with choice and resolved fields", () => {
      const service = createService();
      const data = service.set("dark");
      expect(data.choice).toBe("dark");
      expect(data.resolved).toBe("dark");
    });

    it('falls back to "os" for an unsupported theme choice', () => {
      const service = createService();
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const data = service.set("invalid" as any);
      expect(data.choice).toBe("os");
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Unsupported theme"),
      );
      warnSpy.mockRestore();
    });
  });

  describe("getThemeData()", () => {
    it("returns the correct structure for dark", () => {
      const service = createService();
      service.set("dark");
      const data = service.getThemeData();
      expect(data).toEqual({ choice: "dark", resolved: "dark" });
    });

    it("returns the correct structure for light", () => {
      const service = createService();
      service.set("light");
      const data = service.getThemeData();
      expect(data).toEqual({ choice: "light", resolved: "light" });
    });

    it("returns the correct structure for os (light system)", () => {
      matchMediaDark = false;
      const service = createService();
      service.set("os");
      const data = service.getThemeData();
      expect(data).toEqual({ choice: "os", resolved: "light" });
    });

    it("accepts an explicit choice parameter", () => {
      const service = createService();
      const data = service.getThemeData("dark");
      expect(data).toEqual({ choice: "dark", resolved: "dark" });
    });
  });

  describe("localStorage persistence", () => {
    it("persists the theme choice to localStorage", () => {
      const service = createService();
      service.set("dark");
      expect(localStorage.getItem("tw-theme")).toBe("dark");
    });

    it("restores the theme choice from localStorage on init", () => {
      localStorage.setItem("tw-theme", "dark");
      const service = createService();
      expect(service.current).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("defaults to os when no value is stored", () => {
      const service = createService();
      // The initial set in init() uses the stored value or "os"
      expect(service.current).toBe("os");
    });

    it("does not persist when allowStoreDataInBrowser is false", () => {
      // Reset and recreate TwService with storage disabled
      (TwService as any).instance = undefined;
      TwService.setSingleton({
        ...DEFAULT_MODULE_OPTIONS,
        allowStoreDataInBrowser: false,
      });
      const service = createService();
      service.set("dark");
      expect(localStorage.getItem("tw-theme")).toBeNull();
    });
  });

  describe("onChange()", () => {
    it("fires a callback when the theme changes", () => {
      const service = createService();
      const cb = vi.fn();
      service.onChange(cb);
      service.set("dark");
      expect(cb).toHaveBeenCalledWith(
        expect.objectContaining({
          previous: expect.any(Object),
          current: expect.objectContaining({
            choice: "dark",
            resolved: "dark",
          }),
        }),
      );
    });
  });
});
