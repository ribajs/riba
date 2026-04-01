import { describe, it, expect } from "vitest";
import { toStringFormatter } from "./to-string.formatter.js";
import { toNumberFormatter } from "./to-number.formatter.js";
import { toIntegerFormatter } from "./to-integer.formatter.js";
import { toFloatFormatter } from "./to-float.formatter.js";
import { toDecimalFormatter } from "./to-decimal.formatter.js";
import { booleanFormatter } from "./boolean.formatter.js";
import { jsonFormatter } from "./json.formatter.js";
import { isStringFormatter } from "./is-string.formatter.js";
import { isNumberFormatter } from "./is-number.formatter.js";
import { isDefinedFormatter } from "./is-defined.formatter.js";
import { isUndefinedFormatter } from "./is-undefined.formatter.js";
import { isObjectFormatter } from "./is-object.formatter.js";
import { isArrayFormatter } from "./is-array.formatter.js";
import { isBooleanFormatter } from "./is-boolean.formatter.js";
import { isIntegerFormatter } from "./is-integer.formatter.js";

describe("type formatters", () => {
  describe("to-string", () => {
    it("converts number to string", () => {
      expect(toStringFormatter.read(42)).toBe("42");
    });
    it("converts boolean to string", () => {
      expect(toStringFormatter.read(true)).toBe("true");
    });
    it("uses default value when value is falsy", () => {
      expect(toStringFormatter.read(undefined, "default")).toBe("default");
    });
  });

  describe("to-number", () => {
    it("converts string to number", () => {
      expect(toNumberFormatter.read("42")).toBe(42);
    });
    it("returns NaN for non-numeric strings", () => {
      expect(toNumberFormatter.read("abc")).toBeNaN();
    });
  });

  describe("to-integer", () => {
    it("parses integer from string", () => {
      expect(toIntegerFormatter.read("42.7")).toBe(42);
    });
    it("parses integer from float", () => {
      expect(toIntegerFormatter.read(3.14)).toBe(3);
    });
  });

  describe("to-float", () => {
    it("parses float from string", () => {
      expect(toFloatFormatter.read("3.14")).toBe(3.14);
    });
  });

  describe("to-decimal", () => {
    it("returns integer when value has no fractional part", () => {
      expect(toDecimalFormatter.read(42)).toBe(42);
    });
    it("returns float when value has fractional part", () => {
      expect(toDecimalFormatter.read(3.14)).toBe(3.14);
    });
  });

  describe("boolean", () => {
    it("converts truthy to true", () => {
      expect(booleanFormatter.read("hello")).toBe(true);
      expect(booleanFormatter.read(1)).toBe(true);
    });
    it("converts falsy to false", () => {
      expect(booleanFormatter.read(0)).toBe(false);
      expect(booleanFormatter.read("")).toBe(false);
      expect(booleanFormatter.read(null)).toBe(false);
    });
  });

  describe("json", () => {
    it("stringifies an object", () => {
      const result = jsonFormatter.read({ a: 1 });
      expect(result).toContain('"a"');
    });
  });

  describe("is-string", () => {
    it("returns true for strings", () => {
      expect(isStringFormatter.read("hello")).toBe(true);
    });
    it("returns false for numbers", () => {
      expect(isStringFormatter.read(42)).toBe(false);
    });
  });

  describe("is-number", () => {
    it("returns true for numbers", () => {
      expect(isNumberFormatter.read(42)).toBe(true);
    });
    it("returns true for numeric strings", () => {
      expect(isNumberFormatter.read("3.14")).toBe(true);
    });
    it("returns false for non-numeric strings", () => {
      expect(isNumberFormatter.read("abc")).toBe(false);
    });
  });

  describe("is-defined", () => {
    it("returns true for defined values", () => {
      expect(isDefinedFormatter.read("hello")).toBe(true);
      expect(isDefinedFormatter.read(0)).toBe(true);
    });
    it("returns false for undefined", () => {
      expect(isDefinedFormatter.read(undefined)).toBe(false);
    });
  });

  describe("is-undefined", () => {
    it("returns true for undefined", () => {
      expect(isUndefinedFormatter.read(undefined)).toBe(true);
    });
    it("returns false for defined values", () => {
      expect(isUndefinedFormatter.read("hello")).toBe(false);
    });
  });

  describe("is-object", () => {
    it("returns true for plain objects", () => {
      expect(isObjectFormatter.read({})).toBe(true);
    });
    it("returns false for arrays", () => {
      expect(isObjectFormatter.read([])).toBe(false);
    });
    it("returns false for null", () => {
      expect(isObjectFormatter.read(null)).toBe(false);
    });
    it("returns false for primitives", () => {
      expect(isObjectFormatter.read("str")).toBe(false);
      expect(isObjectFormatter.read(42)).toBe(false);
    });
  });

  describe("is-array", () => {
    it("returns true for arrays", () => {
      expect(isArrayFormatter.read([])).toBe(true);
    });
    it("returns false for objects", () => {
      expect(isArrayFormatter.read({})).toBe(false);
    });
  });

  describe("is-boolean", () => {
    it("returns true for booleans", () => {
      expect(isBooleanFormatter.read(true)).toBe(true);
      expect(isBooleanFormatter.read(false)).toBe(true);
    });
    it("returns false for non-booleans", () => {
      expect(isBooleanFormatter.read(1)).toBe(false);
    });
  });

  describe("is-integer", () => {
    it("returns true for integers", () => {
      expect(isIntegerFormatter.read(42)).toBe(true);
    });
    it("returns false for floats", () => {
      expect(isIntegerFormatter.read(3.14)).toBe(false);
    });
    it("returns false for strings", () => {
      expect(isIntegerFormatter.read("42")).toBe(false);
    });
  });
});
