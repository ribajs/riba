import { beforeEach, describe, expect, it } from "vitest";
import { Pjax } from "./index.js";
import { withUrl } from "../__test__/helpers/with-url.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { IGNORE_CLASS_LINK } from "../../constants.js";

describe("Pjax.preventCheck", () => {
  beforeEach(() => {
    resetRouterTestState();
  });

  it("returns false for the same url", async () => {
    await withUrl("https://example.test/current.html", () => {
      expect(Pjax.preventCheck("https://example.test/current.html")).toBe(false);
    });
  });

  it("returns false for cross-origin urls", async () => {
    await withUrl("https://example.test/current.html", () => {
      expect(Pjax.preventCheck("https://other.test/next.html")).toBe(false);
    });
  });

  it("returns false for modified click events", async () => {
    await withUrl("https://example.test/current.html", () => {
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        metaKey: true,
      });
      expect(Pjax.preventCheck("https://example.test/next.html", undefined, evt)).toBe(
        false,
      );
    });
  });

  it("returns false for links with _blank target", async () => {
    await withUrl("https://example.test/current.html", () => {
      const link = document.createElement("a");
      link.target = "_blank";
      expect(Pjax.preventCheck("https://example.test/next.html", link)).toBe(false);
    });
  });

  it("returns false for links with download attribute", async () => {
    await withUrl("https://example.test/current.html", () => {
      const link = document.createElement("a");
      link.setAttribute("download", "file.txt");
      expect(Pjax.preventCheck("https://example.test/next.html", link)).toBe(false);
    });
  });

  it("returns false for links with ignore class", async () => {
    await withUrl("https://example.test/current.html", () => {
      const link = document.createElement("a");
      link.classList.add(IGNORE_CLASS_LINK);
      expect(Pjax.preventCheck("https://example.test/next.html", link)).toBe(false);
    });
  });

  it("returns true for eligible same-origin links", async () => {
    await withUrl("https://example.test/current.html", () => {
      const link = document.createElement("a");
      expect(Pjax.preventCheck("https://example.test/next.html", link)).toBe(true);
    });
  });
});

