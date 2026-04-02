import { describe, it, expect } from "vitest";
import {
  DEFAULT_BP_SM,
  DEFAULT_BP_MD,
  DEFAULT_BP_LG,
  DEFAULT_BP_XL,
  DEFAULT_BP_2XL,
  DEFAULT_MODULE_OPTIONS,
  TOGGLE_BUTTON,
  TOGGLE_ATTRIBUTE,
  TOGGLE_CLASS,
} from "./index.js";

describe("tw constants", () => {
  describe("DEFAULT_MODULE_OPTIONS", () => {
    it("contains the five default Tailwind breakpoints", () => {
      expect(DEFAULT_MODULE_OPTIONS.breakpoints).toHaveLength(5);
    });

    it("defines sm at 640px", () => {
      expect(DEFAULT_BP_SM).toEqual({ dimension: 640, name: "sm" });
    });

    it("defines md at 768px", () => {
      expect(DEFAULT_BP_MD).toEqual({ dimension: 768, name: "md" });
    });

    it("defines lg at 1024px", () => {
      expect(DEFAULT_BP_LG).toEqual({ dimension: 1024, name: "lg" });
    });

    it("defines xl at 1280px", () => {
      expect(DEFAULT_BP_XL).toEqual({ dimension: 1280, name: "xl" });
    });

    it("defines 2xl at 1536px", () => {
      expect(DEFAULT_BP_2XL).toEqual({ dimension: 1536, name: "2xl" });
    });

    it("has breakpoints in ascending order of dimension", () => {
      const dims = DEFAULT_MODULE_OPTIONS.breakpoints.map(
        (bp) => bp.dimension,
      );
      for (let i = 1; i < dims.length; i++) {
        expect(dims[i]).toBeGreaterThan(dims[i - 1]);
      }
    });

    it("enables allowStoreDataInBrowser by default", () => {
      expect(DEFAULT_MODULE_OPTIONS.allowStoreDataInBrowser).toBe(true);
    });
  });

  describe("TOGGLE_BUTTON", () => {
    it("has a namespace prefix", () => {
      expect(TOGGLE_BUTTON.nsPrefix).toBe("tw-toggle-button-");
    });

    it("has toggle, toggled, init, and state event names", () => {
      expect(TOGGLE_BUTTON.eventNames.toggle).toBe("toggle");
      expect(TOGGLE_BUTTON.eventNames.toggled).toBe("toggled");
      expect(TOGGLE_BUTTON.eventNames.init).toBe("init");
      expect(TOGGLE_BUTTON.eventNames.state).toBe("state");
    });
  });

  describe("TOGGLE_ATTRIBUTE", () => {
    it("has removed and added element event names", () => {
      expect(TOGGLE_ATTRIBUTE.elEventNames.removed).toBe("attribute-removed");
      expect(TOGGLE_ATTRIBUTE.elEventNames.added).toBe("attribute-added");
    });
  });

  describe("TOGGLE_CLASS", () => {
    it("has removed and added element event names", () => {
      expect(TOGGLE_CLASS.elEventNames.removed).toBe("class-removed");
      expect(TOGGLE_CLASS.elEventNames.added).toBe("class-added");
    });
  });
});
