import { Translator, interpolate, lookup, selectPlural } from "./translator.js";
import type { Catalog } from "../types/index.js";

const catalog: Catalog = {
  de: {
    greeting: "Hallo {{ name }}",
    empty: "",
    only_de: "nur deutsch",
    nested: { deep: { key: "tief" } },
    items: { one: "{{ count }} Artikel", other: "{{ count }} Artikel (viele)" },
  },
  "de-AT": { greeting: "Servus {{ name }}" },
  fr: { greeting: "Bonjour", only_fr: "seulement fr" },
  en: {
    greeting: "Hello",
    items: { one: "one item", other: "{{ count }} items" },
  },
};

const translator = (fallbackLangcodes: string[] = []) =>
  new Translator({ getTree: (code) => catalog[code], fallbackLangcodes });

describe("Translator", () => {
  describe("lookup", () => {
    it("walks nested key paths without copying the tree", () => {
      expect(lookup(catalog.de, "nested.deep.key")).toBe("tief");
      expect(lookup(catalog.de, ["nested", "deep", "key"])).toBe("tief");
      expect(lookup(catalog.de, "nested.deep")).toEqual({ key: "tief" });
    });

    it("returns undefined for missing, empty and inherited segments", () => {
      expect(lookup(catalog.de, "nope")).toBeUndefined();
      expect(lookup(catalog.de, "nested..key")).toBeUndefined();
      expect(lookup(catalog.de, "constructor")).toBeUndefined();
      expect(lookup(catalog.de, "greeting.length")).toBeUndefined();
      expect(lookup(undefined, "greeting")).toBeUndefined();
    });
  });

  describe("fallback chain", () => {
    it("reduces the region before trying the fallback languages", () => {
      expect(translator(["fr", "en"]).chain("de-AT")).toEqual([
        "de-AT",
        "de",
        "fr",
        "en",
      ]);
    });

    it("does not repeat a language", () => {
      expect(translator(["de", "en"]).chain("de")).toEqual(["de", "en"]);
    });

    it("prefers the region, then the base language, per key", () => {
      const t = translator();
      expect(t.translate("de-AT", "greeting", { name: "Pascal" })).toBe(
        "Servus Pascal",
      );
      expect(t.translate("de-AT", "only_de")).toBe("nur deutsch");
    });

    it("falls back per key, not per language", () => {
      const t = translator(["fr", "en"]);
      expect(t.translate("de", "only_fr")).toBe("seulement fr");
      expect(t.translate("de", "greeting", { name: "A" })).toBe("Hallo A");
    });

    it("returns undefined when no language has the key", () => {
      expect(translator(["fr"]).translate("de", "unknown.key")).toBeUndefined();
    });

    it("does not treat a subtree as a message", () => {
      expect(translator().translate("de", "nested")).toBeUndefined();
    });
  });

  it("treats an empty string as a valid translation", () => {
    expect(translator(["en"]).translate("de", "empty")).toBe("");
  });

  describe("interpolate", () => {
    it("replaces placeholders with or without spaces", () => {
      expect(interpolate("{{a}} and {{ b }}", { a: "x", b: 2 })).toBe(
        "x and 2",
      );
    });

    it("keeps unknown placeholders and does not expand replacement patterns", () => {
      expect(interpolate("{{ a }} {{ b }}", { a: "$&" })).toBe("$& {{ b }}");
    });
  });

  describe("plural", () => {
    it("selects the form by count", () => {
      const t = translator();
      expect(t.translate("de", "items", { count: 1 })).toBe("1 Artikel");
      expect(t.translate("de", "items", { count: 5 })).toBe(
        "5 Artikel (viele)",
      );
      expect(t.translate("de", "items", { count: "1" })).toBe("1 Artikel");
    });

    it("uses other without a count", () => {
      expect(translator().translate("de", "items")).toBe(
        "{{ count }} Artikel (viele)",
      );
    });

    it("prefers exact zero and two forms when defined", () => {
      const forms = { zero: "none", one: "one", two: "pair", other: "many" };
      expect(selectPlural(forms, 0, "en")).toBe("none");
      expect(selectPlural(forms, 2, "en")).toBe("pair");
      expect(selectPlural({ one: "one", other: "many" }, 0, "en")).toBe("many");
    });

    it("uses Intl.PluralRules categories beyond one and other", () => {
      const forms = { one: "1", few: "few", many: "many", other: "other" };
      expect(selectPlural(forms, 3, "ru")).toBe("few");
      expect(selectPlural(forms, 5, "ru")).toBe("many");
    });

    it("falls back to other for an unknown langcode or a missing category", () => {
      expect(selectPlural({ other: "o" }, 3, "not a langcode!")).toBe("o");
      expect(selectPlural({ other: "o" }, 3, "ru")).toBe("o");
    });
  });
});
