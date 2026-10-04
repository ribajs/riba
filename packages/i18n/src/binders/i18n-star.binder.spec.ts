import { Riba, coreModule, CoreService } from "@ribajs/core";
import { i18nModule } from "../i18n.module.js";
import { LocalesStaticService } from "../services/locales-static.service.js";
import { I18nService } from "../services/i18n.service.js";

const waitFor = async (condition: () => boolean, timeoutMs = 500) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("Timed out waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
};

const catalog = {
  de: {
    title: "Titel",
    html: "<b>fett</b>",
    empty: "",
    hello: "Hallo {{ name }}",
    items: { one: "{{ count }} Artikel", other: "{{ count }} Artikel" },
  },
  fr: { title: "Titre" },
};

const setup = (options = {}, lang = "en") => {
  document.documentElement.lang = lang;
  (CoreService as any).instance = undefined;
  (CoreService as any)._options = {};
  I18nService.reset();
  const localesService = new LocalesStaticService(catalog, {
    sourceLangcode: "en",
    langcodes: ["en", "de", "fr"],
    ...options,
  });
  const riba = new Riba();
  riba.module.register(coreModule.init());
  riba.module.register(i18nModule.init({ localesService }));
  const bind = (html: string) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return { el, view: riba.bind(el, {}) };
  };
  return { localesService, bind };
};

describe("i18n-* binder", () => {
  it("leaves the source markup while the source language is active", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`<h1 rv-i18n-text="'title'">Title</h1>`);
    await localesService.init();
    expect(el.querySelector("h1")?.textContent).toBe("Title");
  });

  it("translates on change and restores the source text going back (de to en)", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`<h1 rv-i18n-text="'title'">Title</h1>`);
    const h1 = el.querySelector("h1") as HTMLElement;
    await localesService.setLangcode("de");
    expect(h1.textContent).toBe("Titel");
    await localesService.setLangcode("en");
    expect(h1.textContent).toBe("Title");
    await localesService.setLangcode("de");
    expect(h1.textContent).toBe("Titel");
  });

  it("restores the source when a key is missing in the new language, not the previous one", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`<p rv-i18n-text="'html'">Source</p>`);
    const p = el.querySelector("p") as HTMLElement;
    await localesService.setLangcode("de");
    expect(p.textContent).toBe("<b>fett</b>");
    await localesService.setLangcode("fr");
    expect(p.textContent).toBe("Source");
  });

  it("falls back per key before restoring the source", async () => {
    const { localesService, bind } = setup({ fallbackLangcodes: ["de"] });
    const { el } = bind(`<p rv-i18n-text="'hello'">Hi</p>`);
    await localesService.setLangcode("fr");
    expect(el.querySelector("p")?.textContent).toBe("Hallo {{ name }}");
  });

  it("applies an empty string translation", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`<p rv-i18n-text="'empty'">Source</p>`);
    await localesService.setLangcode("de");
    expect(el.querySelector("p")?.textContent).toBe("");
  });

  it("supports html, value and attribute targets and restores each", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`
      <div id="h" rv-i18n-html="'html'"><i>src</i></div>
      <input id="v" rv-i18n-value="'title'" value="Value" />
      <input id="a" rv-i18n-placeholder="'title'" />
    `);
    const h = el.querySelector("#h") as HTMLElement;
    const v = el.querySelector("#v") as HTMLInputElement;
    const a = el.querySelector("#a") as HTMLInputElement;
    await localesService.setLangcode("de");
    expect(h.innerHTML).toBe("<b>fett</b>");
    expect(v.value).toBe("Titel");
    expect(a.getAttribute("placeholder")).toBe("Titel");
    await localesService.setLangcode("en");
    expect(h.innerHTML).toBe("<i>src</i>");
    expect(v.value).toBe("Value");
    expect(a.hasAttribute("placeholder")).toBe(false);
  });

  it("interpolates data attributes and template vars, and selects plural forms", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`
      <p id="a" rv-i18n-text="'hello'" data-name="Pascal">x</p>
      <p id="b" rv-i18n-html="'hello'">x<template name="name">Welt</template></p>
      <p id="c" rv-i18n-text="'items'" data-count="3">x</p>
    `);
    await localesService.setLangcode("de");
    expect(el.querySelector("#a")?.textContent).toBe("Hallo Pascal");
    expect(el.querySelector("#b")?.innerHTML).toBe("Hallo Welt");
    expect(el.querySelector("#c")?.textContent).toBe("3 Artikel");
  });

  it("uses inline <template lang> translations and the default template", async () => {
    const { localesService, bind } = setup();
    const { el } = bind(`
      <p id="a" rv-i18n-html="">x<template lang="de">Inline DE</template><template lang="default">Default</template></p>
      <p id="b" rv-i18n-html="'unknown'">x<template lang="default">Default</template></p>
    `);
    await localesService.setLangcode("de");
    expect(el.querySelector("#a")?.innerHTML).toBe("Inline DE");
    expect(el.querySelector("#b")?.innerHTML).toBe("Default");
    await localesService.setLangcode("fr");
    expect(el.querySelector("#a")?.innerHTML).toBe("Default");
  });

  it("shows a marker for a missing key with missing: marker", async () => {
    const { localesService, bind } = setup({ missing: "marker" });
    const { el } = bind(`<p rv-i18n-text="'nope'">Source</p>`);
    await localesService.setLangcode("de");
    expect(el.querySelector("p")?.textContent).toBe(
      'translation missing: "nope"',
    );
  });

  it("starts translating when the service becomes ready after binding", async () => {
    const { localesService, bind } = setup({ sourceLangcode: "en" }, "de");
    const { el } = bind(`<h1 rv-i18n-text="'title'">Title</h1>`);
    await waitFor(() => el.querySelector("h1")?.textContent === "Titel");
    expect(localesService.getLangcode()).toBe("de");
  });

  it("removes every listener on unbind", async () => {
    const { localesService, bind } = setup();
    const count = (name: string) => {
      const events = (localesService.event as any).events || {};
      return Array.isArray(events[name]) ? events[name].length : 0;
    };
    const { el, view } = bind(`<h1 rv-i18n-text="'title'">Title</h1>`);
    await localesService.init();
    expect(count("changed")).toBe(1);
    expect(count("ready")).toBe(1);
    view.unbind();
    expect(count("changed")).toBe(0);
    expect(count("ready")).toBe(0);
    await localesService.setLangcode("de");
    expect(el.querySelector("h1")?.textContent).toBe("Title");
  });
});
