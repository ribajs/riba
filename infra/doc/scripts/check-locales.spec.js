import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { checkLocales } from "./check-locales.js";
import { resolveRoots } from "./build-locales.js";

describe("check-locales", () => {
  let tmp;
  let roots;
  const write = (file, content) => {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  };
  const demo = (id, readme = `# ${id}\n\nEnglish text.\n`) => {
    write(join(roots.demosDir, id, "package.json"), "{}");
    if (readme !== null) write(join(roots.demosDir, id, "README.md"), readme);
  };

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "check-locales-"));
    roots = resolveRoots(join(tmp, "infra", "doc"));
  });
  afterEach(() => rmSync(tmp, { recursive: true, force: true }));

  it("passes a consistent project", () => {
    demo("a");
    write(
      join(roots.demosDir, "a", "README.de.md"),
      "# A\n\nDeutscher Text.\n",
    );
    write(
      join(roots.localesDir, "de", "ui.yml"),
      "demos:\n  other: Sonstige\n",
    );
    write(
      join(roots.srcDir, "views", "pages", "demos.pug"),
      `h2(rv-i18n-text="'ui.demos.other'") Other\n`,
    );
    expect(checkLocales(roots)).toEqual([]);
  });

  it("reports a demo without an English description", () => {
    demo("a", "# A\n");
    demo("b", null);
    const problems = checkLocales(roots);
    expect(problems.some((p) => p.includes("demos/a/README.md"))).toBe(true);
    expect(problems.some((p) => p.includes("demos/b/README.md"))).toBe(true);
  });

  it("reports a translation without an English sibling", () => {
    demo("a");
    write(join(roots.demosDir, "a", "README.de.md"), "# A\n\nText.\n");
    write(join(roots.demosDir, "a", "NOTES.de.md"), "# Notizen\n");
    expect(checkLocales(roots).join("\n")).toMatch(
      /NOTES\.de\.md: no English sibling/,
    );
  });

  it("reports a translated page that no page renders", () => {
    write(join(roots.docDir, "guide", "x.md"), "# X\n");
    write(join(roots.docDir, "guide", "x.de.md"), "# X de\n");
    expect(checkLocales(roots).join("\n")).toMatch(
      /x\.de\.md: no page renders/,
    );
  });

  it("reports orphan keys but accepts keys the markup asks for, also by prefix", () => {
    write(
      join(roots.localesDir, "de", "ui.yml"),
      "used: a\nstatus:\n  ok: live\n  weird: x\norphan: b\nviewer:\n  dyn:\n    a: x\n",
    );
    write(
      join(roots.srcDir, "views", "pages", "p.pug"),
      `p(rv-i18n-text="'ui.used'")\np(rv-i18n-text="'ui.viewer.dyn." + x + "'")\n`,
    );
    const problems = checkLocales(roots).join("\n");
    expect(problems).toContain('orphan key "ui.orphan"');
    expect(problems).toContain('orphan key "ui.status.weird"');
    expect(problems).not.toContain('"ui.used"');
    expect(problems).not.toContain("ui.status.ok");
    expect(problems).not.toContain("ui.viewer.dyn");
  });

  it("reports placeholders that differ from the English text", () => {
    write(
      join(roots.srcDir, "ts", "x.ts"),
      'uiText("ui.viewer.category", "Category: {{ category }}");\n',
    );
    write(
      join(roots.localesDir, "de", "ui.yml"),
      'viewer:\n  category: "Kategorie: {{ kategorie }}"\n',
    );
    expect(checkLocales(roots).join("\n")).toMatch(
      /"ui\.viewer\.category" has other \{\{ placeholders/,
    );
  });

  it("reports invalid YAML", () => {
    write(join(roots.localesDir, "de", "ui.yml"), "a: [unclosed\n");
    expect(checkLocales(roots).join("\n")).toMatch(/invalid YAML/);
  });
});
