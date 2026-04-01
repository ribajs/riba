import { describe, it, expect } from "vitest";
import { eqFormatter } from "./eq.formatter.js";
import { neFormatter } from "./ne.formatter.js";
import { gtFormatter } from "./gt.formatter.js";
import { ltFormatter } from "./lt.formatter.js";
import { egtFormatter } from "./egt.formatter.js";
import { eltFormatter } from "./elt.formatter.js";
import { andFormatter } from "./and.formatter.js";
import { orFormatter } from "./or.formatter.js";
import { notFormatter } from "./not.formatter.js";
import { betweenFormatter } from "./between.formatter.js";

describe("compare formatters", () => {
  describe("eq", () => {
    it("returns true for strictly equal values", () => {
      expect(eqFormatter.read(1, 1)).toBe(true);
      expect(eqFormatter.read("hello", "hello")).toBe(true);
    });

    it("returns false for loosely equal but not strictly equal values", () => {
      expect(eqFormatter.read(1, "1")).toBe(false);
      expect(eqFormatter.read(0, false)).toBe(false);
    });

    it("returns false for different values", () => {
      expect(eqFormatter.read(1, 2)).toBe(false);
    });
  });

  describe("ne", () => {
    it("returns true for different values", () => {
      expect(neFormatter.read(1, 2)).toBe(true);
      expect(neFormatter.read("a", "b")).toBe(true);
    });

    it("returns true for loosely equal but not strictly equal values", () => {
      expect(neFormatter.read(1, "1")).toBe(true);
    });

    it("returns false for strictly equal values", () => {
      expect(neFormatter.read(5, 5)).toBe(false);
    });
  });

  describe("gt", () => {
    it("returns true when a > b", () => {
      expect(gtFormatter.read(10, 5)).toBe(true);
    });

    it("returns false when a <= b", () => {
      expect(gtFormatter.read(5, 5)).toBe(false);
      expect(gtFormatter.read(3, 5)).toBe(false);
    });
  });

  describe("lt", () => {
    it("returns true when a < b", () => {
      expect(ltFormatter.read(3, 10)).toBe(true);
    });

    it("returns false when a >= b", () => {
      expect(ltFormatter.read(10, 10)).toBe(false);
      expect(ltFormatter.read(10, 3)).toBe(false);
    });
  });

  describe("egt", () => {
    it("returns true when a >= b", () => {
      expect(egtFormatter.read(10, 5)).toBe(true);
      expect(egtFormatter.read(5, 5)).toBe(true);
    });

    it("returns false when a < b", () => {
      expect(egtFormatter.read(3, 5)).toBe(false);
    });
  });

  describe("elt", () => {
    it("returns true when a <= b", () => {
      expect(eltFormatter.read(3, 10)).toBe(true);
      expect(eltFormatter.read(10, 10)).toBe(true);
    });

    it("returns false when a > b", () => {
      expect(eltFormatter.read(10, 3)).toBe(false);
    });
  });

  describe("and", () => {
    it("returns truthy when both values are truthy", () => {
      expect(andFormatter.read(true, true)).toBeTruthy();
      expect(andFormatter.read(1, "hello")).toBeTruthy();
    });

    it("returns falsy when either value is falsy", () => {
      expect(andFormatter.read(true, false)).toBeFalsy();
      expect(andFormatter.read(false, true)).toBeFalsy();
      expect(andFormatter.read(false, false)).toBeFalsy();
    });
  });

  describe("or", () => {
    it("returns truthy when at least one value is truthy", () => {
      expect(orFormatter.read(true, false)).toBeTruthy();
      expect(orFormatter.read(false, true)).toBeTruthy();
    });

    it("returns falsy when both values are falsy", () => {
      expect(orFormatter.read(false, false)).toBeFalsy();
      expect(orFormatter.read(0, "")).toBeFalsy();
    });

    it("returns the first truthy value", () => {
      expect(orFormatter.read("hello", "world")).toBe("hello");
      expect(orFormatter.read(false, 42)).toBe(42);
    });
  });

  describe("not", () => {
    it("negates truthy values", () => {
      expect(notFormatter.read(true)).toBe(false);
      expect(notFormatter.read(1)).toBe(false);
    });

    it("negates falsy values", () => {
      expect(notFormatter.read(false)).toBe(true);
      expect(notFormatter.read(0)).toBe(true);
      expect(notFormatter.read("")).toBe(true);
    });
  });

  describe("between", () => {
    it("returns true when value is within range (inclusive)", () => {
      expect(betweenFormatter.read(5, 1, 10)).toBe(true);
      expect(betweenFormatter.read(1, 1, 10)).toBe(true);
      expect(betweenFormatter.read(10, 1, 10)).toBe(true);
    });

    it("returns false when value is outside range", () => {
      expect(betweenFormatter.read(0, 1, 10)).toBe(false);
      expect(betweenFormatter.read(11, 1, 10)).toBe(false);
    });

    it("works with negative numbers", () => {
      expect(betweenFormatter.read(-5, -10, 0)).toBe(true);
      expect(betweenFormatter.read(-15, -10, 0)).toBe(false);
    });
  });
});
