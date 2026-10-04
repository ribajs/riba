import { LocalesService } from "./locales.service.js";
import { LocalesStaticService } from "./locales-static.service.js";
import type { Catalog, LocalesOptions, MessageTree } from "../types/index.js";

const catalog: Catalog = {
  en: { hello: "Hello", only_en: "only english" },
  de: { hello: "Hallo" },
  fr: { hello: "Bonjour" },
};

/** A source whose loading the test controls, unlike the static one that holds everything already */
class LoaderService extends LocalesService {
  constructor(
    protected loader: (langcode: string) => Promise<MessageTree | undefined>,
    options: LocalesOptions,
  ) {
    super(options);
  }

  protected load(langcode: string) {
    return this.loader(langcode);
  }
}

const reset = () => {
  document.documentElement.lang = "en";
  localStorage.clear();
  window.history.replaceState({}, "", "/");
};

describe("LocalesService", () => {
  beforeEach(reset);

  describe("lifecycle", () => {
    it("is not ready before init and translate throws", async () => {
      const service = new LocalesStaticService(catalog);
      expect(service.ready).toBe(false);
      expect(() => service.translate("hello")).toThrow(/not ready/);
      await service.init();
      expect(service.ready).toBe(true);
      expect(service.translate("hello")).toBe("Hello");
    });

    it("init is idempotent and fires ready once", async () => {
      const service = new LocalesStaticService(catalog);
      const ready = vi.fn();
      service.on("ready", ready);
      await Promise.all([service.init(), service.init(), service.whenReady()]);
      await service.init();
      expect(ready).toHaveBeenCalledTimes(1);
      expect(ready).toHaveBeenCalledWith("en");
    });

    it("rejects init and emits error instead of returning the error as a value", async () => {
      const service = new LoaderService(
        async () => {
          throw new Error("boom");
        },
        { langcodes: ["en"] },
      );
      const onError = vi.fn();
      service.on("error", onError);
      await expect(service.init()).rejects.toThrow("boom");
      expect(onError).toHaveBeenCalledTimes(1);
      expect(service.ready).toBe(false);
    });

    it("dispose removes listeners", async () => {
      const service = new LocalesStaticService(catalog);
      const changed = vi.fn();
      service.on("changed", changed);
      await service.init();
      service.dispose();
      service.event.trigger("changed", "de", "en");
      expect(changed).not.toHaveBeenCalled();
      expect(service.ready).toBe(false);
    });
  });

  describe("language detection", () => {
    it("uses the html lang by default and the catalog keys as langcodes", async () => {
      document.documentElement.lang = "de";
      const service = new LocalesStaticService(catalog);
      await service.init();
      expect(service.getLangcode()).toBe("de");
      expect(service.getSourceLangcode()).toBe("de");
      expect(service.getAvailableLangcodes().map((l) => l.code)).toEqual([
        "en",
        "de",
        "fr",
      ]);
      expect(service.getAvailableLangcodes().find((l) => l.active)?.code).toBe(
        "de",
      );
    });

    it("reduces a region to the base language", async () => {
      document.documentElement.lang = "de-AT";
      const service = new LocalesStaticService(catalog, {
        sourceLangcode: "en",
      });
      await service.init();
      expect(service.getLangcode()).toBe("de");
    });

    it("falls back to the source language when nothing matches", async () => {
      document.documentElement.lang = "ja";
      const service = new LocalesStaticService(catalog, {
        sourceLangcode: "en",
      });
      await service.init();
      expect(service.getLangcode()).toBe("en");
    });

    it("follows the detect order: query before storage before navigator", async () => {
      localStorage.setItem("riba:i18n:langcode", "fr");
      window.history.replaceState({}, "", "/?lang=de");
      const detect = ["query", "storage", "html"] as const;
      const first = new LocalesStaticService(catalog, { detect: [...detect] });
      await first.init();
      expect(first.getLangcode()).toBe("de");

      window.history.replaceState({}, "", "/");
      const second = new LocalesStaticService(catalog, { detect: [...detect] });
      await second.init();
      expect(second.getLangcode()).toBe("fr");
    });

    it("skips a detected language that is not available", async () => {
      window.history.replaceState({}, "", "/?lang=xx");
      localStorage.setItem("riba:i18n:langcode", "de");
      const service = new LocalesStaticService(catalog, {
        detect: ["query", "storage"],
      });
      await service.init();
      expect(service.getLangcode()).toBe("de");
    });

    it("detects from navigator.languages", async () => {
      const spy = vi
        .spyOn(navigator, "languages", "get")
        .mockReturnValue(["ja-JP", "fr-CA"]);
      const service = new LocalesStaticService(catalog, {
        detect: ["navigator"],
        sourceLangcode: "en",
      });
      await service.init();
      spy.mockRestore();
      expect(service.getLangcode()).toBe("fr");
    });
  });

  describe("switching", () => {
    it("changes the language, syncs html lang and fires changed with the previous language", async () => {
      const service = new LocalesStaticService(catalog);
      const changed = vi.fn();
      service.on("changed", changed);
      await service.setLangcode("de");
      expect(service.getLangcode()).toBe("de");
      expect(document.documentElement.lang).toBe("de");
      expect(changed).toHaveBeenCalledWith("de", "en");
      expect(service.translate("hello")).toBe("Hallo");
    });

    it("does not fire changed for the active language", async () => {
      const service = new LocalesStaticService(catalog);
      await service.init();
      const changed = vi.fn();
      service.on("changed", changed);
      await service.setLangcode("en");
      expect(changed).not.toHaveBeenCalled();
    });

    it("does not touch html lang with syncHtmlLang false", async () => {
      const service = new LocalesStaticService(catalog, {
        syncHtmlLang: false,
      });
      await service.setLangcode("de");
      expect(document.documentElement.lang).toBe("en");
    });

    it("rejects an unknown langcode", async () => {
      const service = new LocalesStaticService(catalog);
      await expect(service.setLangcode("xx")).rejects.toThrow(
        /Unknown langcode/,
      );
    });

    it("persists the choice only when asked to, and not the detected language", async () => {
      const plain = new LocalesStaticService(catalog);
      await plain.setLangcode("de");
      expect(localStorage.getItem("riba:i18n:langcode")).toBeNull();

      const persisted = new LocalesStaticService(catalog, {
        persist: true,
        storageKey: "k",
      });
      await persisted.init();
      expect(localStorage.getItem("k")).toBeNull();
      await persisted.setLangcode("fr");
      expect(localStorage.getItem("k")).toBe("fr");
    });

    it("the last of two quick switches wins", async () => {
      const service = new LoaderService(
        async (langcode) => {
          if (langcode === "de") {
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          return catalog[langcode];
        },
        { langcodes: ["en", "de", "fr"] },
      );
      await service.init();
      const first = service.setLangcode("de");
      const second = service.setLangcode("fr");
      await Promise.all([first, second]);
      expect(service.getLangcode()).toBe("fr");
      expect(service.translate("hello")).toBe("Bonjour");
    });
  });

  describe("missing translations", () => {
    it("keeps by default: translate returns undefined and fires missing", async () => {
      const service = new LocalesStaticService(catalog);
      const missing = vi.fn();
      service.on("missing", missing);
      await service.setLangcode("de");
      expect(service.translate("only_en")).toBeUndefined();
      expect(missing).toHaveBeenCalledWith("only_en", "de");
    });

    it("falls back per key through fallbackLangcodes", async () => {
      const service = new LocalesStaticService(catalog, {
        fallbackLangcodes: ["en"],
      });
      await service.setLangcode("de");
      expect(service.translate("only_en")).toBe("only english");
    });

    it("returns a marker or throws on request", async () => {
      const marker = new LocalesStaticService(catalog, { missing: "marker" });
      await marker.init();
      expect(marker.translate("nope")).toBe('translation missing: "nope"');
      const strict = new LocalesStaticService(catalog, { missing: "throw" });
      await strict.init();
      expect(() => strict.translate("nope")).toThrow(/Translation missing/);
    });

    it("lookup and has apply no strategy and fire no event", async () => {
      const service = new LocalesStaticService(catalog, { missing: "throw" });
      const missing = vi.fn();
      service.on("missing", missing);
      await service.init();
      expect(service.lookup("nope")).toBeUndefined();
      expect(service.has("hello")).toBe(true);
      expect(service.has("nope")).toBe(false);
      expect(missing).not.toHaveBeenCalled();
    });
  });

  describe("without a DOM", () => {
    it("works when document, location, navigator and localStorage are missing", async () => {
      vi.stubGlobal("document", undefined);
      vi.stubGlobal("location", undefined);
      vi.stubGlobal("navigator", undefined);
      vi.stubGlobal("localStorage", undefined);
      try {
        const service = new LocalesStaticService(catalog, {
          detect: ["query", "storage", "html", "navigator"],
          persist: true,
        });
        await service.setLangcode("de");
        expect(service.getSourceLangcode()).toBe("en");
        expect(service.translate("hello")).toBe("Hallo");
      } finally {
        vi.unstubAllGlobals();
      }
    });
  });
});
