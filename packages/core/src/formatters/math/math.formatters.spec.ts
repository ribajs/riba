import { describe, it, expect } from "vitest";
import { minusFormatter } from "./minus.formatter.js";
import { timesFormatter } from "./times.formatter.js";
import { dividedByFormatter } from "./divided-by.formatter.js";
import { moduloFormatter } from "./modulo.formatter.js";
import { evenFormatter } from "./even.formatter.js";
import { unevenFormatter } from "./uneven.formatter.js";
import { digitsFormatter } from "./digits.formatter.js";
import { gcdFormatter } from "./gcd.formatter.js";

describe("math formatters", () => {
  describe("minus", () => {
    it("subtracts two numbers", () => {
      expect(minusFormatter.read(10, 3)).toBe(7);
    });

    it("handles negative results", () => {
      expect(minusFormatter.read(3, 10)).toBe(-7);
    });

    it("coerces string arguments to numbers", () => {
      expect(minusFormatter.read("100", "30")).toBe(70);
    });
  });

  describe("times", () => {
    it("multiplies two numbers", () => {
      expect(timesFormatter.read(4, 5)).toBe(20);
    });

    it("handles zero", () => {
      expect(timesFormatter.read(100, 0)).toBe(0);
    });

    it("coerces string arguments to numbers", () => {
      expect(timesFormatter.read("3", "7")).toBe(21);
    });
  });

  describe("dividedBy", () => {
    it("divides two numbers", () => {
      expect(dividedByFormatter.read(10, 2)).toBe(5);
    });

    it("returns fractional results", () => {
      expect(dividedByFormatter.read(7, 2)).toBe(3.5);
    });

    it("returns Infinity when dividing by zero", () => {
      expect(dividedByFormatter.read(10, 0)).toBe(Infinity);
    });
  });

  describe("modulo", () => {
    it("returns the remainder of division", () => {
      expect(moduloFormatter.read(10, 3)).toBe(1);
    });

    it("returns 0 when evenly divisible", () => {
      expect(moduloFormatter.read(9, 3)).toBe(0);
    });

    it("coerces string arguments to numbers", () => {
      expect(moduloFormatter.read("17", "5")).toBe(2);
    });
  });

  describe("even", () => {
    it("returns true for even numbers", () => {
      expect(evenFormatter.read(0)).toBe(true);
      expect(evenFormatter.read(2)).toBe(true);
      expect(evenFormatter.read(100)).toBe(true);
    });

    it("returns false for odd numbers", () => {
      expect(evenFormatter.read(1)).toBe(false);
      expect(evenFormatter.read(3)).toBe(false);
      expect(evenFormatter.read(99)).toBe(false);
    });
  });

  describe("uneven", () => {
    it("returns true for odd numbers", () => {
      expect(unevenFormatter.read(1)).toBe(true);
      expect(unevenFormatter.read(3)).toBe(true);
      expect(unevenFormatter.read(99)).toBe(true);
    });

    it("returns false for even numbers", () => {
      expect(unevenFormatter.read(0)).toBe(false);
      expect(unevenFormatter.read(2)).toBe(false);
      expect(unevenFormatter.read(100)).toBe(false);
    });
  });

  describe("digits", () => {
    it("returns the number itself if input is already a number", () => {
      expect(digitsFormatter.read(42)).toBe(42);
    });

    it("extracts digits from a string with units", () => {
      expect(digitsFormatter.read("100px")).toBe(100);
    });

    it("handles strings with decimals", () => {
      expect(digitsFormatter.read("3.14em")).toBe(3.14);
    });
  });

  describe("gcd", () => {
    it("computes the greatest common divisor", () => {
      expect(gcdFormatter.read(12, 8)).toBe(4);
    });

    it("returns a when b is 0", () => {
      expect(gcdFormatter.read(7, 0)).toBe(7);
    });

    it("handles coprime numbers", () => {
      expect(gcdFormatter.read(13, 7)).toBe(1);
    });
  });
});
