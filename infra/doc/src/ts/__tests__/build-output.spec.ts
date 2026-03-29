import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const SITE_DIR = resolve(__dirname, "../../../_site");
const SITE_EXISTS = existsSync(SITE_DIR);

const EXPECTED_PAGES = [
  "index.html",
  "guide.html",
  "core.html",
  "core-binders.html",
  "core-formatters.html",
  "core-components.html",
  "bs5.html",
  "extras.html",
  "i18n.html",
  "router.html",
  "iconset.html",
  "jquery.html",
  "octobercms.html",
];

function readPage(name: string): string {
  const filePath = resolve(SITE_DIR, name);
  if (!existsSync(filePath)) {
    throw new Error(`Page ${name} does not exist at ${filePath}. Run 'yarn workspace @ribajs/doc run build' first.`);
  }
  return readFileSync(filePath, "utf-8");
}

describe.skipIf(!SITE_EXISTS)("Build output", () => {

  describe("Page generation", () => {
    it.each(EXPECTED_PAGES)("generates %s", (page) => {
      expect(existsSync(resolve(SITE_DIR, page))).toBe(true);
    });
  });

  describe("Layout structure", () => {
    it("every page contains bs5-sidebar", () => {
      for (const page of EXPECTED_PAGES) {
        const html = readPage(page);
        expect(html).toContain("<bs5-sidebar");
      }
    });

    it("every page contains a navbar with 'Riba' brand", () => {
      for (const page of EXPECTED_PAGES) {
        const html = readPage(page);
        expect(html).toContain("navbar-brand");
        expect(html).toContain(">Riba<");
      }
    });

    it("every page contains router-view", () => {
      for (const page of EXPECTED_PAGES) {
        const html = readPage(page);
        expect(html).toContain("<router-view");
      }
    });

    it("every page contains the main.js script", () => {
      for (const page of EXPECTED_PAGES) {
        const html = readPage(page);
        expect(html).toMatch(/src="\.\/assets\/main-[^"]+\.js"/);
      }
    });
  });

  describe("Sidebar navigation", () => {
    it("contains all expected navigation links", () => {
      const html = readPage("index.html");
      const expectedLinks = [
        "Guide",
        "Modules",
        "Core",
        "Install",
        "Binders",
        "Formatters",
        "Components",
        "Router",
        "I18n",
        "Iconset",
        "jQuery",
        "Bootstrap 5",
        "Extras",
        "OctoberCMS",
      ];
      for (const link of expectedLinks) {
        expect(html).toContain(`<span>${link}</span>`);
      }
    });
  });

  describe("Content pages", () => {
    const contentPages = EXPECTED_PAGES.filter((p) => p !== "index.html");

    it("content pages contain bs5-scrollspy", () => {
      for (const page of contentPages) {
        const html = readPage(page);
        expect(html).toContain("<bs5-scrollspy");
      }
    });

    it("content pages contain bs5-contents (mobile TOC)", () => {
      for (const page of contentPages) {
        const html = readPage(page);
        expect(html).toContain("<bs5-contents");
      }
    });

    it("content pages have a page-title h1", () => {
      for (const page of contentPages) {
        const html = readPage(page);
        expect(html).toContain('class="page-title"');
      }
    });
  });

  describe("Homepage", () => {
    it("has body id='index' for CSS targeting", () => {
      const html = readPage("index.html");
      expect(html).toContain('id="index"');
    });

    it("contains 'Why Riba.js?' section", () => {
      const html = readPage("index.html");
      expect(html).toContain("Why Riba.js?");
    });

    it("contains 'Highlights' section", () => {
      const html = readPage("index.html");
      expect(html).toContain("Highlights");
    });

    it("does NOT contain bs5-scrollspy (homepage has no scrollspy)", () => {
      const html = readPage("index.html");
      expect(html).not.toContain("<bs5-scrollspy");
    });
  });

  describe("Core binders page", () => {
    it("contains rv-bind-content demo elements", () => {
      const html = readPage("core-binders.html");
      expect(html).toContain("<rv-bind-content");
    });

    it("contains Prism.js syntax-highlighted code", () => {
      const html = readPage("core-binders.html");
      expect(html).toContain('class="language-');
    });
  });
});
