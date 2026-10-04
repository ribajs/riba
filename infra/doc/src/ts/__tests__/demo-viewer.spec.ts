import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { Riba, coreModule } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";
import { i18nModule, I18nService, LocalesStaticService } from "@ribajs/i18n";

const MANIFEST = [
  {
    id: "core-each-item",
    title: "core-each-item Demo",
    description: "Iterates a list.",
    category: "core",
    entries: ["index.html"],
    sizeKB: 240,
    status: "ok",
    knownIssues: [],
  },
  {
    id: "broken",
    title: "broken Demo",
    description: "Build failed.",
    category: "core",
    entries: [],
    sizeKB: 0,
    status: "build-failed",
    knownIssues: [42, "https://example.org/issue", { issue: 7 }],
  },
];

describe("DemoViewerComponent", () => {
  let riba: Riba;

  beforeAll(() => {
    riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(extrasModule.init());
    riba.module.register(bs5Module.init());
  });

  beforeEach(async () => {
    const { DemoViewerComponent } = await import(
      "../components/demo-viewer/demo-viewer.component.js"
    );
    riba.module.component.register(DemoViewerComponent);

    const script = document.createElement("script");
    script.type = "application/json";
    script.id = "demos-manifest";
    script.textContent = JSON.stringify(MANIFEST);
    document.body.appendChild(script);
  });

  afterEach(() => {
    document.getElementById("demos-manifest")?.remove();
    document.body.innerHTML = "";
    window.history.replaceState({}, "", "/");
  });

  /**
   * @param search query string to simulate a direct page call
   */
  async function renderViewer(search: string) {
    window.history.replaceState({}, "", "/demo.html" + search);
    const el = document.createElement("rv-demo-viewer");
    document.body.appendChild(el);
    riba.bind(el, {});
    await new Promise((r) => setTimeout(r, 100));
    return el;
  }

  it("is registered as rv-demo-viewer", () => {
    expect(riba.components["rv-demo-viewer"]).toBeDefined();
  });

  it("renders the demo requested via ?id=", async () => {
    const el = await renderViewer("?id=core-each-item");
    const viewer = el as any;
    expect(viewer.scope.found).toBe(true);
    expect(viewer.scope.requestedId).toBe("core-each-item");
    expect(viewer.scope.frameSrc).toBe("demos/core-each-item/");
    expect(viewer.scope.sourceUrl).toBe(
      "https://github.com/ribajs/riba/tree/main/demos/core-each-item",
    );
    expect(el.querySelector("iframe")?.getAttribute("src")).toBe(
      "demos/core-each-item/",
    );
    expect(el.textContent).toContain("core-each-item Demo");
  });

  it("shows a fallback pointing back to the gallery for an unknown id", async () => {
    const el = await renderViewer("?id=does-not-exist");
    const viewer = el as any;
    expect(viewer.scope.found).toBe(false);
    expect(viewer.scope.notFound).toBe(true);
    expect(el.textContent).toContain("does-not-exist");
    expect(el.querySelector('a[href="demos.html"]')).not.toBeNull();
  });

  it("shows a fallback when no id is given", async () => {
    const el = await renderViewer("");
    const viewer = el as any;
    expect(viewer.scope.found).toBe(false);
    expect(viewer.scope.notFound).toBe(false);
    expect(el.textContent).toContain("demo overview");
  });

  it("switches the frame between the device widths", async () => {
    const el = await renderViewer("?id=core-each-item");
    const viewer = el as any;
    const wrapper = el.querySelector("iframe")?.parentElement;

    expect(viewer.scope.frameMaxWidth).toBe("100%");
    viewer.setWidth(375);
    expect(viewer.scope.frameMaxWidth).toBe("375px");
    expect(wrapper?.style.maxWidth).toBe("375px");
    viewer.setWidth(768);
    expect(wrapper?.style.maxWidth).toBe("768px");
    viewer.setWidth(0);
    expect(wrapper?.style.maxWidth).toBe("100%");
  });

  it("reloads the frame by resetting its src", async () => {
    const el = await renderViewer("?id=core-each-item");
    const viewer = el as any;
    const frame = el.querySelector("iframe") as HTMLIFrameElement;
    const reload = vi.spyOn(frame, "src", "set");
    viewer.reload();
    expect(reload).toHaveBeenCalledWith("demos/core-each-item/");
  });

  it("normalizes known issues and warns about unbuilt demos", async () => {
    const el = await renderViewer("?id=broken");
    const viewer = el as any;
    expect(viewer.scope.hasIssues).toBe(true);
    // Spread: the DotAdapter adds a non-enumerable __rv marker to observed objects.
    expect(viewer.scope.issues.map((issue) => ({ ...issue }))).toEqual([
      { label: "#42", url: "https://github.com/ribajs/riba/issues/42" },
      { label: "https://example.org/issue", url: "https://example.org/issue" },
      { label: "#7", url: "https://github.com/ribajs/riba/issues/7" },
    ]);
    expect(viewer.scope.statusMessage).toContain("build of this demo failed");
  });

  it("survives a broken manifest snapshot", async () => {
    const script = document.getElementById("demos-manifest") as HTMLScriptElement;
    script.textContent = "{not json";
    const el = await renderViewer("?id=core-each-item");
    expect((el as any).scope.found).toBe(false);
    expect(el.querySelector('a[href="demos.html"]')).not.toBeNull();
  });

  describe("in German", () => {
    const de = {
      demos: { "core-each-item": { title: "Schleife", description: "Beschreibung" } },
      ui: {
        status: { ok: "live" },
        viewer: {
          none_selected_html: 'Keine Demo ausgewählt – <a href="demos.html">Demo-Übersicht</a>.',
          reload: "Neu laden",
          category: "Kategorie: {{ category }}",
          status: "Status: {{ status }}",
          status_message: { "build-failed": "Der Build ist fehlgeschlagen." },
        },
      },
    };
    let localesService: LocalesStaticService;

    beforeEach(async () => {
      // the i18n module is global state of the test page, so it is registered per test
      I18nService.reset();
      document.documentElement.lang = "en";
      localesService = new LocalesStaticService(
        { de },
        { sourceLangcode: "en", langcodes: ["en", "de"] },
      );
      riba.module.register(i18nModule.init({ localesService }));
      await localesService.init();
    });

    afterEach(() => I18nService.reset());

    it("shows the English manifest text until German is active", async () => {
      const viewer = (await renderViewer("?id=core-each-item")) as any;
      expect(viewer.scope.title).toBe("core-each-item Demo");
      expect(viewer.scope.description).toBe("Iterates a list.");
      expect(viewer.scope.metaInfo).toBe("Category: core · 240 kB · Status: ok");
    });

    it("translates the manifest fields and the built texts, and switches back", async () => {
      const el = await renderViewer("?id=core-each-item");
      const viewer = el as any;
      await localesService.setLangcode("de");
      expect(viewer.scope.title).toBe("Schleife");
      expect(viewer.scope.description).toBe("Beschreibung");
      expect(viewer.scope.metaInfo).toBe("Kategorie: core · 240 kB · Status: live");
      expect(el.textContent).toContain("Neu laden");
      await localesService.setLangcode("en");
      expect(viewer.scope.title).toBe("core-each-item Demo");
      expect(el.textContent).toContain("Reload");
    });

    it("falls back to English for a demo without a translation", async () => {
      const el = await renderViewer("?id=broken");
      const viewer = el as any;
      await localesService.setLangcode("de");
      expect(viewer.scope.title).toBe("broken Demo");
      expect(viewer.scope.statusMessage).toBe("Der Build ist fehlgeschlagen.");
    });

    it("translates the fallback for a missing id", async () => {
      const el = await renderViewer("");
      await localesService.setLangcode("de");
      expect(el.textContent).toContain("Demo-Übersicht");
      expect(el.querySelector('a[href="demos.html"]')).not.toBeNull();
    });
  });
});