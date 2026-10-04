import { describe, expect, it } from "vitest";
import { mkdirSync, mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import {
  applyBasePath,
  normalizeBasePath,
  ribaBasePathPlugin,
} from "./base-path-plugin.js";

type BundleChunk = {
  type: "asset" | "chunk";
  fileName: string;
  source: string | Uint8Array;
};

type MinimalPlugin = {
  name: string;
  configResolved?: (config: unknown) => void;
  generateBundle?: (
    options: unknown,
    bundle: Record<string, BundleChunk>,
  ) => void;
};

const BASE = "/demos/x/";

/**
 * Runs a source string through the plugin exactly as Rollup would: resolve the
 * config first, then let generateBundle see a bundle.
 *
 * `base` is read with an `in` check instead of a destructuring default: test (f)
 * needs to pass `base: undefined`, which a default would silently replace.
 */
function rewrite(
  source: string,
  options: {
    base?: unknown;
    publicEntries?: string[];
    fileName?: string;
  } = {},
): { source: string | Uint8Array; plugin: MinimalPlugin } {
  const base = "base" in options ? options.base : BASE;
  const publicEntries = options.publicEntries ?? [];
  const fileName = options.fileName ?? "index.html";

  let publicDir: string | undefined;
  if (publicEntries.length) {
    publicDir = mkdtempSync(join(tmpdir(), "riba-base-path-"));
    for (const entry of publicEntries) {
      mkdirSync(join(publicDir, entry), { recursive: true });
    }
  }

  try {
    const plugin = ribaBasePathPlugin() as MinimalPlugin;
    plugin.configResolved?.({ base, publicDir });
    const chunk: BundleChunk = {
      type: fileName.endsWith(".html") ? "asset" : "chunk",
      fileName,
      source,
    };
    const bundle = { [fileName]: chunk };
    plugin.generateBundle?.({}, bundle);
    return { source: chunk.source, plugin };
  } finally {
    if (publicDir) {
      rmSync(publicDir, { recursive: true, force: true });
    }
  }
}

/** Shorthand: the rewritten text of a demo-sized source snippet. */
function out(source: string, options?: Parameters<typeof rewrite>[1]): string {
  return String(rewrite(source, options).source);
}

describe("normalizeBasePath", () => {
  it("returns null for every root base", () => {
    for (const base of ["/", "./", "", "   ", undefined, null, 42]) {
      expect(normalizeBasePath(base)).toBeNull();
    }
  });

  it("guarantees exactly one trailing slash", () => {
    expect(normalizeBasePath("/demos/x")).toBe("/demos/x/");
    expect(normalizeBasePath("/demos/x/")).toBe("/demos/x/");
    expect(normalizeBasePath("/demos//x/")).toBe("/demos/x/");
  });

  it("normalises a relative base to a root-absolute one", () => {
    expect(normalizeBasePath("./sub/")).toBe("/sub/");
    expect(normalizeBasePath("../sub/")).toBe("/sub/");
  });

  it("keeps the scheme of an absolute-URL base", () => {
    expect(normalizeBasePath("https://cdn.example.com")).toBe(
      "https://cdn.example.com/",
    );
    expect(normalizeBasePath("https://cdn.example.com//a/")).toBe(
      "https://cdn.example.com/a/",
    );
  });
});

describe("ribaBasePathPlugin", () => {
  it("(a) rewrites a double-quoted iconset path", () => {
    expect(out(`const icon = "/iconset/svg/close.svg";`)).toBe(
      `const icon = "${BASE}iconset/svg/close.svg";`,
    );
  });

  it("(b) rewrites a single-quoted images path", () => {
    expect(out(`src = '/images/x.jpg';`)).toBe(`src = '${BASE}images/x.jpg';`);
  });

  it("(c) rewrites an HTML attribute", () => {
    expect(out(`<video src="/videos/clip.mp4" controls></video>`)).toBe(
      `<video src="${BASE}videos/clip.mp4" controls></video>`,
    );
  });

  it("(d) rewrites an unquoted CSS url()", () => {
    expect(out(`background: url(/images/bg.png) no-repeat;`)).toBe(
      `background: url(${BASE}images/bg.png) no-repeat;`,
    );
  });

  it("(e) rewrites a Pug-compiled attribute", () => {
    expect(out(`img(src="/images/a.png")`)).toBe(
      `img(src="${BASE}images/a.png")`,
    );
  });

  it("(f) changes nothing at all for a root base", () => {
    const sources = [
      `const icon = "/iconset/svg/close.svg";`,
      `src = '/images/x.jpg';`,
      `background: url(/images/bg.png);`,
    ];
    for (const base of ["/", "./", "", undefined]) {
      for (const source of sources) {
        const { source: rewritten, plugin } = rewrite(source, { base });
        expect(rewritten).toBe(source);
        // The plugin drops its hook instead of walking the bundle.
        expect(plugin.generateBundle).toBeUndefined();
      }
    }
  });

  it("(g) leaves other hosts and protocol-relative URLs alone", () => {
    const source = [
      `<script src="//cdn.example.com/x.js"></script>`,
      `<img src="https://example.com/images/a.png">`,
      `const cdn = "//cdn.example.com/images/a.png";`,
    ].join("\n");
    expect(out(source)).toBe(source);
  });

  it("(h) never prefixes a path that already carries the base", () => {
    expect(out(`const a = "${BASE}images/a.png";`)).toBe(
      `const a = "${BASE}images/a.png";`,
    );
    // Second pass over an already rewritten bundle changes nothing either.
    const once = out(`const a = "${BASE}images/a.png";`);
    expect(once).not.toContain(`${BASE}${BASE}`);
    expect(applyBasePath(once, BASE, ["images"])).toBe(once);
    // Unquoted CSS url() too.
    expect(out(`url(${BASE}images/a.png)`)).toBe(`url(${BASE}images/a.png)`);
  });

  it("(i) leaves roots that are no public asset alone", () => {
    const source = [
      `fetch("/api/foo");`,
      `location.assign("/some/route");`,
      `const r = "/custom/thing.png";`,
    ].join("\n");
    expect(out(source, { publicEntries: ["images"] })).toBe(source);
  });

  it("derives the public roots from the public directory", () => {
    const source = `const a = "/assets/a.png"; const b = "/elsewhere/b.png";`;
    expect(out(source, { publicEntries: ["images", "assets"] })).toBe(
      `const a = "${BASE}assets/a.png"; const b = "/elsewhere/b.png";`,
    );
  });

  it("keeps iconset valid without a public directory", () => {
    // rv-video has public/videos only; the icon URLs still resolve because
    // ribaIconsetPlugin emits iconset/ into the build root.
    const source = `bs5-icon(src="/iconset/svg/icon_close.svg")`;
    expect(out(source, { publicEntries: ["videos"] })).toBe(
      `bs5-icon(src="${BASE}iconset/svg/icon_close.svg")`,
    );
  });

  it("rewrites every srcset candidate, not only the quoted first one", () => {
    const source = `srcset="/images/a.png 1x, /images/b.png 2x"`;
    expect(out(source, { publicEntries: ["images"] })).toBe(
      `srcset="${BASE}images/a.png 1x, ${BASE}images/b.png 2x"`,
    );
  });

  it("leaves data URIs untouched", () => {
    const source = `const bg = "/data:image/png;base64,iVBORw0KGgo=";`;
    expect(out(source, { publicEntries: ["images"] })).toBe(source);
  });

  it("rewrites a Rolldown chunk, whose text lives in `code`, not `source`", () => {
    // Vite 8 = Rolldown: OutputChunk has no `source`. A plugin that only knows
    // `source` compiles, runs and rewrites nothing at all.
    const chunk = {
      type: "chunk",
      fileName: "assets/example-abc.js",
      code: `img(src="/images/a.png")`,
    } as unknown as BundleChunk;
    const plugin = ribaBasePathPlugin() as MinimalPlugin;
    plugin.configResolved?.({ base: BASE, publicDir: undefined });
    plugin.generateBundle?.({}, { "assets/example-abc.js": chunk });
    expect((chunk as unknown as { code: string }).code).toBe(
      `img(src="${BASE}images/a.png")`,
    );
  });

  it("rewrites binary-ish assets only when they are text", () => {
    const bytes = new Uint8Array(Buffer.from(`url("/images/bg.png")`, "utf8"));
    const chunk: BundleChunk = {
      type: "asset",
      fileName: "assets/main.css",
      source: bytes,
    };
    const plugin = ribaBasePathPlugin() as MinimalPlugin;
    plugin.configResolved?.({ base: BASE, publicDir: undefined });
    plugin.generateBundle?.({}, { "assets/main.css": chunk });
    expect(Buffer.from(chunk.source as Uint8Array).toString("utf8")).toBe(
      `url("${BASE}images/bg.png")`,
    );

    const png = { type: "asset", fileName: "assets/x.png", source: bytes };
    plugin.generateBundle?.({}, { "assets/x.png": png });
    expect(png.source).toBe(bytes);
  });
});
