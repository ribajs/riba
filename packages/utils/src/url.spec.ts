import { describe, it, expect } from "vitest";
import {
  getUrlParameter,
  cleanLink,
  getPort,
  isAbsoluteUrl,
  isExternalUrl,
  isInternalUrl,
  normalizeUrl,
  getUrl,
  getLocation,
  onRoute,
} from "./url.js";

describe("url utilities", () => {
  describe("getUrlParameter", () => {
    it("extracts a query parameter from a URL", () => {
      expect(
        getUrlParameter("q", "http://example.com?q=hello"),
      ).toBe("hello");
    });

    it("returns null when parameter is not found", () => {
      expect(
        getUrlParameter("missing", "http://example.com?q=hello"),
      ).toBeNull();
    });

    it("decodes URI-encoded values", () => {
      expect(
        getUrlParameter("q", "http://example.com?q=hello%20world"),
      ).toBe("hello world");
    });

    it("returns empty string for flag parameters", () => {
      expect(
        getUrlParameter("flag", "http://example.com?flag&other=1"),
      ).toBe("");
    });
  });

  describe("cleanLink", () => {
    it("removes the hash from a URL", () => {
      expect(cleanLink("http://example.com/page#section")).toBe(
        "http://example.com/page",
      );
    });

    it("returns the URL unchanged when there is no hash", () => {
      expect(cleanLink("http://example.com/page")).toBe(
        "http://example.com/page",
      );
    });

    it("handles hash-only strings", () => {
      expect(cleanLink("#section")).toBe("");
    });
  });

  describe("getPort", () => {
    it("returns the provided port as a number", () => {
      expect(getPort("8080")).toBe(8080);
    });

    it("returns 80 for http when no port specified", () => {
      // jsdom defaults to http: protocol
      expect(getPort("")).toBe(80);
    });
  });

  describe("isAbsoluteUrl", () => {
    it("returns true for http URLs", () => {
      expect(isAbsoluteUrl("http://example.com")).toBe(true);
    });

    it("returns true for https URLs", () => {
      expect(isAbsoluteUrl("https://example.com")).toBe(true);
    });

    it("returns true for protocol-relative URLs", () => {
      expect(isAbsoluteUrl("//example.com")).toBe(true);
    });

    it("returns true for mailto links", () => {
      expect(isAbsoluteUrl("mailto:user@example.com")).toBe(true);
    });

    it("returns true for tel links", () => {
      expect(isAbsoluteUrl("tel:+1234567890")).toBe(true);
    });

    it("returns false for relative paths", () => {
      expect(isAbsoluteUrl("/page")).toBe(false);
      expect(isAbsoluteUrl("page.html")).toBe(false);
    });

    it("returns false for empty/falsy input", () => {
      expect(isAbsoluteUrl("")).toBe(false);
    });
  });

  describe("isExternalUrl / isInternalUrl", () => {
    it("identifies same-host URLs as internal", () => {
      // jsdom uses localhost
      expect(isInternalUrl("http://localhost/page")).toBe(true);
      expect(isExternalUrl("http://localhost/page")).toBe(false);
    });

    it("identifies different-host URLs as external", () => {
      expect(isExternalUrl("http://other.example.com/page")).toBe(true);
      expect(isInternalUrl("http://other.example.com/page")).toBe(false);
    });

    it("treats relative URLs as internal", () => {
      expect(isInternalUrl("/page")).toBe(true);
      expect(isExternalUrl("/page")).toBe(false);
    });
  });

  describe("getLocation", () => {
    it("returns window.location when no URL provided", () => {
      const loc = getLocation();
      expect(loc).toBe(window.location);
    });

    it("parses a URL into location-like object", () => {
      const loc = getLocation("http://example.com:3000/path?q=1#hash");
      expect(loc.hostname).toBe("example.com");
      expect(loc.pathname).toBe("/path");
      expect(loc.hash).toBe("#hash");
      expect(loc.search).toBe("?q=1");
    });
  });

  describe("normalizeUrl", () => {
    it("converts same-host absolute URL to relative", () => {
      const result = normalizeUrl("http://localhost/some/page");
      expect(result.url).toBe("/some/page");
    });

    it("preserves query and hash in relative URL", () => {
      const result = normalizeUrl("http://localhost/page?q=1#hash");
      expect(result.url).toBe("/page?q=1#hash");
    });
  });

  describe("getUrl", () => {
    it("returns full URL for a path", () => {
      const url = getUrl("http://example.com/page");
      expect(url).toContain("example.com");
      expect(url).toContain("/page");
    });
  });

  describe("onRoute", () => {
    it("returns false when no URL provided", () => {
      expect(onRoute()).toBe(false);
    });

    it("matches current location pathname", () => {
      // jsdom defaults to about:blank -> pathname "/"
      // but getLocation creates an <a> element for comparison
      expect(onRoute("http://localhost/")).toBe(true);
    });
  });
});
