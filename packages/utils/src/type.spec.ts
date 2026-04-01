import { describe, it, expect } from "vitest";
import {
  toType,
  isObject,
  isUndefined,
  isDefined,
  isFunction,
  isNumber,
  isBoolean,
  isString,
  isJson,
  isBase64,
  couldBeJson,
  parseType,
  parseJsonString,
  jsonStringify,
  camelCase,
  kebabCase,
  capitalize,
  handleize,
  stripHtml,
  escapeHtml,
  clone,
  extend,
  hashCode,
} from "./type.js";

describe("type utilities", () => {
  describe("toType", () => {
    it("returns 'string' for strings", () => {
      expect(toType("hello")).toBe("string");
    });
    it("returns 'number' for numbers", () => {
      expect(toType(42)).toBe("number");
    });
    it("returns 'array' for arrays", () => {
      expect(toType([])).toBe("array");
    });
    it("returns 'object' for plain objects", () => {
      expect(toType({})).toBe("object");
    });
    it("returns 'null' for null", () => {
      expect(toType(null)).toBe("null");
    });
  });

  describe("isObject", () => {
    it("returns true for plain objects", () => {
      expect(isObject({})).toBe(true);
    });
    it("returns true for arrays", () => {
      expect(isObject([])).toBe(true);
    });
    it("returns false for null", () => {
      expect(isObject(null)).toBe(false);
    });
    it("returns false for undefined", () => {
      expect(isObject(undefined)).toBe(false);
    });
    it("returns false for primitives", () => {
      expect(isObject("str")).toBe(false);
      expect(isObject(42)).toBe(false);
    });
  });

  describe("isUndefined / isDefined", () => {
    it("isUndefined returns true for undefined", () => {
      expect(isUndefined(undefined)).toBe(true);
    });
    it("isUndefined returns false for null", () => {
      expect(isUndefined(null)).toBe(false);
    });
    it("isDefined returns true for null", () => {
      expect(isDefined(null)).toBe(true);
    });
    it("isDefined returns false for undefined", () => {
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe("isFunction", () => {
    it("returns true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
    });
    it("returns false for non-functions", () => {
      expect(isFunction("not a fn")).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("returns true for numbers", () => {
      expect(isNumber(42)).toBe(true);
    });
    it("returns true for numeric strings", () => {
      expect(isNumber("3.14")).toBe(true);
    });
    it("returns false for non-numeric strings", () => {
      expect(isNumber("abc")).toBe(false);
    });
    it("returns false for NaN", () => {
      expect(isNumber(NaN)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    it("returns true for booleans", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });
    it("returns false for truthy non-booleans", () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean("true")).toBe(false);
    });
  });

  describe("isString", () => {
    it("returns true for strings", () => {
      expect(isString("")).toBe(true);
      expect(isString("hello")).toBe(true);
    });
    it("returns false for non-strings", () => {
      expect(isString(42)).toBe(false);
    });
  });

  describe("isJson", () => {
    it("returns true for valid JSON object strings", () => {
      expect(isJson('{"a":1}')).toBe(true);
    });
    it("returns true for valid JSON array strings", () => {
      expect(isJson("[1,2,3]")).toBe(true);
    });
    it("returns false for non-JSON strings", () => {
      expect(isJson("hello")).toBe(false);
    });
    it("returns false for null/undefined", () => {
      expect(isJson(null)).toBe(false);
      expect(isJson(undefined)).toBe(false);
    });
  });

  describe("couldBeJson", () => {
    it("returns true for strings starting with { or [", () => {
      expect(couldBeJson("{foo}")).toBe(true);
      expect(couldBeJson("[1]")).toBe(true);
    });
    it("returns false for other strings", () => {
      expect(couldBeJson("hello")).toBe(false);
    });
  });

  describe("parseType", () => {
    it("parses numbers", () => {
      expect(parseType("42").value).toBe(42);
    });
    it("parses booleans", () => {
      expect(parseType("true").value).toBe(true);
      expect(parseType("false").value).toBe(false);
    });
    it("parses null", () => {
      expect(parseType("null").value).toBe(null);
    });
    it("parses undefined", () => {
      expect(parseType("undefined").value).toBeUndefined();
    });
    it("preserves URLs", () => {
      expect(parseType("https://example.com").value).toBe(
        "https://example.com",
      );
    });
    it("returns KEYPATH type for unrecognized strings", () => {
      const result = parseType("someKeypath");
      expect(result.type).toBe(1); // KEYPATH constant
    });
  });

  describe("parseJsonString", () => {
    it("parses valid JSON", () => {
      expect(parseJsonString('{"a":1}')).toEqual({ a: 1 });
    });
    it("parses JSON with single quotes", () => {
      expect(parseJsonString("{'a':1}")).toEqual({ a: 1 });
    });
    it("returns null for invalid input", () => {
      expect(parseJsonString(null)).toBeNull();
      expect(parseJsonString("")).toBeNull();
    });
  });

  describe("jsonStringify", () => {
    it("stringifies objects", () => {
      const result = jsonStringify({ a: 1 }, 0);
      expect(result).toContain('"a":1');
    });
    it("handles circular references", () => {
      const obj: any = {};
      obj.self = obj;
      const result = jsonStringify(obj);
      expect(result).toBeDefined();
    });
    it("replaces single quotes by default", () => {
      const result = jsonStringify({ a: "it's" });
      expect(result).not.toContain("'");
      expect(result).toContain("&#39;");
    });
  });

  describe("camelCase", () => {
    it("converts kebab-case to camelCase", () => {
      expect(camelCase("foo-bar")).toBe("fooBar");
      expect(camelCase("my-component-name")).toBe("myComponentName");
    });
    it("leaves already camelCase strings unchanged", () => {
      expect(camelCase("fooBar")).toBe("fooBar");
    });
  });

  describe("kebabCase", () => {
    it("converts camelCase to kebab-case", () => {
      expect(kebabCase("fooBar")).toBe("foo-bar");
    });
  });

  describe("capitalize", () => {
    it("capitalizes the first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });
    it("returns empty string for non-strings", () => {
      expect(capitalize(42 as any)).toBe("");
    });
  });

  describe("handleize", () => {
    it("converts to handle format", () => {
      expect(handleize("100% M & Ms!!!")).toBe("100-m-ms");
    });
    it("lowercases and trims", () => {
      expect(handleize("  Hello World  ")).toBe("hello-world");
    });
  });

  describe("stripHtml", () => {
    it("removes HTML tags", () => {
      expect(stripHtml("<p>Hello <b>World</b></p>")).toBe("Hello World");
    });
    it("handles empty string", () => {
      expect(stripHtml("")).toBe("");
    });
  });

  describe("escapeHtml", () => {
    it("escapes HTML special characters", () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
      );
    });
  });

  describe("clone", () => {
    it("shallow clones an array", () => {
      const arr = [1, 2, 3];
      const cloned = clone(false, arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
    });
    it("deep clones nested objects", () => {
      const obj = { a: { b: 1 } };
      const cloned = clone(true, obj);
      expect(cloned).toEqual(obj);
      cloned.a.b = 2;
      expect(obj.a.b).toBe(1);
    });
    it("returns primitives as-is", () => {
      expect(clone(false, 42)).toBe(42);
      expect(clone(false, "str")).toBe("str");
    });
  });

  describe("extend", () => {
    it("merges objects", () => {
      const result = extend({}, {}, { a: 1 }, { b: 2 });
      expect(result).toEqual({ a: 1, b: 2 });
    });
    it("deep merges nested objects", () => {
      const result = extend({ deep: true }, { a: { x: 1 } }, { a: { y: 2 } });
      expect(result).toEqual({ a: { x: 1, y: 2 } });
    });
    it("overwrites by default", () => {
      const result = extend({}, { a: 1 }, { a: 2 });
      expect(result.a).toBe(2);
    });
    it("keeps existing values with keepValues option", () => {
      const result = extend({ keepValues: true }, { a: 1 }, { a: 2 });
      expect(result.a).toBe(1);
    });
  });

  describe("hashCode", () => {
    it("returns 0 for empty string", () => {
      expect(hashCode("")).toBe(0);
    });
    it("returns consistent hash for same input", () => {
      expect(hashCode("test")).toBe(hashCode("test"));
    });
    it("returns different hashes for different inputs", () => {
      expect(hashCode("abc")).not.toBe(hashCode("xyz"));
    });
  });
});
