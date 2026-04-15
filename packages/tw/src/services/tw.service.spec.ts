import { describe, it, expect, beforeEach } from "vitest";
import { TwService } from "./tw.service.js";
import { DEFAULT_MODULE_OPTIONS } from "../constants/index.js";

describe("TwService", () => {
  beforeEach(() => {
    // Reset the singleton between tests
    (TwService as any).instance = undefined;
  });

  function createService() {
    return TwService.setSingleton({ ...DEFAULT_MODULE_OPTIONS });
  }

  describe("singleton", () => {
    it("creates a singleton with setSingleton()", () => {
      const service = createService();
      expect(service).toBeInstanceOf(TwService);
    });

    it("returns the same instance from getSingleton()", () => {
      const service = createService();
      expect(TwService.getSingleton()).toBe(service);
    });

    it("throws when getSingleton() is called before setSingleton()", () => {
      expect(() => TwService.getSingleton()).toThrow();
    });

    it("throws when setSingleton() is called twice", () => {
      createService();
      expect(() => TwService.setSingleton()).toThrow(
        /already defined/,
      );
    });
  });

  describe("breakpointNames", () => {
    it("returns the names of all breakpoints in order", () => {
      const service = createService();
      expect(service.breakpointNames).toEqual([
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
      ]);
    });
  });

  describe("getBreakpointByDimension()", () => {
    it("returns null for a width smaller than the smallest breakpoint", () => {
      const service = createService();
      // 500 < 640 (sm), so no breakpoint matched
      expect(service.getBreakpointByDimension(500)).toBeNull();
    });

    it("returns sm for width 640 (exactly at sm)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(640);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("sm");
    });

    it("returns sm for width 700 (between sm and md)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(700);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("sm");
    });

    it("returns md for width 800 (between md and lg)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(800);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("md");
    });

    it("returns lg for width 1100 (between lg and xl)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(1100);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("lg");
    });

    it("returns xl for width 1300 (between xl and 2xl)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(1300);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("xl");
    });

    it("returns 2xl for width 1600 (above 2xl)", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(1600);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("2xl");
    });

    it("returns 2xl for width exactly at 1536", () => {
      const service = createService();
      const bp = service.getBreakpointByDimension(1536);
      expect(bp).not.toBeNull();
      expect(bp!.name).toBe("2xl");
    });
  });

  describe("getBreakpointByName()", () => {
    it("returns the breakpoint object for a valid name", () => {
      const service = createService();
      const bp = service.getBreakpointByName("md");
      expect(bp).not.toBeNull();
      expect(bp!.dimension).toBe(768);
    });

    it("returns null for an unknown name", () => {
      const service = createService();
      expect(service.getBreakpointByName("xxl")).toBeNull();
    });

    it("returns the correct object for each known breakpoint name", () => {
      const service = createService();
      const expected: Record<string, number> = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      };
      for (const [name, dim] of Object.entries(expected)) {
        const bp = service.getBreakpointByName(name);
        expect(bp).not.toBeNull();
        expect(bp!.dimension).toBe(dim);
      }
    });
  });

  describe("getNextBreakpointByName()", () => {
    it("returns the next breakpoint name", () => {
      const service = createService();
      expect(service.getNextBreakpointByName("sm")).toBe("md");
      expect(service.getNextBreakpointByName("md")).toBe("lg");
      expect(service.getNextBreakpointByName("lg")).toBe("xl");
      expect(service.getNextBreakpointByName("xl")).toBe("2xl");
    });

    it("returns null for the last breakpoint", () => {
      const service = createService();
      expect(service.getNextBreakpointByName("2xl")).toBeNull();
    });

    it("throws for an unknown breakpoint name", () => {
      const service = createService();
      expect(() => service.getNextBreakpointByName("xxl")).toThrow(
        /does not exist/,
      );
    });
  });

  describe("getPrevBreakpointByName()", () => {
    it("returns the previous breakpoint name", () => {
      const service = createService();
      expect(service.getPrevBreakpointByName("2xl")).toBe("xl");
      expect(service.getPrevBreakpointByName("xl")).toBe("lg");
      expect(service.getPrevBreakpointByName("lg")).toBe("md");
      expect(service.getPrevBreakpointByName("md")).toBe("sm");
    });

    it("returns null for the first breakpoint", () => {
      const service = createService();
      expect(service.getPrevBreakpointByName("sm")).toBeNull();
    });

    it("throws for an unknown breakpoint name", () => {
      const service = createService();
      expect(() => service.getPrevBreakpointByName("xxl")).toThrow(
        /does not exist/,
      );
    });
  });

  describe("isBreakpointGreaterThan()", () => {
    it("returns true when the first breakpoint is larger", () => {
      const service = createService();
      expect(service.isBreakpointGreaterThan("lg", "sm")).toBe(true);
    });

    it("returns false when the first breakpoint is smaller", () => {
      const service = createService();
      expect(service.isBreakpointGreaterThan("sm", "lg")).toBe(false);
    });

    it("returns false when comparing the same breakpoint", () => {
      const service = createService();
      expect(service.isBreakpointGreaterThan("md", "md")).toBe(false);
    });

    it("returns null when one of the breakpoints does not exist", () => {
      const service = createService();
      expect(service.isBreakpointGreaterThan("xxl", "sm")).toBeNull();
    });
  });

  describe("isBreakpointSmallerThan()", () => {
    it("returns true when the first breakpoint is smaller", () => {
      const service = createService();
      expect(service.isBreakpointSmallerThan("sm", "lg")).toBe(true);
    });

    it("returns false when the first breakpoint is larger", () => {
      const service = createService();
      expect(service.isBreakpointSmallerThan("lg", "sm")).toBe(false);
    });

    it("returns false when comparing the same breakpoint", () => {
      const service = createService();
      expect(service.isBreakpointSmallerThan("md", "md")).toBe(false);
    });

    it("returns null when one of the breakpoints does not exist", () => {
      const service = createService();
      expect(service.isBreakpointSmallerThan("sm", "xxl")).toBeNull();
    });
  });

  describe("options", () => {
    it("exposes the options passed at construction", () => {
      const service = createService();
      expect(service.options.breakpoints).toHaveLength(5);
      expect(service.options.allowStoreDataInBrowser).toBe(true);
    });
  });
});
