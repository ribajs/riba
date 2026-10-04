import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  buildLocales,
  referencedMarkdown,
  resolveRoots,
} from "./build-locales.js";

describe("build-locales", () => {
  let tmp;
  let roots;
  const write = (file, content) => {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  };

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "build-locales-"));
    roots = resolveRoots(join(tmp, "infra", "doc"));
  });
  afterEach(() => rmSync(tmp, { recursive: true, force: true }));

  it("builds nothing for a project without translations", () => {
    write(join(roots.demosDir, "a", "README.md"), "# A\n\nEnglish only.\n");
    expect(buildLocales(roots)).toEqual({});
  });

  it("keys UI strings by the name of their yml file", () => {
    write(
      join(roots.localesDir, "de", "ui.yml"),
      "demos:\n  other: Sonstige\n",
    );
    write(join(roots.localesDir, "de", "nav.yml"), "home: Start\n");
    expect(buildLocales(roots)).toEqual({
      de: { ui: { demos: { other: "Sonstige" } }, nav: { home: "Start" } },
    });
  });

  it("reads title and description of README.<lang>.md per demo", () => {
    write(
      join(roots.demosDir, "core-each", "README.md"),
      "# Each\n\nEnglish text.\n",
    );
    write(
      join(roots.demosDir, "core-each", "README.de.md"),
      "# Schleife\n\nDeutscher Text mit `Code`.\n\n```bash\nyarn start\n```\n",
    );
    write(join(roots.demosDir, "plain", "README.md"), "# Plain\n\nText.\n");
    expect(buildLocales(roots)).toEqual({
      de: {
        demos: {
          "core-each": {
            title: "Schleife",
            description: "Deutscher Text mit Code.",
          },
        },
      },
    });
  });

  it("puts a translated page into the catalog only when a page renders it via md()", () => {
    write(join(roots.docDir, "guide", "install.md"), "# Install\n");
    write(join(roots.docDir, "guide", "install.de.md"), "# Installation\n");
    write(join(roots.docDir, "guide", "unused.md"), "# Unused\n");
    write(join(roots.docDir, "guide", "unused.de.md"), "# Unbenutzt\n");
    write(
      join(roots.srcDir, "views", "pages", "guide.pug"),
      "div\n  != md('guide/install.md')\n  //- != md('guide/unused.md')\n",
    );
    expect(referencedMarkdown(roots)).toEqual([
      join(roots.docDir, "guide", "install.md"),
    ]);
    expect(buildLocales(roots)).toEqual({
      de: { md: { "guide/install": "<h1>Installation</h1>\n" } },
    });
  });

  it("merges every source of one language into one catalog", () => {
    write(join(roots.localesDir, "de", "ui.yml"), "a: b\n");
    write(join(roots.demosDir, "x", "README.de.md"), "# X\n\nText.\n");
    write(join(roots.localesDir, "fr", "ui.yml"), "a: c\n");
    const catalogs = buildLocales(roots);
    expect(Object.keys(catalogs).sort()).toEqual(["de", "fr"]);
    expect(Object.keys(catalogs.de).sort()).toEqual(["demos", "ui"]);
  });
});
