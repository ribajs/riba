import { describe, it, expect } from "vitest";
import { joinFormatter } from "./join.formatter.js";
import { firstFormatter } from "./first.formatter.js";
import { lastFormatter } from "./last.formatter.js";
import { sizeFormatter } from "./size.formatter.js";
import { emptyFormatter } from "./empty.formatter.js";
import { containsFormatter } from "./contains.formatter.js";
import { setFormatter } from "./set.formatter.js";
import { getFormatter } from "./get.formatter.js";
import { rangeFormatter } from "./range.formatter.js";
import { isLastFormatter } from "./is-last.formatter.js";

describe("array formatters", () => {
  describe("join", () => {
    it("joins array with delimiter", () => {
      expect(joinFormatter.read(["a", "b", "c"], ", ")).toBe("a, b, c");
    });
    it("joins without delimiter", () => {
      expect(joinFormatter.read(["a", "b"], undefined)).toBe("a,b");
    });
  });

  describe("first", () => {
    it("returns first element", () => {
      expect(firstFormatter.read([10, 20, 30])).toBe(10);
    });
    it("returns first character of string", () => {
      expect(firstFormatter.read("hello")).toBe("h");
    });
  });

  describe("last", () => {
    it("returns last element", () => {
      expect(lastFormatter.read([10, 20, 30])).toBe(30);
    });
    it("returns last character of string", () => {
      expect(lastFormatter.read("hello")).toBe("o");
    });
  });

  describe("size", () => {
    it("returns array length", () => {
      expect(sizeFormatter.read([1, 2, 3])).toBe(3);
    });
    it("returns string length", () => {
      expect(sizeFormatter.read("hello")).toBe(5);
    });
    it("returns 0 for empty array", () => {
      expect(sizeFormatter.read([])).toBe(0);
    });
    it("returns 0 for null/undefined", () => {
      expect(sizeFormatter.read(null as any)).toBe(0);
    });
  });

  describe("empty", () => {
    it("returns true for empty array", () => {
      expect(emptyFormatter.read([])).toBe(true);
    });
    it("returns false for non-empty array", () => {
      expect(emptyFormatter.read([1])).toBe(false);
    });
    it("returns true for empty string", () => {
      expect(emptyFormatter.read("")).toBe(true);
    });
  });

  describe("contains", () => {
    it("returns array if it contains value", () => {
      const arr = [1, 2, 3];
      expect(containsFormatter.read(arr, 2)).toBe(arr);
    });
    it("returns false if array does not contain value", () => {
      expect(containsFormatter.read([1, 2, 3], 5)).toBe(false);
    });
    it("checks substring in string", () => {
      expect(containsFormatter.read("hello world", "world")).toBe(
        "hello world",
      );
    });
    it("returns false for missing substring", () => {
      expect(containsFormatter.read("hello", "xyz")).toBe(false);
    });
  });

  describe("set", () => {
    it("sets value at index", () => {
      const arr = [1, 2, 3];
      const result = setFormatter.read(arr, 1, 99);
      expect(result[1]).toBe(99);
    });
  });

  describe("get", () => {
    it("gets value at index", () => {
      expect(getFormatter.read([10, 20, 30], 1)).toBe(20);
    });
    it("gets character at index from string", () => {
      expect(getFormatter.read("hello", 0)).toBe("h");
    });
  });

  describe("range", () => {
    it("extracts subarray from start to end index", () => {
      expect(rangeFormatter.read([10, 20, 30, 40, 50], 1, 3)).toEqual([
        20, 30, 40,
      ]);
    });
    it("returns single element for same start and end", () => {
      expect(rangeFormatter.read([10, 20, 30], 1, 1)).toEqual([20]);
    });
    it("returns empty for start > end", () => {
      expect(rangeFormatter.read([10, 20, 30], 2, 0)).toEqual([]);
    });
  });

  describe("is-last", () => {
    it("returns true for last index", () => {
      expect(isLastFormatter.read([1, 2, 3], 2)).toBe(true);
    });
    it("returns false for non-last index", () => {
      expect(isLastFormatter.read([1, 2, 3], 0)).toBe(false);
    });
  });
});
