import { Riba, coreModule, CoreService } from "@ribajs/core";
import { i18nModule } from "../i18n.module.js";
import { LocalesStaticService } from "../services/locales-static.service.js";
import { I18nService } from "../services/i18n.service.js";

const waitFor = async (
  condition: () => boolean,
  timeoutMs = 500,
  intervalMs = 10,
) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("Timed out waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
};

describe("t formatter", () => {
  const locales = {
    en: {
      examples: {
        newsletter: {
          title: "Hello",
        },
      },
    },
    de: {
      examples: {
        newsletter: {
          title: "Hallo",
        },
      },
    },
  };

  const resetI18nSingletons = () => {
    (CoreService as any).instance = undefined;
    (CoreService as any)._options = {};
    I18nService.reset();
  };

  beforeEach(() => {
    document.documentElement.lang = "en";
    resetI18nSingletons();
  });

  it("updates rendered text when language changes", async () => {
    const localesService = new LocalesStaticService(locales);
    const riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(i18nModule.init({ localesService }));

    const el = document.createElement("div");
    el.textContent = "{ 'examples.newsletter.title' | t }";
    const view = riba.bind(el, {});

    await waitFor(() => el.textContent === "Hello");

    await localesService.setLangcode("de");
    await waitFor(() => el.textContent === "Hallo");

    view.unbind();
  });

  it("cleans changed listeners on unbind", async () => {
    const localesService = new LocalesStaticService(locales);
    const riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(i18nModule.init({ localesService }));

    const changedListenerCount = () => {
      const events = (localesService.event as any).events || {};
      return Array.isArray(events.changed) ? events.changed.length : 0;
    };

    expect(changedListenerCount()).toBe(0);

    const el = document.createElement("div");
    el.textContent = "{ 'examples.newsletter.title' | t }";
    const view = riba.bind(el, {});
    await waitFor(() => changedListenerCount() >= 1);

    view.unbind();
    expect(changedListenerCount()).toBe(0);
  });

  describe("arguments", () => {
    const withLocales = async (text: string, vars: object = {}) => {
      const localesService = new LocalesStaticService({
        en: { n: { one: "{{ count }} item", other: "{{ count }} items" } },
        de: { n: { one: "{{ count }} Ding", other: "{{ count }} Dinge" } },
      });
      const riba = new Riba();
      riba.module.register(coreModule.init());
      riba.module.register(i18nModule.init({ localesService }));
      await localesService.init();
      const el = document.createElement("div");
      el.textContent = text;
      const view = riba.bind(el, vars);
      return { el, view, localesService };
    };

    it("takes variables from the model and selects the plural form", async () => {
      const { el, view } = await withLocales("{ 'n' | t vars }", {
        vars: { count: 3 },
      });
      await waitFor(() => el.textContent === "3 items");
      view.unbind();
    });

    it("takes a langcode argument without switching the language", async () => {
      const { el, view, localesService } = await withLocales(
        "{ 'n' | t 'de' vars }",
        { vars: { count: 1 } },
      );
      await waitFor(() => el.textContent === "1 Ding");
      expect(localesService.getLangcode()).toBe("en");
      view.unbind();
    });

    it("renders the key when nothing translates it", async () => {
      const { el, view } = await withLocales("{ 'no.such.key' | t }");
      await waitFor(() => el.textContent === "no.such.key");
      view.unbind();
    });

    it("renders empty before the service is ready and the text after", async () => {
      const localesService = new LocalesStaticService(locales);
      const riba = new Riba();
      riba.module.register(coreModule.init());
      riba.module.register(i18nModule.init({ localesService }));
      const el = document.createElement("div");
      el.textContent = "{ 'examples.newsletter.title' | t }";
      riba.bind(el, {});
      expect(el.textContent).toBe("");
      await waitFor(() => el.textContent === "Hello");
    });
  });
});
