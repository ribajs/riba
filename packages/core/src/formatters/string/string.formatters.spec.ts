import { describe, it, expect } from "vitest";
import { upcaseFormatter } from "./upcase.formatter.js";
import { downcaseFormatter } from "./downcase.formatter.js";
import { capitalizeFormatter } from "./capitalize.formatter.js";
import { appendFormatter } from "./append.formatter.js";
import { prependFormatter } from "./prepend.formatter.js";
import { sliceFormatter } from "./slice.formatter.js";
import { replaceFormatter } from "./replace.formatter.js";
import { replaceFirstFormatter } from "./replace-first.formatter.js";
import { stripFormatter } from "./strip.formatter.js";
import { stripHtmlFormatter } from "./strip-html.formatter.js";
import { handleizeFormatter } from "./handleize.formatter.js";
import { cutFormatter } from "./cut.formatter.js";
import { pluralizeFormatter } from "./pluralize.formatter.js";
import { numberFormatFormatter } from "./number-format.formatter.js";
import { filledFormatter } from "./filled.formatter.js";
import { padStartFormatter } from "./pad-start.formatter.js";
import { padEndFormatter } from "./pad-end.formatter.js";
import { startsWithFormatter } from "./starts-with.formatter.js";
import { endsWithFormatter } from "./ends-with.formatter.js";
import { matchFormatter } from "./match.formatter.js";

describe("String Formatters", () => {
  describe("upcaseFormatter", () => {
    it("converts a string to uppercase", () => {
      expect(upcaseFormatter.read!("hello world")).toBe("HELLO WORLD");
    });

    it("returns an empty string when given an empty string", () => {
      expect(upcaseFormatter.read!("")).toBe("");
    });

    it("handles already uppercase strings", () => {
      expect(upcaseFormatter.read!("HELLO")).toBe("HELLO");
    });
  });

  describe("downcaseFormatter", () => {
    it("converts a string to lowercase", () => {
      expect(downcaseFormatter.read!("HELLO WORLD")).toBe("hello world");
    });

    it("returns an empty string when given an empty string", () => {
      expect(downcaseFormatter.read!("")).toBe("");
    });

    it("handles already lowercase strings", () => {
      expect(downcaseFormatter.read!("hello")).toBe("hello");
    });
  });

  describe("capitalizeFormatter", () => {
    it("uppercases the first letter of a string", () => {
      expect(capitalizeFormatter.read!("hello world")).toBe("Hello world");
    });

    it("returns an empty string when given an empty string", () => {
      expect(capitalizeFormatter.read!("")).toBe("");
    });

    it("handles a single character", () => {
      expect(capitalizeFormatter.read!("a")).toBe("A");
    });
  });

  describe("appendFormatter", () => {
    it("appends characters to a string", () => {
      expect(appendFormatter.read!("hello", " world")).toBe("hello world");
    });

    it("appends to an empty string", () => {
      expect(appendFormatter.read!("", "world")).toBe("world");
    });

    it("appends an empty string", () => {
      expect(appendFormatter.read!("hello", "")).toBe("hello");
    });
  });

  describe("prependFormatter", () => {
    it("prepends characters to a string", () => {
      expect(prependFormatter.read!("world", "hello ")).toBe("hello world");
    });

    it("prepends to an empty string", () => {
      expect(prependFormatter.read!("", "hello")).toBe("hello");
    });

    it("prepends an empty string", () => {
      expect(prependFormatter.read!("world", "")).toBe("world");
    });
  });

  describe("sliceFormatter", () => {
    it("returns a substring from start to end", () => {
      expect(sliceFormatter.read!("hello world", 0, 5)).toBe("hello");
    });

    it("returns the rest of the string when end is omitted", () => {
      expect(sliceFormatter.read!("hello world", 6, undefined)).toBe("world");
    });

    it("handles negative indices", () => {
      expect(sliceFormatter.read!("hello world", -5, undefined)).toBe("world");
    });
  });

  describe("replaceFormatter", () => {
    it("replaces all occurrences of a substring", () => {
      expect(replaceFormatter.read!("aabbcc", "b", "x")).toBe("aaxxcc");
    });

    it("returns the original string when the search value is not found", () => {
      expect(replaceFormatter.read!("hello", "z", "x")).toBe("hello");
    });

    it("handles empty replacement", () => {
      expect(replaceFormatter.read!("hello world", " ", "")).toBe(
        "helloworld",
      );
    });
  });

  describe("replaceFirstFormatter", () => {
    it("replaces only the first occurrence", () => {
      expect(replaceFirstFormatter.read!("aabba", "a", "x")).toBe("xabba");
    });

    it("returns the original string when the search value is not found", () => {
      expect(replaceFirstFormatter.read!("hello", "z", "x")).toBe("hello");
    });

    it("handles empty string input", () => {
      expect(replaceFirstFormatter.read!("", "a", "b")).toBe("");
    });
  });

  describe("stripFormatter", () => {
    it("trims whitespace from both sides", () => {
      expect(stripFormatter.read!("  hello  ")).toBe("hello");
    });

    it("trims tabs and newlines", () => {
      expect(stripFormatter.read!("\t\nhello\n\t")).toBe("hello");
    });

    it("returns an empty string when given only whitespace", () => {
      expect(stripFormatter.read!("   ")).toBe("");
    });
  });

  describe("stripHtmlFormatter", () => {
    it("removes HTML tags from a string", () => {
      expect(stripHtmlFormatter.read!("<p>hello</p>")).toBe("hello");
    });

    it("handles nested tags", () => {
      expect(stripHtmlFormatter.read!("<div><b>bold</b> text</div>")).toBe(
        "bold text",
      );
    });

    it("returns an empty string for empty HTML", () => {
      expect(stripHtmlFormatter.read!("")).toBe("");
    });
  });

  describe("handleizeFormatter", () => {
    it("converts a string to a handle", () => {
      expect(handleizeFormatter.read!("Hello World")).toBe("hello-world");
    });

    it("removes special characters and collapses whitespace", () => {
      expect(handleizeFormatter.read!("100% M & Ms!!!")).toBe("100-m-ms");
    });

    it("returns an empty string for a falsy input", () => {
      expect(handleizeFormatter.read!("")).toBe("");
    });
  });

  describe("cutFormatter", () => {
    it("cuts a string at the given position and appends delimitation", () => {
      const result = cutFormatter.read!(
        "abcdefghijklnmopqrstuvwxyz",
        3,
        "...",
      );
      // cutFormatter uses str.substring(cutAt, cutAt === -1 ? undefined : -1)
      // substring(3, -1) clamps -1 to 0, so result is substring(0, 3) = "abc" + "..."
      // Actually substring with negative clamps to 0, so substring(3, 0) swaps to substring(0, 3) = "abc"
      expect(result).toBe("abc...");
    });

    it("returns the original string when it is shorter than the cut point", () => {
      expect(cutFormatter.read!("hi", 5)).toBe("hi");
    });

    it("returns an empty string for a falsy input", () => {
      expect(cutFormatter.read!("", 3)).toBe("");
    });
  });

  describe("pluralizeFormatter", () => {
    it("returns the singular form when count is 1", () => {
      expect(pluralizeFormatter.read!(1, "item", "items")).toBe("item");
    });

    it("returns the plural form when count is not 1", () => {
      expect(pluralizeFormatter.read!(5, "item", "items")).toBe("items");
    });

    it("returns the plural form when count is 0", () => {
      expect(pluralizeFormatter.read!(0, "item", "items")).toBe("items");
    });

    it("works with an array input using the array length", () => {
      expect(pluralizeFormatter.read!([1], "item", "items")).toBe("item");
      expect(pluralizeFormatter.read!([1, 2, 3], "item", "items")).toBe(
        "items",
      );
    });
  });

  describe("numberFormatFormatter", () => {
    it("formats a number with default precision", () => {
      expect(numberFormatFormatter.read!(1234.5)).toBe("1'234.50");
    });

    it("formats a number with custom precision", () => {
      expect(numberFormatFormatter.read!(1234.5678, 3)).toBe("1'234.568");
    });

    it("formats zero", () => {
      expect(numberFormatFormatter.read!(0)).toBe("0.00");
    });

    it("formats with custom separators", () => {
      expect(numberFormatFormatter.read!(1234.56, 2, ",", ".")).toBe(
        "1.234,56",
      );
    });
  });

  describe("filledFormatter", () => {
    it("returns true for a non-empty string", () => {
      expect(filledFormatter.read!("hello")).toBe(true);
    });

    it("returns false for an empty string", () => {
      expect(filledFormatter.read!("")).toBe(false);
    });

    it("returns false for a whitespace-only string", () => {
      expect(filledFormatter.read!("   ")).toBe(false);
    });
  });

  describe("padStartFormatter", () => {
    it("pads the start of a string to reach the target length", () => {
      expect(padStartFormatter.read!("5", 3, "0")).toBe("005");
    });

    it("does not pad when the string already meets the target length", () => {
      expect(padStartFormatter.read!("hello", 3, "0")).toBe("hello");
    });

    it("uses default pad character '0' and length 2", () => {
      expect(padStartFormatter.read!("5")).toBe("05");
    });
  });

  describe("padEndFormatter", () => {
    it("pads the end of a string to reach the target length", () => {
      expect(padEndFormatter.read!("5", 3, "0")).toBe("500");
    });

    it("does not pad when the string already meets the target length", () => {
      expect(padEndFormatter.read!("hello", 3, "0")).toBe("hello");
    });

    it("uses default pad character '0' and length 2", () => {
      expect(padEndFormatter.read!("5")).toBe("50");
    });
  });

  describe("startsWithFormatter", () => {
    it("returns the string when it starts with the search value", () => {
      expect(startsWithFormatter.read!("abcdefg", "abc")).toBe("abcdefg");
    });

    it("returns false when the string does not start with the search value", () => {
      expect(startsWithFormatter.read!("abcdefg", "xyz")).toBe(false);
    });

    it("returns the string for a non-string input", () => {
      expect(startsWithFormatter.read!(123 as any, "1")).toBe(123);
    });
  });

  describe("endsWithFormatter", () => {
    it("returns the string when it ends with the search value", () => {
      expect(endsWithFormatter.read!("abcdefg", "efg")).toBe("abcdefg");
    });

    it("returns false when the string does not end with the search value", () => {
      expect(endsWithFormatter.read!("abcdefg", "xyz")).toBe(false);
    });

    it("returns the value as-is for a non-string input", () => {
      expect(endsWithFormatter.read!(123 as any, "3")).toBe(123);
    });
  });

  describe("matchFormatter", () => {
    it("returns a match result when the pattern matches", () => {
      const result = matchFormatter.read!("hello123", "\\d+");
      expect(result).toBeTruthy();
      expect(result![0]).toBe("123");
    });

    it("returns null when the pattern does not match", () => {
      expect(matchFormatter.read!("hello", "\\d+")).toBeNull();
    });

    it("returns false when the string is empty or falsy", () => {
      expect(matchFormatter.read!("", "\\d+")).toBe(false);
    });

    it("supports regex flags", () => {
      const result = matchFormatter.read!("Hello", "hello", "i");
      expect(result).toBeTruthy();
      expect(result![0]).toBe("Hello");
    });
  });
});
